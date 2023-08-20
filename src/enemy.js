import { SCALE } from './game';

// Load all sprites
loadSpriteAtlas("/assets/sprites/alien-46x64.png", {
    "enemyA": {
        x: 0, y: 0, width: 48, height: 62
    },
    "enemy-b": {
        x: 48, y: 0, width: 32, height: 48
    }
});
loadSprite("bullet", "/assets/props/bullets/shot-preview.gif");

/**
 * Spawns one enemy at given position and handles attack logic for it
 * 
 * @param {*} level - Requires the current level to spawn the enemy
 * @param {*} player - Requires the player to calculate the relative position to the player
 * @param {number} posX - Requires posX to set the X spawning position
 * @param {number} posY - Requires posY to set the Y spawning position
 * @returns {*} - Returns the enemy
 */
export function spawnEnemy(level, player, posX, posY) {
    //Speed values for usage another time
    const ENEMY_SPEED = 240;
    const IDLE_SPEED = 180;

    const ENEMY_ATTACK_DISTANCE= 1000;
    //In ms  
    const ENEMY_ATTACK_INTERVAL= 1000;
    const ENEMY_ATTACK_BULLET_SPEED = 800;

    const enemy = level.spawn([
        anchor('bot'),
        sprite("enemyA"),
        area(),
        scale(SCALE/1.5),
        body(),
        // Other reserved if the enemy starts moving at some point
        state("move", [ "idle", "attack", "move", "shoot" ]),
        health(5),
        'enemy',
    ], posX, posY)

    //Check on every frame if the player is attack range and switch to attack mode
    onUpdate("enemy", (enemy) => {
        const playerPos = level.get("player")[0].pos;
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

export default spawnEnemy;

