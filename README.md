# guess-image-layout
Guess the Layout of Image Pixels.  Returns layout in xdim layout syntax.

# xdim layout syntax
To read more about the xdim layout syntax, please consult: https://github.com/danieljdufour/xdim

# install
```bash
npm install guess-image-layout
```

# usage
```js
import guessImageLayout from "guess-image-layout";

const rgba = [123, 234, 42, 255, 124, 42, 42, 255, ...];
const { layout } = guessImageLayout({ data: rgba });
// layout is "[row,column,band]"

const  = [
  [123, 124, ...], // red band
  [234, 42, ...], // green band
  [42, 42, ...], // blue band
  [255, 255, ...] // alpha band
];
const { layout } = guessImageLayout({ data: 3d_data });
// layout is "[band][row,column]"
```