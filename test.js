const test = require("flug");
const findAndRead = require("find-and-read");
const guessImageLayout = require("./guess-image-layout");

const bands = 4;
const height = 768;
const width = 1024;

const pixel = () => Math.round(Math.random() * 255);

test("rgba data", ({ eq }) => {
  const data = new Array(400).fill(255).map(() => pixel());
  const { layout } = guessImageLayout({ data, height: 10, width: 10 });
  eq(layout, "[row,column,band]");
});

test("3D data", ({ eq }) => {
  const layout = "[band][row][column]";
  const data = new Array(bands)
    .fill(0)
    .map(() => new Array(height).fill(0).map(() => new Array(width).fill(0).map(() => pixel())));
  eq(guessImageLayout({ data }).layout, layout);
  eq(guessImageLayout({ data, height }).layout, layout);
  eq(guessImageLayout({ data, width }).layout, layout);
  eq(guessImageLayout({ data, height, width }).layout, layout);
});

test("data by band", ({ eq }) => {
  const layout = "[band][row,column]";
  const data = new Array(bands).fill(0).map(() => new Array(height * width).fill(0).map(() => pixel()));
  eq(guessImageLayout({ data }).layout, layout);
  eq(guessImageLayout({ data, height }).layout, layout);
  eq(guessImageLayout({ data, width }).layout, layout);
  eq(guessImageLayout({ data, height, width }).layout, layout);
});

test("[row][column][band]", ({ eq }) => {
  const layout = "[row][column][band]";
  const data = new Array(height)
    .fill(0)
    .map(() => new Array(width).fill(0).map(() => new Array(bands).fill(0).map(() => pixel())));
  eq(guessImageLayout({ data }).layout, layout);
  eq(guessImageLayout({ data, height }).layout, layout);
  eq(guessImageLayout({ data, width }).layout, layout);
  eq(guessImageLayout({ data, height, width }).layout, layout);
});

test("[row,column][band]", ({ eq }) => {
  const layout = "[row,column][band]";
  const data = new Array(height * width).fill(0).map(() => new Array(bands).fill(0).map(() => pixel()));
  eq(guessImageLayout({ data }).layout, layout);
  eq(guessImageLayout({ data, height }).layout, layout);
  eq(guessImageLayout({ data, width }).layout, layout);
  eq(guessImageLayout({ data, height, width }).layout, layout);
});
