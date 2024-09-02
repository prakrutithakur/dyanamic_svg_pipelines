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
import { calculateRef } from "./components/CustomHookToAddSVG";
// import { shiftNodes } from "./components/shiftNodes";

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
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [currentRef, setCurrentRef] = useState(null);
  const [filter, setFilter] = useState();
  const [bottomReachedDetails, setBottomReachedDetails] = useState();

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
      const add = addIconsInsertion(currentRef, nodes.length, filter);
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
        const node_index = parseInt(changes[0].id);
        if (
          nodes.length >= 4 && //change to 5 if added node on left as well
          changes.length === 1 &&
          node_index !== 0 &&
          nodes[node_index]?.type !== "AddButtonNodeSVG" &&
          changes?.[0]?.type === "dimensions" &&
          changes?.[0]?.dimensions?.height
        ) {
          const nodeRef = calculateRef(nodes, changes, node_index, 0);
          const add = addIconsInsertion(nodeRef, nodes.length, filter);
          setNodes((pre) => [...pre, ...add]);
        } else if (nodes.length === changes.length && nodes.length >= 4) {
          const node_index_last = parseInt(changes[nodes.length - 1].id);
          if (
            nodes[node_index_last]?.type !== "AddButtonNodeSVG" &&
            changes[changes.length - 1]?.type === "dimensions" &&
            changes[changes.length - 1]?.dimensions?.height &&
            node_index_last < nodes.length
          ) {
            const nodeRef = calculateRef(
              nodes,
              changes,
              node_index_last,
              changes.length - 1
            );
            const add = addIconsInsertion(nodeRef, nodes.length, filter);
            setNodes((pre) => [...pre, ...add]);
          }
        }
        // shiftNodes(nodes);
      }}
    >
      <Controls />
      <MiniMap />
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
};

export default Implementation;
