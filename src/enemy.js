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




    let attackLoopInterval; 

    enemy.onStateEnter("attack", () => {
        attackLoopInterval = setInterval(() => {
            const fixedPlayerPos = player.pos;
            const angle = player.pos.angle(enemy.pos);
            if(angle < -90) {
                enemy.flipX = false;
            }
            else if(angle > -90) {
                enemy.flipX = true;
            }
            if((-250 <= angle && angle <= -60) || (60 <= angle <= 250)) {
                const bullet = add([
                    sprite("bullet"),
                    enemy.flipX ? pos(enemy.pos.x+50, enemy.pos.y-60) : pos(enemy.pos.x-50, enemy.pos.y-60),
                    rgb(),
                    scale(SCALE/1.5),
                    rotate(angle),
                    state("fly", ["fly"]),
                    area(),
                    "bullet",
                    move(angle, 1200),
                    offscreen({ destroy: true }),
                ])

                bullet.onCollide("player", () => {
                    destroy(bullet);
                    player.hurt(20);
                });
            }
        }, 1000);
    });

    enemy.onStateEnd("attack", () => {
        clearInterval(attackLoopInterval);
    })
}


export default spawnEnemy;

