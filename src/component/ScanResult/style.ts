import { css, keyframes } from "../../stitches.config";

const fadeIn = keyframes({
  "0%": {  transform: 'translateY(100%)' },
  "100%": { transform: 'translateY(0)' },
});

export const container = css({
  position: "fixed",
  bottom: 0,
  zIndex: 1000,

  width: "100%",
  background: "#fff",

  borderTopRightRadius: 30,
  borderTopLeftRadius: 30,
  animation: `${fadeIn} 1s`,
});

export const content = css({
  padding: "15px 30px",
});

export const header = css({
  display: "flex",
  justifyContent: "space-between",
  width: "auto",
  height: "auto",
  "& p, span": {
    fontSize: "1.2em",
  },
  "& span": {
    color: "#999",
  },
});
export const searchSvg = css({
  width: "3em",
  height: "3em",
  padding: 12,
  borderRadius: "50%",
  background: "#333",
});

export const body = css({
  display: "flex",
  justifyContent: "space-between",
  paddingTop: 20,
  paddingBottom: 20,
});

export const barCodeImage = css({
  width: "4.5em",
  height: "4.5em",
});

export const barCodeResult = css({
  "& p, span": {
    fontSize: "1.2em",
  },
  "& span": {
    color: "#999",
  },
});
