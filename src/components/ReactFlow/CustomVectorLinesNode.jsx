import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import vectorLines from "../images/vectorLines.svg";

function CustomVectorLinesNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div>
      <img src={vectorLines} alt="vectorLines" />
      {/* <Handle
        type="source"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        isConnectable={isConnectable}
      /> */}
    </div>
  );
}

export default CustomVectorLinesNode;
