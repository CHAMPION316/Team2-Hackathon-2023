import { SCALE } from './game';


loadSpriteAtlas("/assets/sprites/alien-46x64.png", {
    "enemyA": {
        x: 0, y: 0, width: 48, height: 62
    },
    "enemy-b": {
        x: 48, y: 0, width: 32, height: 48
    }
});
loadSprite("bullet", "/assets/props/bullets/shot-preview.gif");

const enemyAttackDistance = 500;




export function spawnEnemy(level, player, posX, posY) {

    const ENEMY_SPEED = 240;
    const IDLE_SPEED = 180;

    const enemyAttackDistance = 800; 
    const enemy = level.spawn([
        anchor('bot'),
        sprite("enemyA"),
        area(),
        scale(SCALE/1.5),
        body(),
        state("move", [ "idle", "attack", "move", "shoot" ]),
        health(5),
        'enemy',
    ], posX, posY)


    onUpdate("enemy", (enemy) => {
        const playerPos = level.get("player")[0].pos;
        const angle = player.pos.angle(enemy.pos);
        const enemyPos = enemy.pos;
        
        const distanceToPlayer = playerPos.sub(enemyPos).len();

        if (distanceToPlayer < enemyAttackDistance && enemy.state != "attack") {
            enemy.enterState("attack")
        }
        else if(distanceToPlayer > enemyAttackDistance && enemy.state == "attack") {
            enemy.enterState("idle");
        }
    })


function attackLoop() {
    const fixedPlayerPos = player.pos;
            const angle = player.pos.angle(enemy.pos);
            const toPlayerAngle = player.pos.sub(enemy.pos).unit();

            if(player.pos.sub(enemy.pos).unit().x < 0.0) {
                enemy.flipX = false;
                // console.log(angle + " is the current angle it should be LESS THAN -90. Looking left now")
            }
            else if(player.pos.sub(enemy.pos).unit().x > 0.0) {
                enemy.flipX = true;
                // console.log(angle + " is the current angle it should be MORE THAN -90. Looking right nows")
            }

            if(0.4 <= toPlayerAngle.x || toPlayerAngle.x <= -0.4) {
                const bullet = add([
                    sprite("bullet"),
                    enemy.flipX ? pos(enemy.pos.x+50, enemy.pos.y-60) : pos(enemy.pos.x-50, enemy.pos.y-60),
                    rgb(),
                    scale(SCALE/1.5),
                    rotate(angle),
                    state("fly", ["fly"]),
                    area(),
                    "bullet",
                    move(angle, 600),
                    offscreen({ destroy: true }),
                ])

                bullet.onCollide("player", () => {
                    destroy(bullet);
                    player.hurt(20);
                });
            }
}


    let attackLoopInterval; 

    enemy.onStateEnter("attack", () => {
        attackLoop();
        attackLoopInterval = setInterval(attackLoop, 1000);
    });

    enemy.onStateEnd("attack", () => {
        clearInterval(attackLoopInterval);
    })
}


export default spawnEnemy;

