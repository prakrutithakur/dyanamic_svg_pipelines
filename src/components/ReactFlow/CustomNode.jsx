import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import chip from "../images/chip.svg";

function CustomNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#2F2F2F",
      }}
    >
      <img src={chip} alt="chip" />
      {/* <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      /> */}
    </div>
  );
}

export default CustomNode;
