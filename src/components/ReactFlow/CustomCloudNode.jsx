import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import cloud from "../images/cloud.svg";

function CustomCloudNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div>
      <img src={cloud} alt="vectorLines" />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
      {/* <Handle
        type="target"
        position={Position.Left}
        id="b"
        isConnectable={isConnectable}
      /> */}
    </div>
  );
}

export default CustomCloudNode;
