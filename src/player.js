
import game, { SCALE } from './game';


loadSprite("player", "/assets/sprites/player.png", {
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
            speed: 10,
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
            speed: 10,
            loop: false
        }

    }
});

export default function spawnPlayer(pos, hitPoints) {
    const SPEED = 120 * SCALE;
    const JUMP_FORCE = 240 * (SCALE/2);

    const player = game.add([
        sprite("player"),
        pos,
        anchor('center'),
        scale(SCALE),
        area(),
        body(),
        health(hitPoints),
        'player',
    ]);

    player.play('idle');


    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE)
            player.play("jump")
        }
    })

    onKeyDown('a', () => {
        player.move(-SPEED, 0);
        player.flipX = true;
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run");
        }
    });

    onKeyDown('d', () => {
        player.move(SPEED, 0);
        player.flipX = false;
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run");
        }
    });

    ["a", "d"].forEach((key) => {
        onKeyRelease(key, () => {
            if (player.isGrounded() && !isKeyDown("a") && !isKeyDown("d")) {
                player.play("idle");
            }
        });
    });

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
    })

    player.onUpdate(() => {
        camPos(player.pos);
        if (!player.isGrounded() && player.curAnim() !== 'jump') {
            player.play('falling');
        }
    })
    
    player.onPhysicsResolve(() => {
        camPos(player.pos);
    })


    return player;
}