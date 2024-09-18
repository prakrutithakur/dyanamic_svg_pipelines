import { addIconsInsertion } from "./addIconsinsertion";
import ShiftNodes from "./ShiftNodeLogic";

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
    setNodes((pre) => {
      // const shifted_array = ShiftNodes(nodeRef, [...pre, ...add]);
      // console.log("shifted_array", shifted_array);
      // return shifted_array;
      return [...pre, ...add];
    });
    return [...nodes, ...add];
  } else if (nodes.length === changes.length && nodes.length >= 4) {
    if (
      addedNodeId &&
      nodes[addedNodeId]?.type !== "AddButtonNodeSVG" &&
      changes[changes.length - 1]?.type === "dimensions" &&
      changes[changes.length - 1]?.dimensions?.height &&
      addedNodeId < nodes.length
    ) {
      const add = addIconsInsertion(nodeRef, nodes.length, filter);
      setNodes((pre) => {
        // const shifted_array = ShiftNodes(nodeRef, [...pre, ...add]);
        // console.log("shifted_array", shifted_array);
        // return shifted_array;
        return [...pre, ...add];
      });
      return [...nodes, ...add];
    }
  }
  return nodes;
};
