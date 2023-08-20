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

    const enemyAttackDistance = 1200; 
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


    shooting = false;
    enemy.onStateEnd("attack", () => {
        shooting = false;
    })

    enemy.onStateEnter("attack", () => {
        loop(1, () => {
            const fixedPlayerPos = player.pos;
            const angle = player.pos.angle(enemy.pos);
            if(angle < -90) {
                enemy.flipX = false;
            }
            else if(angle > -90) {
                enemy.flipX = true;
            }
            if((-250 <= angle && angle <= -60) || (60 <= angle <= 250)) {
                console.log(angle);
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
        });
    });
}



// export function spawnEnemy(level, id) {
//     const ENEMY_SPEED = 240;
//     const IDLE_SPEED = 180;


//     const enemyAttackDistance = 200; 

    

//     // const enemy = level.spawn([
//     //     sprite("enemyA"),
//     //     pos(50, 50),
//     //     anchor("bot"),
//     //     scale(SCALE/1.5),
//     //     area(),
//     //     body(),
//     //     state("move", [ "idle", "attack", "move"]),
//     //     "enemy"
//     // ])

    
    
    
//     // enemy.onStateEnter("idle", async () => {
//     //     await wait(2)
//     //     console.log("I am waiting")
//     //     enemy.enterState("move")
//     // })
//     // enemy.enterState("idle");

//     onUpdate("enemy", (enemy) => {
//         const playerPos = player.pos;
//         const enemyPos = enemy.pos;
        
//         const distanceToPlayer = playerPos.sub(enemyPos).len();

//         if (distanceToPlayer < enemyAttackDistance) {
//             enemy.enterState("attack")
//         }
//         else if(distanceToPlayer > enemyAttackDistance && enemy.state == "attack") {
//             enemy.enterState("idle");
//         }
//     })

//     // Not used as of now 

//     // enemy.onStateEnter("move", () => {
//     //     let toIdle = false;

//     //     while(!toIdle) {
            
//     //         switch(Math.ceil(rand(10))) {
//     //             case 2:
//     //                 enemy.move(vec2(0, -1).scale(IDLE_SPEED));
//     //                 console.log("Move north")
//     //                 // North
//     //                 break;
//     //             case 3:
//     //                 // East
//     //                 enemy.move(vec2(-1, -0).scale(IDLE_SPEED));
//     //                 break;
//     //             case 4:
//     //                 // South
//     //                 enemy.move(vec2(0, 1).scale(IDLE_SPEED));
//     //                 break;
//     //             case 5:
//     //                 //  West
//     //                 enemy.move(vec2(1, 0).scale(IDLE_SPEED));
//     //                 break;
//     //             case 7:
//     //                 // North east
//     //                 enemy.move(vec2(-1, -1).scale(IDLE_SPEED));
//     //                 break;
//     //             case 8:
//     //                 // South east
//     //                 enemy.move(vec2(-1, 1).scale(IDLE_SPEED));
//     //                 break;
//     //             case 9:
//     //                 // South west
//     //                 enemy.move(vec2(0.5, 1).scale(IDLE_SPEED));
//     //                 break;
//     //             case 10:
//     //                 // North west
//     //                 enemy.move(vec2(1, -1).scale(IDLE_SPEED));
//     //                 break;
//     //             default:

//     //                 toIdle = true;
//     //                 console.log("toIdle")
//     //                 break;
//     //         }

//     //         wait(1);

//     //         if(toIdle) {
//     //             toIdle = true;
//     //         }
//     //     };
//     //         enemy.enterState("idle");

            
            

        
//     // })
    

    

//     return enemy;
// }

export default spawnEnemy;

