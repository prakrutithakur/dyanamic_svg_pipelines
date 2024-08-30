import { useCallback, useEffect, useRef } from "react";
import combined from "../../../images/combinedRawData.svg";

function CustomCombinedNodeSVG({ data, isConnectable, setCurrentRef }) {
  console.log("CustomCombinedNodeSVG");
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <img
      ref={(e) => {
        e && setCurrentRef(e.getBoundingClientRect());
      }}
      src={combined}
      alt="combined"
    />
  );
}

export default CustomCombinedNodeSVG;
