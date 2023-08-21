
import { SCALE } from './game';
import { bgMusic } from './main';

export function goal() {
    return [
        sprite("blank"),
        scale(SCALE),
        area(),
        'goal'
    ]
}

loadSound("win", "/assets/audio/win.ogg")

export function setupGoal(level) {
    const goals = level.get("goal");

    for (const goal of goals) {
        goal.onCollide('player', ()=>{
            //Pause general music and play winning tune
            bgMusic.paused = true;
            go("win")
            const win = play("win")

            //Switch back to bg music
            win.onEnd(() => {
                bgMusic.paused = false;
            })
        });
    }
}
