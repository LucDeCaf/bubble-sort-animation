import { Rect, makeScene2D } from "@motion-canvas/2d";
import {
    ThreadGenerator,
    all,
    easeInOutCubic,
    makeRef,
    range,
    useLogger,
} from "@motion-canvas/core";
import { loadConfigFromFile } from "vite";

enum SortAction {
    COMPARE,
    SWAP,
    NEXT_ITER,
}

function barsToString(bars: Rect[]): string {
    return bars.map((bar) => bar.height().toString()).join(", ");
}

export default makeScene2D(function* (view) {
    const logger = useLogger();

    const bars: Rect[] = [];

    view.add(
        range(5).map((i) => (
            <Rect
                ref={makeRef(bars, i)}
                x={-250 + 125 * i}
                y={50 * (5 - i)}
                fill={"#1f1f1f"}
                width={100}
                height={100 * (i + 1)}
                radius={20}
            />
        )),
    );

    yield* shuffleBars(bars);

    logger.info("presort: " + barsToString(bars));

    // Sort the list
    yield* bubbleSortIterative(bars);

    logger.info("postsort: " + barsToString(bars));

    yield;
});

export function* bubbleSortIterative(bars: Rect[]): ThreadGenerator {
    for (let i = 0; i < bars.length; i++) {
        for (let j = 0; j < bars.length - 1; j++) {
            if (bars[j].height() > bars[j + 1].height()) {
                [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
                yield* swap(bars[i], bars[j]);
            }
        }
    }
}

function* shuffleBars(bars: Rect[]): ThreadGenerator {
    for (let i = bars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bars[i], bars[j]] = [bars[j], bars[i]];
    }
    yield* updateBarPositions(bars);
}

function* updateBarPositions(bars: Rect[]) {
    yield* all(
        ...bars.map((bar, i) =>
            bar.position.x(-250 + 125 * i, 1, easeInOutCubic),
        ),
    );
}

function* swap(first: Rect, second: Rect) {
    const firstpos = first.x();
    const secondpos = second.x();

    yield* all(
        first.x(secondpos, 1, easeInOutCubic),
        second.x(firstpos, 1, easeInOutCubic),
    );
}
