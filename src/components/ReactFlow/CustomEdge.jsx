import React from "react";
import { getBezierPath, EdgeLabelRenderer, BaseEdge } from "reactflow";

const CustomEdge = ({ id, data, ...props }) => {
  const [edgePath, labelX, labelY] = getBezierPath(props);

  return (
    <>
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: "#ffcc00",
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
            border: "2px solid black",
          }}
          className="nodrag nopan"
        >
          {"Hello"}
        </div>
      </EdgeLabelRenderer>
      <BaseEdge id={id} path={edgePath} />
    </>
  );
};

export default CustomEdge;
