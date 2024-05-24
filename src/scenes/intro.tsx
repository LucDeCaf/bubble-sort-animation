import { Rect, makeScene2D } from "@motion-canvas/2d";
import {
    Reference,
    createRef,
    useLogger,
    Vector2,
} from "@motion-canvas/core";

type Bar = {
    ref: Reference<Rect>;
    value: number;
};

export default makeScene2D(function* (view) {
    const logger = useLogger();
    const dimensions = new Vector2(view.width(), view.height());
    logger.debug(dimensions.toString());

    const bars: Bar[] = [
        { ref: createRef<Rect>(), value: 2 },
        { ref: createRef<Rect>(), value: 1 },
        { ref: createRef<Rect>(), value: 5 },
        { ref: createRef<Rect>(), value: 3 },
        { ref: createRef<Rect>(), value: 4 },
    ];

    
});
