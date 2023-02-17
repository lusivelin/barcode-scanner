export type ResultType = {
  codeResult: {
    format: string;
    code: string | null;
    decodedCodes: any[]
  };
};

const Result = ({ result }: { result: ResultType }) => (
  <pre
    // style={{
    //   position: "absolute",
    //   top: -50,
    //   right: -150,
    //   overflow: "auto",
    //   height: "100vh"
    // }}
  >
    {JSON.stringify(result, undefined, 2)}
  </pre>
);

export default Result;
