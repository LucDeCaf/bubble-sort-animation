import { makeProject } from "@motion-canvas/core";

import intro from "./scenes/intro?scene";

// Prerendered scenes
import bubble from "./scenes/sorting-videos/bubble?scene";

export default makeProject({
    scenes: [intro, bubble],
});
