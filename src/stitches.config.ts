import { createStitches, globalCss } from "@stitches/core";

export const { css } = createStitches({});

export const globalStyles = globalCss({
  "*": { margin: 0, padding: 0 },
});
