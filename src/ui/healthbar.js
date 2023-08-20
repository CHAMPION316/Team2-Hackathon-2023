/**
 * 
 * @param {*} player - the player object that is needed for the health calculation
 * @returns the health bar
 */
function displayHealthBar(player) {   
    const bar = add([
        pos(30, 30),
        fixed(),
        "bar"
    ])

    // First red layer under the green health bar
    bar.add([
        rect(50*player.maxHP(), 40, {rounded:10}),
        color(255, 0, 0),
        outline(4)
    ])

    // Second green layer on top displaying the health
    const healthAmount = bar.add([
        rect(50*player.hp(), 40, {rounded:10}),
        color(0, 255, 0),
        outline(4)
    ])
    
    // Change size of health bar amount when player gets hurt
    player.on("hurt", () => {
        healthAmount.width = 50*player.hp()
        
    })

    return bar;
};
export default displayHealthBar;