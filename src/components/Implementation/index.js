import React, { useState, useEffect, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  // useEdgesState,
  useNodesState,
} from "reactflow";
import CustomCombinedNodeSVG from "./components/Nodes/CustomCombinedNodeSVG";
import AddButtonNodeSVG from "./components/Nodes/AddButtonNodeSVG";
import CustomGaugeNode from "./components/Nodes/CustomGaugeNode";
import CustomPipe from "./components/Nodes/CustomPipe";
import CustomDatabase from "./components/Nodes/CustomDatabase";
import CustomcurvedPipe from "./components/Nodes/CustomcurvedPipe";
import CustomDataExp from "./components/Nodes/CustomDataExp";
import { addIconsInsertion } from "./components/addIconsinsertion";
import { onNodesChange } from "./components/onNodesChange";
import { calculateRef, DomRectToObj } from "./components/CustomHookToAddSVG";

const Implementation = () => {
  const initialNodes = [
    {
      id: "0",
      type: "CustomCombinedNodeSVG",
      data: { label: "allSVG", dimensions: { width: 661, height: 130 } },
      position: { x: 100, y: 250 },
    },
  ];
  const initialEdges = [];
  const [addedNodeId, setAddedNodeId] = useState();
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [currentRef, setCurrentRef] = useState(null);
  const [filter, setFilter] = useState();
  const [currentNodeRef, setCurrentNodeRef] = useState(null);
  // const [shiftedNodes, setShiftedNodes] = useState([]);

  const nodeTypes = useMemo(
    () => ({
      CustomCombinedNodeSVG: (props) => (
        <CustomCombinedNodeSVG {...props} setCurrentRef={setCurrentRef} />
      ),
      AddButtonNodeSVG: (props) => (
        <AddButtonNodeSVG
          {...props}
          setNodes={setNodes}
          setFilter={setFilter}
          setAddedNodeId={setAddedNodeId}
          setCurrentNodeRef={setCurrentNodeRef}
          // shifted_array={shiftedNodes}
        />
      ),
      CustomGaugeNode,
      CustomPipe,
      CustomDatabase,
      CustomcurvedPipe,
      CustomDataExp,
    }),
    []
  );

  useEffect(() => {
    if (currentRef && currentRef.width && nodes.length === 1) {
      // to add three plus icon nodes initially on the combinedSVG node
      const ref = DomRectToObj(currentRef);
      const add = addIconsInsertion(ref, nodes.length, filter);
      setNodes((pre) => [...pre, ...add]);
    }
  }, [currentRef]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={initialEdges}
      nodeTypes={nodeTypes}
      // fitView={(e) => {
      //   console.log("fitview", e);
      // }}
      onNodesChange={(changes) => {
        console.log("changesnodes", nodes);
        if (nodes.length > 1 && currentNodeRef) {
          const ref = calculateRef(currentNodeRef);
          // console.log("ref", ref);
          onNodesChange(nodes, changes, filter, setNodes, addedNodeId, ref);
          setAddedNodeId();
        }
      }}
    >
      <Controls />
      <MiniMap />
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
};

export default Implementation;
