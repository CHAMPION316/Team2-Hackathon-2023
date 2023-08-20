
function displaySoundSettings() {
    //Load volume level
    const savedVolume = parseFloat(localStorage.getItem("volume"));
    volume((savedVolume ? savedVolume : 0.5));

    //Load sprites
    loadSprite("mute", "/assets/ui/mute.png")
    loadSprite("speaker", "/assets/ui/speaker.png")

    // Setup button and handle
    const soundBtn = add([
        rect(60, 60, { radius: 10 }),
        pos(width() - 60, 60),
        color(255, 255, 255),
        area(),
        scale(1),
        fixed(),
        anchor("center"),
    ])
    const speakerIcon = soundBtn.add([
        volume() == 0 ? sprite("mute") : sprite("speaker"),
        anchor("center"),
        color(0, 0, 0),
        scale(0.08)
    ]);

    const volumeSlider = add([
		rect(250, 30, { radius: 10 }),
		color(255, 255, 255),
		anchor("right"),
        fixed(),
		pos(width()-120, -60),
	]);

    const volumeHandle = volumeSlider.add([
        pos(-250+volume()*250, -0),
        circle(25, 25),
        outline(10),
		color(222,154,65),
        drag(),
        area(),
        "volumeHandle"
    ]);


    let curDraggin = null;
    let curTween = null

    //Sound slider toggle
    function toggleSoundslider() {
        if (curTween) curTween.cancel()

		curTween = tween(
			volumeSlider.pos,
			volumeSlider.hidden ? pos(width()-120, 60).pos : pos(width()-120, -60).pos,
			0.5,
			(p) => volumeSlider.pos = p,
			easings.easeOutElastic,
		)

		if (volumeSlider.hidden) {
			volumeSlider.hidden = false
		} else {
			curTween.onEnd(() => {
				volumeSlider.hidden = true
			})
		}
    }

    volumeSlider.hidden = true;

    // Drag function
    function drag() {

        // The displacement between object pos and mouse pos
        let offset = vec2(0)
    
        return {
            // Name of the component
            id: "drag",
            // This component requires the "pos" and "area" component to work
            require: [ "pos", "area" ],
            pick() {
                // Set the current global dragged object to this
                curDraggin = this
                offset = mousePos().sub(this.pos)
                this.trigger("drag")
            },
            // "update" is a lifecycle method gets called every frame the obj is in scene
            update() {
                if (curDraggin === this) {
                    const currentX = mousePos().sub(offset).x
                    if(currentX >= -250 && currentX <= 0) {
                        this.pos = vec2(currentX, 0)
                        this.trigger("dragUpdate")
                    }
                    
                }
            },
            onDrag(action) {
                return this.on("drag", action)
            },
            onDragUpdate(action) {
                return this.on("dragUpdate", action)
            },
            onDragEnd(action) {
                return this.on("dragEnd", action)
            },
        }
    
    }

    onMousePress(() => {
        if (curDraggin) {
            return
        }
        if(volumeSlider.hidden) {
            if(soundBtn.isHovering()) {
                toggleSoundslider()
            }
        }
        else {
            if(volumeHandle.isHovering()) {
                volumeHandle.pick()
            }
            if(!volumeHandle.isHovering()) {
                toggleSoundslider()
            }
        }        
    })
    
    // Drop whatever is dragged on mouse release
    onMouseRelease(() => {
        if (curDraggin) {
            curDraggin.trigger("dragEnd")
            let volumeLevel = Math.floor(((curDraggin.pos.x + 250) / 250) * 100) / 100;
            if(volumeLevel <= 0.02) {
                volume(0)
            }
            else {
                volume(volumeLevel);
            }
            localStorage.setItem("volume", volume());

            if(volume() > 0) {
                // Text on button
                speakerIcon.use(sprite("speaker"))
            }
            else {
                // Text on button
                speakerIcon.use(sprite("mute"))
            }
            curDraggin = null
        }
    });


    volumeHandle.onHoverUpdate(() => {
        // volumeHandle.color = hsl2rgb((time() * 5 / 16) % 1, 1, 0.7)
        volumeHandle.scale = vec2(1.1)
        setCursor("pointer")
    })

    volumeHandle.onHoverEnd(() => {
        volumeHandle.scale = vec2(1)
        // volumeHandle.color = rgb()
    })

    
    // onHoverUpdate() comes from area() component
    // it runs every frame when the object is being hovered
    soundBtn.onHoverUpdate(() => {
        soundBtn.color = hsl2rgb((time() * 10 / 8) % 1, 0.5, 0.9)
        soundBtn.scale = vec2(1.1)
        setCursor("pointer")
    })
    
    // onHoverEnd() comes from area() component
    // it runs once when the object stopped being hovered
    soundBtn.onHoverEnd(() => {
        soundBtn.scale = vec2(1)
        soundBtn.color = rgb()
    })
    
    return soundBtn
}

export default displaySoundSettings;