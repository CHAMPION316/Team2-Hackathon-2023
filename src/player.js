
import { SCALE } from './game';


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
            speed: 5,
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

const SPEED = 120 * SCALE;
const JUMP_FORCE = 320 * SCALE;
const HIT_POINTS = 100;

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
        'player',
    ];
}

export function getPlayer(level) {
    const player = level.get("player")[0];
    const dirKeys = ["w", "s", "a", "d"];
    let onLadder = false;

    player.play('idle');


    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE)
            player.play("jump")
        }
    });

    onKeyDown('w', () => {
        if (onLadder) {
            player.move(0, -SPEED/2);
            player.jump(20);
            player.play("climb");
        }
    });

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

    dirKeys.forEach((key) => {
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
        if (anim === "jump") {
            player.play('falling');
        }
    });

    player.onUpdate(() => {
        camPos(player.pos);
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
        camPos(player.pos);
    });

    player.onCollide('ladder', () => {
        onLadder = true;
    });

    player.onCollideEnd('ladder', () => {
        onLadder = false;
    });

    return player;
}