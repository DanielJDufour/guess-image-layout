import test from "flug";
import findAndRead from "find-and-read";
import guessImageLayout from "./guess-image-layout";

const bands = 4;
const height = 768;
const width = 1024;

const range = ct => new Array(ct).fill(0).map((_, i) => i);

const pixel = () => Math.round(Math.random() * 255);

test("rgba data", ({ eq }) => {
  const layout = "[row,column,band]";
  const data = new Array(bands * height * width).fill(0).map(() => pixel());
  eq(guessImageLayout({ data }), { layout, height: undefined, width: undefined, bands: undefined });
  eq(guessImageLayout({ data, bands, height }), { layout, height, width, bands });
  eq(guessImageLayout({ data, bands, width }), { layout, height, width, bands });
  eq(guessImageLayout({ data, bands, height, width }), { layout, height, width, bands });
});

test("3D data", ({ eq }) => {
  const layout = "[band][row][column]";
  const data = new Array(bands)
    .fill(0)
    .map(() => new Array(height).fill(0).map(() => new Array(width).fill(0).map(() => pixel())));
  eq(guessImageLayout({ data }), { layout, height, width, bands });
  eq(guessImageLayout({ data, height }), { layout, height, width, bands });
  eq(guessImageLayout({ data, width }), { layout, height, width, bands });
  eq(guessImageLayout({ data, height, width }), { layout, height, width, bands });
});

test("data by band", ({ eq }) => {
  const layout = "[band][row,column]";
  const data = new Array(bands).fill(0).map(() => new Array(height * width).fill(0).map(() => pixel()));
  eq(guessImageLayout({ data }), { layout, height: undefined, width: undefined, bands });
  eq(guessImageLayout({ data, height }), { layout, height, width, bands });
  eq(guessImageLayout({ data, width }), { layout, height, width, bands });
  eq(guessImageLayout({ data, height, width }), { layout, height, width, bands });
});

test("[row][column][band]", ({ eq }) => {
  const layout = "[row][column][band]";
  const data = new Array(height)
    .fill(0)
    .map(() => new Array(width).fill(0).map(() => new Array(bands).fill(0).map(() => pixel())));
  eq(guessImageLayout({ data }), { layout, height, width, bands });
  eq(guessImageLayout({ data, height }), { layout, height, width, bands });
  eq(guessImageLayout({ data, width }), { layout, height, width, bands });
  eq(guessImageLayout({ data, height, width }), { layout, height, width, bands });
});

test("[row,column][band]", ({ eq }) => {
  const layout = "[row,column][band]";
  const data = new Array(height * width).fill(0).map(() => new Array(bands).fill(0).map(() => pixel()));
  eq(guessImageLayout({ data }), { layout, height: undefined, width: undefined, bands });
  eq(guessImageLayout({ data, height }), { layout, height, width, bands });
  eq(guessImageLayout({ data, width }), { layout, height, width, bands });
  eq(guessImageLayout({ data, height, width }), { layout, height, width, bands });
});

test("[row,column][band]", ({ eq }) => {
  const layout = "[row,column][band]";
  const data = new Array(height * width).fill(0).map(() => [ 0, 0, 0, 0 ]);
  eq(guessImageLayout({ data }), { layout, height: undefined, width: undefined, bands });
  eq(guessImageLayout({ data, height }), { layout, height, width, bands });
  eq(guessImageLayout({ data, width }), { layout, height, width, bands });
  eq(guessImageLayout({ data, height, width }), { layout, height, width, bands });
});

test("unknown size", ({ eq }) => {
  const layout = "[band][row][column]";
  const data = range(bands).map(() => range(height).map(() => new Array(width).fill(0).map(() => pixel())));
  eq(guessImageLayout({ data, layout }), { layout, height, width, bands });
  eq(guessImageLayout({ data, height }), { layout, height, width, bands });
  eq(guessImageLayout({ data, width }), { layout, height, width, bands });
  eq(guessImageLayout({ data, height, width }), { layout, height, width, bands });
});

test("just bands", ({ eq }) => {
  const layout = "[band][row,column]";
  const data = range(bands).map(() => range(height * width).map(() => pixel()));
  eq(guessImageLayout({ data, layout }), { layout, height: undefined, width: undefined, bands });
});