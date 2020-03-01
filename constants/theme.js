const colors = {
  light: {
    accent: "#F3534A",
    primary: "#0AC4BA",
    secondary: "#2BDA8E",
    tertiary: "#FFE358",
    black: "#323643",
    white: "#FFFFFF",
    gray: "#F2F2F9",
    gray2: "#C5CCD6",
    red: "#FF6865",
    yellow: "#EDAD35",
    green: "#00B894",
    orange: "#FD9600",
    blue: "#006CFF"
  },
  dark: {
    accent: "#F3534A",
    primary: "#0AC4BA",
    secondary: "#2BDA8E",
    tertiary: "#FFE358",
    black: "#323643",
    white: "#FFFFFF",
    gray: "#9DA3B4",
    gray2: "#C5CCD6",
    red: "#FF6865",
    yellow: "#EDAD35",
    green: "#00B894"
  }
};

const sizes = {
  // global sizes
  base: 20,
  font: 14,
  radius: 10,
  btnRadius: 500,
  padding: 20,
  maxHeight: 80,

  // font sizes
  h1: 50,
  h2: 20,
  h3: 18,
  title: 36,
  header: 18,
  body: 16,
  caption: 14
};

const fonts = {
  h1: {
    fontSize: sizes.h1
  },
  h2: {
    fontSize: sizes.h2
  },
  h3: {
    fontSize: sizes.h3
  },
  header: {
    fontSize: sizes.header
  },
  title: {
    fontSize: sizes.title
  },
  body: {
    fontSize: sizes.body
  },
  caption: {
    fontSize: sizes.caption
  }
};

export { colors, sizes, fonts };
