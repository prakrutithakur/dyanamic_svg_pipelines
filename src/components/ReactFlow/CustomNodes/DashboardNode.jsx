import { useCallback } from "react";
import { Handle, Position } from "reactflow";
// import pipe from "../images/pipe.svg";
// import node from "../images/node.svg";
import dashboard from "../../images/dashboard.svg";

function DashboardNode(props) {
  const data = "Node";
  const isConnectable = true;
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div>
      <img src={dashboard} alt="dashboard" />
      {/* right does not work in styles */}

      <Handle
        type="target"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
        style={{ left: 220 }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="c"
        isConnectable={isConnectable}
        style={{ bottom: 100 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="d"
        isConnectable={isConnectable}
        style={{ left: 95 }}
      />
    </div>
  );
}

export default DashboardNode;
