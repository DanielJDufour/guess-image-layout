const getDepth = require("get-depth");

module.exports = function guessImageLayout({ data, height, width }) {
  const depth = getDepth(data);
  if (depth === 1) {
    // guess interleaved rgba ImageData.data
    return { layout: "[row,column,band]" };
  } else if (depth === 2) {
    if (height && width) {
      if (data[0].length === height * width) {
        return { layout: "[band][row,column]" };
      } else if (data.length === height * width) {
        return { layout: "[row,column][band]" };
      }
    } else {
      // assume have more grid cells than bands
      if (data.length < data[0].length) {
        return { layout: "[band][row,column]" };
      } else {
        return { layout: "[row,column][band]" };
      }
    }
  } else if (depth === 3) {
    const len1 = data.length;
    const len2 = data[0].length;
    const len3 = data[0][0].length;
    if (height && width) {
      if (len1 === height && len2 === width) {
        return { layout: "[row][column][band]" };
      } else if (len2 === height && len3 === width) {
        return { layout: "[band][row][column]" };
      }
    } else {
      // assume band count is smaller than height and width
      if (len1 < len2 && len1 < len3) {
        return { layout: "[band][row][column]" };
      } else if (len3 < len1 && len3 < len2) {
        return { layout: "[row][column][band]" };
      }
    }
  }
};
