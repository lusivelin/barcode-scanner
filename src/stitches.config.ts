import { createStitches, globalCss } from "@stitches/core";

export const { css, keyframes } = createStitches({});

export const globalStyles = globalCss({
  "*": { margin: 0, padding: 0 },
  "@import":
    "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
  html: {
    fontFamily: `Poppins`,

    fontSize: "1em",
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: "normal",
  },

  "input, textarea, option, select, button": {
    font: "inherit",
    fontFamily: "inherit",
  },

  "b, strong": {
    fontWeight: "700",
  },

  "h1, h2, h3, h4, h5, h6": {
    fontWeight: "inherit",
  },
});
