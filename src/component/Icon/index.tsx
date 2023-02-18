import { SVGProps } from "react";

export function BarcodeSymbol(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M1 19V5h2v14Zm3 0V5h2v14Zm3 0V5h1v14Zm3 0V5h2v14Zm3 0V5h3v14Zm4 0V5h1v14Zm3 0V5h3v14Z"
      ></path>
    </svg>
  );
}

export function SearchSymbol(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
