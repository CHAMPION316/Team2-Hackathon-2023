
import { SCALE } from './game';

export function goal() {
    return [
        sprite("blank"),
        scale(SCALE),
        area(),
        'goal'
    ]
}

export function setupGoal(level) {
    const goals = level.get("goal");

    for (const goal of goals) {
        goal.onCollide('player', ()=>{
            go("win")
        });
    }
}
