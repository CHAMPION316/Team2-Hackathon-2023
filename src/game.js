
import kaboom from "kaboom"

const engine = kaboom();

// Because Kaboom's asset loading is stupid 👍
if (window.location.host.includes('github.io')) {
	loadRoot('/Team2-Hackathon-2023/');
} else {
	loadRoot('');
}

debug.inspect = false;


export const SCALE = 1;
export const CAMERA_SCALE = 4;


export default engine;