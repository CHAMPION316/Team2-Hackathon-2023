
import { SCALE, CAMERA_SCALE } from './game';

// Load player sprites
loadSprite("player", "assets/sprites/player.png", {
    sliceX: 8,
    sliceY: 9,
    anims: {
        "idle": {
            from: 0, to: 3,
            speed: 5,
            loop: true
        },
        "back-jump": {
            from: 8, to: 12,
            speed: 10, 
            loop: false
        },
        "jump": {
            from: 16, to: 20,
            speed: 10,
            loop: false
        },
        "climb": {
            from: 24, to: 29,
            speed: 8,
            loop: true
        },
        "run": {
            from: 32, to: 39,
            speed: 10,
            loop: true
        },
        "run-shoot": {
            from: 40, to: 47,
            speed: 10,
            loop: true
        },
        "walk": {
            from: 48, to: 62,
            speed: 10,
            loop: true
        },
        "shoot": 64,
        "crouch": 65,
        "hurt": 66,
        "falling": 12,
        "land": {
            from: 67, to: 68,
            speed: 8,
            loop: false
        }

    }
});
loadSprite("bullet", "assets/props/bullets/shot-preview.gif");


// Load player sounds
loadSound("jump", "/assets/audio/jump.wav")
loadSound("player-damage", "/assets/audio/player_damage.wav")
loadSound("player-death", "/assets/audio/player_death.wav")
loadSound("player-shoot", "/assets/audio/shoot_player.wav")

//Constants
const SPEED = 120 * SCALE;
const JUMP_FORCE = 320 * SCALE;

const HIT_POINTS = 10;
const SCREEN_OFFSET = 16;

/**
 * 
 * @returns player object
 */
export function player() {
    return [
        sprite("player"),
        anchor('bot'),
        scale(SCALE),
        area({
            scale:vec2(0.25, 0.75), 
            // offset:vec2(0,66 * 0.15)
        }),
        body(),
        health(HIT_POINTS),
        state("normal", ["hurt", "normal"]),
        'player',
    ];
}

/**
 * 
 * @param {*} level - 
 * @returns 
 */
export function setupPlayer(level) {
    const player = level.get("player")[0];
    const dirKeys = ["w", "s", "a", "d"];
    let onLadder = false;

    player.play('idle');

    //The camera following the player?
    const followPlayer = () => {
        let {x,y} = player.pos;
        const halfHeight = (height() / 2) / CAMERA_SCALE;

        y = (y + halfHeight > level.levelHeight()) ?
            level.levelHeight() - halfHeight : y;
        camPos(x,y);
    }

    // All key presses
    onKeyPress("space", () => {
        if (player.isGrounded() && player.curAnim() !== "climb" && player.state != "hurt") {
            player.jump(JUMP_FORCE)
            play("jump");
            player.play("jump")
        }
    });

    onKeyDown('w', () => {
        if(player.state != "hurt") {
            if (onLadder) {
                player.move(0, -SPEED/2);
                setGravity(0)
                if (player.curAnim() !== "climb") player.play("climb");
            } else {
                setGravity(640 * SCALE);
                if (player.curAnim() === "climb") player.play('idle');
            }
        }
    });

    onKeyDown('s', () => {
        if (player.curAnim() !== "run" && player.state != "hurt") player.play('crouch');
    });

    onKeyDown('a', () => {
        if(player.state != "hurt") {
            player.move(-SPEED, 0);
            player.flipX = true;
            if (player.isGrounded() &&
                (player.curAnim() !== "run" && 
                player.curAnim() !== "run-shoot")) {
                player.play("run");
            }
        }

        
    });

    onKeyDown('d', () => {
        if(player.state != "hurt") {
            player.move(SPEED, 0);
            player.flipX = false;
            if (player.isGrounded() && 
                (player.curAnim() !== "run" && 
                player.curAnim() !== "run-shoot")) {
                player.play("run");
            }
        }
    });

    // Set player to idle
    dirKeys.forEach((key) => {
        onKeyRelease(key, () => {
            if (player.isGrounded() && !isKeyDown("a") && !isKeyDown("d")) {
                player.play("idle");
            }
            setGravity(640 * SCALE);
        });
    });

    //Landing animation
    player.onGround(() => {
        player.play("land");
    });

    player.onAnimEnd((anim) => {
        if (anim === "land") {
            if (!isKeyDown("left") && !isKeyDown("right")) {
                player.play("idle");
            } else {
                player.play("run");
            }
        }
        if (anim === "jump") {
            player.play('falling');
        }
    });

    player.onUpdate(() => {
        followPlayer();
        if (!player.isGrounded() && !player.isJumping() && player.curAnim() !== 'climb') {
            player.play('falling');
        }

    });

    player.onBeforePhysicsResolve(collision => {
        // Allows the player to jump through platforms
        if (collision.target.is(["platform"]) ) {
            if (!collision.isBottom()) {
                collision.preventResolution();
            }
        }
    });

    player.onPhysicsResolve(() => {
        followPlayer();
    });

    player.onCollideEnd("ladder", () => {
        onLadder = false;
        // player.move(vec2(0,-50));
    });

    player.onCollideUpdate("ladder", () => {
        onLadder = true;
    });

    
    // Invincibility flag
    let invincible = false;

    // Hurt player when they collide with the enemy
    player.onCollide("enemy", () => {
        player.enterState("hurt")
    });

    // Puts player into hurt state
    player.onStateEnter("hurt", () => {
        //Check if the player is on damage cooldown
        if(!invincible) {
            play("player-damage")
            player.hurt(1);
        }
        invincible = true;

        //Hurt player an play animation and turn of damage cooldown
        player.play("hurt");
        wait(0.3, () => {
            player.play("idle")
            player.enterState("normal");
        })
        wait(1, () => {
            invincible = false;
        })
        
    })

    // Bullet shooting
    onMousePress(() => {
        const bulletPos = vec2(player.pos);
        const offset = vec2(15,41);

        //Determine player position and look to the player position during the attack
        if(bulletPos.sub(toWorld(mousePos())).unit().x < 0.0) {
            player.flipX = false;
        }
        else if(bulletPos.sub(toWorld(mousePos())).unit().x > 0.0) {
            player.flipX = true;
        }

        switch (player.curAnim()) {
            case 'run':
                const frame = player.frame;
                player.play('run-shoot');
                player.frame = frame;
            case 'run-shoot':
                offset.y = 38;
                offset.x = 25;
                break;
            case 'idle':
                player.play('shoot');
                break;
            case 'crouch':
                offset.y = 24;
                break;
        }
        if (player.flipX) {
            bulletPos.x -= offset.x;
            bulletPos.y -= offset.y;
        } else {
            bulletPos.x += offset.x;
            bulletPos.y -= offset.y;
        }

        const angle = toWorld(mousePos()).angle(vec2(bulletPos.x, bulletPos.y));
        const toPlayerAngle = toWorld(mousePos()).sub(bulletPos).unit();

        //Check if the angle is not too steep
        if(0.4 <= toPlayerAngle.x || toPlayerAngle.x <= -0.4) {
            play("player-shoot");
            //Spawn bullet
            const bullet = add([
                sprite("bullet"),
                // Flip bullet depending on the shooting direction 
                pos(bulletPos),
                rgb(),
                scale(SCALE/1.5),
                rotate(angle),
                state("fly", ["fly"]),
                anchor('center'),
                area(),
                "friendly-bullet",
                move(angle, 800),
                offscreen({ destroy: true }),
            ])

            //Collision with enemy
            bullet.onCollide("enemy", (enemy) => {
                destroy(bullet);
                enemy.hurt(1);
            });
        }
    });

    // Player death
    player.on("death", () => {
        play("player-death")
        destroy(player)
        go("gameover")
    })

    return player;
}

