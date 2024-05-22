import { Icon, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import {
    type ThreadGenerator,
    range,
    easeOutCubic,
    Reference,
    createRef,
    all,
    sequence,
    useLogger,
    Vector2,
    waitUntil,
    waitFor,
    linear,
} from "@motion-canvas/core";
import { MonoLabel } from "../components/MonoLabel";

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

    view.add(
        range(5).map((i) => (
            <Rect
                ref={bars[i].ref}
                x={-250 + 125 * i}
                y={200 - 50 * bars[i].value - dimensions.y}
                width={100}
                height={100 * bars[i].value}
                fill={"#ff6470"}
                radius={20}
            />
        )),
    );

    yield* waitUntil("show bars");

    yield* sequence(
        0.2,
        ...bars.map((bar) =>
            bar.ref().position.y(200 - 50 * bar.value, 1, easeOutCubic),
        ),
    );

    yield* waitUntil("show arrows");

    const leftArrow = createRef<Icon>();
    const rightArrow = createRef<Icon>();

    view.add([
        <Icon
            x={bars[0].ref().x()}
            y={300}
            ref={leftArrow}
            size={100}
            color="#ffffff"
            opacity={0}
            icon="bi:arrow-up"
        />,
        <Icon
            x={bars[1].ref().x()}
            y={300}
            ref={rightArrow}
            size={100}
            color="#ffffff"
            opacity={0}
            icon="bi:arrow-up"
        />,
    ]);

    const leftArrowLabel = createRef<MonoLabel>();
    const rightArrowLabel = createRef<MonoLabel>();

    view.add([
        <MonoLabel
            ref={leftArrowLabel}
            top={leftArrow().bottom().addY(50)}
            fontSize={40}
            opacity={0}
        >
            i
        </MonoLabel>,
        <MonoLabel
            ref={rightArrowLabel}
            top={rightArrow().bottom().addY(50)}
            fontSize={40}
            opacity={0}
        >
            i+1
        </MonoLabel>,
    ]);

    const arrowFadeInTime = 0.5;
    const arrowOpacity = 0.6;
    yield* all(
        leftArrow().opacity(arrowOpacity, arrowFadeInTime),
        rightArrow().opacity(arrowOpacity, arrowFadeInTime),
        leftArrowLabel().opacity(arrowOpacity, arrowFadeInTime),
        rightArrowLabel().opacity(arrowOpacity, arrowFadeInTime),
    );

    yield* waitUntil("visual sort");

    yield* visualSortBars(bars);

    yield* waitUntil("visual unsort");

    yield* visualUnsortBars(bars);

    yield* waitFor(2);
});

function* visualSortBars(bars: Bar[]) {
    const sortedBars = [...bars].sort((a, b) => a.value - b.value);
    console.log(sortedBars);

    yield* all(
        ...sortedBars.map((bar, i) => bar.ref().position.x(-250 + 125 * i, 1)),
    );
}

function* visualUnsortBars(bars: Bar[]) {
    yield* all(
        ...bars.map((bar, i) => bar.ref().position.x(-250 + 125 * i, 1)),
    );
}
