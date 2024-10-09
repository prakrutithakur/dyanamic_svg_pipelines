import { addIconsInsertion } from "./addIconsinsertion";
import SeparateByCenter from "./ShiftingLogics.js/SeparateByCenter";
import { ShiftByCenter } from "./ShiftingLogics.js/ShiftByCenter";
// import ShiftNodes from "./ShiftingLogics.js/ShiftNodeLogicTwo";

export const onNodesChange = (
  nodes,
  changes,
  filter,
  setNodes,
  addedNodeId,
  nodeRef
) => {
  const node_index = parseInt(changes[0].id);
  console.log("nodeslength", nodes, changes)

  if (
    nodes.length >= 4 && //change to 5 if added node on left as well
    changes.length === 1 &&
    node_index !== 0 &&
    nodes[node_index]?.type !== "AddButtonNodeSVG" &&
    changes?.[0]?.type === "dimensions" &&
    changes?.[0]?.dimensions?.height
  ) {
    const add = addIconsInsertion(nodeRef, nodes.length, filter);
    // const updated_array = [...nodes, ...add];
    // const shifted_array = ShiftNodes(nodeRef, updated_array);
    // console.log("shifted_array", shifted_array);
    const centerObj = SeparateByCenter(nodeRef, [...nodes, ...add]);
    const shifted_by_center_array = ShiftByCenter(centerObj);
    console.log("centerObjcondition1", centerObj, shifted_by_center_array);
    if (shifted_by_center_array) {
      setNodes(shifted_by_center_array);
      return shifted_by_center_array;
    }
    // setNodes(updated_array);
    // return updated_array;
  }
  // else if (nodes.length === changes.length && nodes.length >= 4) {
  //   console.log("centerObjcondition2if");
  //   console.log("valuesCondition2", addedNodeId);
  //   console.log("valuesCondition2", nodes[addedNodeId]?.type);
  //   console.log("valuesCondition2", changes[changes.length - 1]?.type);
  //   console.log("valuesCondition2", changes[changes.length - 1]?.dimensions?.height);
  //   console.log("valuesCondition2", addedNodeId < nodes.length);
  else if (
    addedNodeId &&
    nodes[addedNodeId]?.type !== "AddButtonNodeSVG" &&
    changes[changes.length - 1]?.type === "dimensions" &&
    changes[changes.length - 1]?.dimensions?.height &&
    addedNodeId < nodes.length
  ) {
    const add = addIconsInsertion(nodeRef, nodes.length, filter);
    // const updated_array = [...nodes, ...add];
    // const shifted_array = ShiftNodes(nodeRef, updated_array);
    // console.log("shifted_array", shifted_array);
    const centerObj = SeparateByCenter(nodeRef, [...nodes, ...add]);
    const shifted_by_center_array = ShiftByCenter(centerObj);
    console.log("centerObjcondition2", centerObj, shifted_by_center_array);
    if (shifted_by_center_array) {
      setNodes(shifted_by_center_array);
      return shifted_by_center_array;
    }
    // setNodes(updated_array);
    // return updated_array;
  }
  // }
  return nodes;
};
