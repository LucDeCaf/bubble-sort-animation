import { Rect, makeScene2D } from '@motion-canvas/2d';
import {
  type Reference,
  createRef,
  type ThreadGenerator,
  waitFor,
  chain,
  tween,
  map,
  Vector2,
  createRefArray,
  range,
  ReferenceArray,
  makeRef,
} from '@motion-canvas/core';

type Bar = {
  ref: Reference<Rect>;
  value: number;
};

export default makeScene2D(function* (view) {
  const bars: Rect[] = [];

  view.add(
    <Rect gap={40} alignItems={'end'}>
      {range(5).map((i) => (
        <Rect
          ref={makeRef(bars, i)}
          x={-250 + 125 * i}
          y={200 - 50 * i}
          width={100}
          height={100 * (i + 1)}
          fill={'#ff6470'}
          radius={20}
        />
      ))}
    </Rect>
  );

  yield* dropInBars(bars);
});

function* dropInBars(bars: Rect[]): ThreadGenerator {
  for (let i = 0; i < bars.length; i++) {
    const bar = bars[i];
    yield bar.fill('white');

    yield* tween(1, (value) => {
      // bar.position.y(map(-1000, 0, value));
      bar.absolutePosition().lerp(new Vector2(0, 0), value);
    });
  }
}
