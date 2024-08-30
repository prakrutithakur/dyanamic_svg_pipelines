import { useCallback } from "react";
import { Handle, Position } from "reactflow";
// import pipe from "../images/pipe.svg";
// import node from "../images/node.svg";

function NodesOnRight(props) {
  const data = "Node";
  const isConnectable = true;
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div>
      {/* <img src={pipe} alt="pipe" /> */}
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid black",
          height: 100,
          width: 100,
          alignContent: "center",
          textAlign: "center",
        }}
      >
        {props.data.label}
      </div>
      <Handle
        type="source"
        position={Position.Top}
        isConnectable={isConnectable}
        isConnectableStart={(props) => console.log(props)}
        style={{ left: 85 }}
        id="dash"
      />
      <Handle
        type="source"
        position={Position.Top}
        isConnectable={isConnectable}
        isConnectableStart={(props) => console.log(props)}
        // style={{ top: 10 }}
        id="a"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        isConnectable={isConnectable}
        // style={{ bottom: 12 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="d"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default NodesOnRight;
