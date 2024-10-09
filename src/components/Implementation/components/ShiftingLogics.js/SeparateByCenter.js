export const SeparateByCenter = (nodeRef, nodes) => {
  const nodes_center = {};
  nodes.forEach((item) => {
    const center_y = calculateCenter(item);
    const reached = calculateReach(item);
    if (!nodes_center.hasOwnProperty(center_y)) {
      nodes_center[center_y] = {
        node_array: [item],
        top_reached: reached.top,
        bottom_reached: reached.bottom,
      };
    } else {
      nodes_center[center_y].node_array.push(item);
      if (reached.top < nodes_center[center_y].top_reached) {
        nodes_center[center_y].top_reached = reached.top;
      }
      if (reached.bottom > nodes_center[center_y].bottom_reached) {
        nodes_center[center_y].bottom_reached = reached.bottom;
      }
    }
  });
  console.log("nodes_center", nodes_center);
  return nodes_center;
};

const calculateCenter = (node) => {
  if (node.type === "AddButtonNodeSVG") {
    return node.data.currentRef.centerY;
  } else {
    return node.position.y + node.data.dimensions.height / 2;
  }
};

const calculateReach = (node) => {
  return {
    bottom: node.position.y + node.data.dimensions.height,
    top: node.position.y,
  };
};

// const move_nodes_above = (arr) => {};

// const move_nodes_below = (arr) => {};

export default SeparateByCenter;
