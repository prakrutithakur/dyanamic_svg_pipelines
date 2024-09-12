import { addIconsInsertion } from "./addIconsinsertion";
// import { calculateRef } from "./CustomHookToAddSVG";

export const onNodesChange = (
  nodes,
  changes,
  filter,
  setNodes,
  addedNodeId,
  nodeRef
) => {
  const node_index = parseInt(changes[0].id);
  if (
    nodes.length >= 4 && //change to 5 if added node on left as well
    changes.length === 1 &&
    node_index !== 0 &&
    nodes[node_index]?.type !== "AddButtonNodeSVG" &&
    changes?.[0]?.type === "dimensions" &&
    changes?.[0]?.dimensions?.height
  ) {
    const add = addIconsInsertion(nodeRef, nodes.length, filter);
    setNodes((pre) => [...pre, ...add]);
  } else if (nodes.length === changes.length && nodes.length >= 4) {
    if (
      addedNodeId &&
      nodes[addedNodeId]?.type !== "AddButtonNodeSVG" &&
      changes[changes.length - 1]?.type === "dimensions" &&
      changes[changes.length - 1]?.dimensions?.height &&
      addedNodeId < nodes.length
    ) {
      const add = addIconsInsertion(nodeRef, nodes.length, filter);
      setNodes((pre) => [...pre, ...add]);
    }
  }
};

// export const onNodesChange = (
//   nodes,
//   changes,
//   filter,
//   setNodes,
//   addedNodeId,
// ) => {
//   const node_index = parseInt(changes[0].id);
//   if (
//     nodes.length >= 4 && //change to 5 if added node on left as well
//     changes.length === 1 &&
//     node_index !== 0 &&
//     nodes[node_index]?.type !== "AddButtonNodeSVG" &&
//     changes?.[0]?.type === "dimensions" &&
//     changes?.[0]?.dimensions?.height
//   ) {
//     const nodeRef = calculateRef(nodes, changes, node_index, 0);
//     const add = addIconsInsertion(nodeRef, nodes.length, filter);
//     setNodes((pre) => [...pre, ...add]);
//   } else if (nodes.length === changes.length && nodes.length >= 4) {
//     if (
//       addedNodeId &&
//       nodes[addedNodeId]?.type !== "AddButtonNodeSVG" &&
//       changes[changes.length - 1]?.type === "dimensions" &&
//       changes[changes.length - 1]?.dimensions?.height &&
//       addedNodeId < nodes.length
//     ) {
//       const nodeRef = calculateRef(nodes, changes, addedNodeId, addedNodeId);
//       const add = addIconsInsertion(nodeRef, nodes.length, filter);
//       setNodes((pre) => [...pre, ...add]);
//     }
//   }
// };
