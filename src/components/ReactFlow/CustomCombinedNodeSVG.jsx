import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import combined from "../images/combined.svg";

function CustomCombinedNodeSVG({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div>
      <img src={combined} alt="combined" />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomCombinedNodeSVG;
