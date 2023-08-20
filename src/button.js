/**
 * Generates a normal button and returns it.
 * @param {*} textContent - Text that is set in the button
 * @param {*} position - Position of the button
 * @param {*} clickFunction - Function thats being executed on click
 * @returns 
 */
function addButton(textContent, position, clickFunction) {
    loadFont("Unscii", "/assets/fonts/unscii-16.ttf")

    // Button object
    const btn = add([
        rect(240, 80, { radius: 5 }),
        pos(position),
        area(),
        scale(1),
        anchor("center"),
    ])
    
    // Text on button
    btn.add([
        text(textContent, {
            font: "Unscii",
            transform: (idx, ch) => ({
                color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
                pos: vec2(0, wave(-1, 1, time() * 4 + idx * 0.5)),
                // scale: wave(1, 1.1, time() * 5 + idx),
                // angle: wave(-5, 5, time() * 3 + idx),
            })
        }),
        anchor("center"),

        color(0, 0, 0),
    ])
    
    // Button hover changing scale of the button and color
    btn.onHoverUpdate(() => {
        btn.color = hsl2rgb((time() * 10 / 8) % 1, 0.5, 0.9)
        btn.scale = vec2(1.1)
        setCursor("pointer")
    })
    
    // Return to normal state after hover
    btn.onHoverEnd(() => {
        btn.scale = vec2(1)
        btn.color = rgb()
    })
    
    // Execute given function
    btn.onClick(clickFunction)

    return btn
}

export default addButton;