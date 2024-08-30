import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  // Position,
} from "reactflow";

import "reactflow/dist/style.css";

import { initialNodes, initialEdges } from "./components/ReactFlow/nodes-edges";
import DagreComponent from "./components/ReactFlow/DagreComponent";
import CustomVectorLinesNode from "./components/ReactFlow/CustomVectorLinesNode";
import CustomCloudNode from "./components/ReactFlow/CustomCloudNode";
import CustomGeneralNodeLeftTarget from "./components/ReactFlow/CustomGeneralNode";
import CustomCombinedNodeSVG from "./components/ReactFlow/CustomCombinedNodeSVG.jsx";
import ComponentELK from "./components/ReactFlow/ElkComponent";
import Panel from "./components/Panel";
import Implementation from "./components/Implementation/index.js";

// width: 150, height: 36 , every node is at a distance of 50px, so x is last x+50 so 200 added

const nodeTypes = {
  customVectorLinesNode: CustomVectorLinesNode,
  customCloudNode: CustomCloudNode,
  customGeneralNodeLeftTarget: CustomGeneralNodeLeftTarget,
  customCombinedNodeSVG: CustomCombinedNodeSVG,
};
const updatedInitialNodes = initialNodes.map((item, index) => {
  // console.log("item", item);
  return {
    ...item,
    position: { x: initialNodes.at(index - 1).position.x + 200, y: 335 },
  };
});
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [renderComp, setRenderComp] = useState("implementation");
  const [currentNode, setCurrentNode] = useState(4);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const componentObjects = {
    custom: (
      <ReactFlow
        // nodes={nodes}
        nodes={updatedInitialNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    ),
    dagre: <DagreComponent />,
    elk: <ComponentELK />,
    implementation: <Implementation />,
  };

  return (
    <ReactFlowContainer>{componentObjects[renderComp]}</ReactFlowContainer>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
`;

const ReactFlowContainer = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
`;
