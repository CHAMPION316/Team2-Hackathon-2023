import { SCALE } from './game';

// Load all sprites
loadSprite("green-guy", "/assets/sprites/green-guy.png", {
    sliceX: 2, sliceY: 1,
    anims: {
        idle: 0,
        walk: {
            from: 0, to: 1, speed: 5, loop: true
        }
    }
});
loadSprite("bullet", "/assets/props/bullets/shot-preview.gif");


export function greenGuy() {
    return [
        sprite("green-guy"),
        scale(SCALE/1.5),
        area(),
        body(),
        anchor('bot'),
        state("move", [ "idle", "attack", "move", "shoot" ]),
        health(5),
        'enemy',
        'green-guy'
    ]
}


export function setupGreenGuy(level) {
    //Speed values for usage another time
    const ENEMY_SPEED = 240;
    const IDLE_SPEED = 180;

    const ENEMY_ATTACK_DISTANCE = 500;
    //In ms  
    const ENEMY_ATTACK_INTERVAL = 1000;
    const ENEMY_ATTACK_BULLET_SPEED = 800;

    const player = level.get("player")[0];
    const enemies = level.get('green-guy');

    for (const enemy of enemies) {
        enemy.play('idle');

        //Check on every frame if the player is attack range and switch to attack mode
        onUpdate("enemy", (enemy) => {
            const playerPos = player.pos;
            const enemyPos = enemy.pos;
            
            const distanceToPlayer = playerPos.sub(enemyPos).len();

            if (distanceToPlayer < ENEMY_ATTACK_DISTANCE && enemy.state != "attack") {
                enemy.enterState("attack")
            }
            else if(distanceToPlayer > ENEMY_ATTACK_DISTANCE && enemy.state == "attack") {
                enemy.enterState("idle");
            }
        })


        let attackLoopInterval; 

        // Enter attack state and trigger attack loop
        enemy.onStateEnter("attack", () => {
            attackLoop();
            attackLoopInterval = setInterval(attackLoop, ENEMY_ATTACK_INTERVAL);
        });

        // End attack state and clear the attack loop
        enemy.onStateEnd("attack", () => {
            clearInterval(attackLoopInterval);
        })

        /**
         * Executes one attack cycle, checks the position to the player and turns towards them.
         * Shoots bullet if the angle isn't to steep. The bullet travels by given ENEMY_ATTACK_SPEED constant.
         * Also attaches event listener for the collision with the player.
         * This function needs to be executed in an interval to work continously 
         */
        function attackLoop() {
            const angle = player.pos.angle(enemy.pos);
            const toPlayerAngle = player.pos.sub(enemy.pos).unit();

            //Determine player position and look to the player position during the attack
            if(player.pos.sub(enemy.pos).unit().x < 0.0) {
                enemy.flipX = false;
            }
            else if(player.pos.sub(enemy.pos).unit().x > 0.0) {
                enemy.flipX = true;
            }

            //Check if the angle is not to steep
            if(0.4 <= toPlayerAngle.x || toPlayerAngle.x <= -0.4) {
                //Spawn bullet
                const bullet = add([
                    sprite("bullet"),
                    // Flip bullet depending on the shooting direction 
                    enemy.flipX ? pos(enemy.pos.x+50, enemy.pos.y-60) : pos(enemy.pos.x-50, enemy.pos.y-60),
                    rgb(),
                    scale(SCALE/1.5),
                    rotate(angle),
                    state("fly", ["fly"]),
                    area(),
                    "bullet",
                    move(angle, ENEMY_ATTACK_BULLET_SPEED),
                    offscreen({ destroy: true }),
                ])

                //Collision with player
                bullet.onCollide("player", () => {
                    destroy(bullet);
                    player.hurt(20);
                });
            }
        }
    }
}

export default setupGreenGuy;

