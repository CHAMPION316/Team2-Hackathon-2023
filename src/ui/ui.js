import displayHealthBar from "./healthbar"
import displaySoundSettings from "./sound_settings"

function displayUi(player) {
    displayHealthBar(player)
    displaySoundSettings()
}

export default displayUi;