export const ShiftNodes = (nodeRef, nodes) => {
  let updated_array = nodes;
  let nodes_above_addedNode = [];
  let nodes_below_addedNode = [];
  let nodes_at_addedNode = [];
  for (let i = 0; i < updated_array.length; i++) {
    const node = updated_array[i];
    if (
      node.position.y <= nodeRef.bottom_reached ||
      node.position.y + node.data.dimensions.height >= nodeRef.top_reached
    ) {
      updated_array.forEach((item) => {
        if (
          (item.type === "AddButtonNodeSVG" &&
            item.data.currentRef.centerY === nodeRef.centerY) ||
          item.position.y + item.data.dimensions.height / 2 === nodeRef.centerY
        ) {
          nodes_at_addedNode.push(item);
        } else if (
          (item.type === "AddButtonNodeSVG" &&
            item.data.currentRef.centerY <= nodeRef.bottom_reached) ||
          (item.type !== "AddButtonNodeSVG" &&
            item.position.y + item.data.dimensions.height / 2 <=
              nodeRef.bottom_reached)
        ) {
          nodes_above_addedNode.push(item);
          const nodeBottom =
            item.type === "AddButtonNodeSVG"
              ? item.data.currentRef.y + item.data.currentRef.height
              : item.position.y + item.data.dimensions.height;
          const difference = nodeBottom - nodeRef.top_reached;
          const move_up_by = parseInt(localStorage.getItem("move_up_by")) || 0;
          if (difference > move_up_by) {
            const stringDiff = JSON.stringify(difference);
            localStorage.setItem("move_up_by", stringDiff);
          }
        } else {
          // condition: item.position.y + item.data.dimensions.height <= nodeRef.bottom_reached || item.position.y <= nodeRef.bottom_reached
          nodes_below_addedNode.push(item);
          const nodeTop =
            item.type === "AddButtonNodeSVG"
              ? item.data.currentRef.y
              : item.position.y;
          const difference = nodeRef.bottom_reached - nodeTop;
          const move_down_by =
            parseInt(localStorage.getItem("move_down_by")) || 0;
          if (difference > move_down_by) {
            const stringDiff = JSON.stringify(difference);
            localStorage.setItem("move_down_by", stringDiff);
          }
        }
      });
      break;
    } else {
      continue;
    }
  }

  const updated_above_array = localStorage.getItem("move_up_by")
    ? move_nodes_above(nodes_above_addedNode)
    : [];
  const updated_below_array = localStorage.getItem("move_down_by")
    ? move_nodes_below(nodes_below_addedNode)
    : [];
  console.log("filter", "above", nodes_above_addedNode);
  console.log("filter", "below", nodes_below_addedNode);
  console.log("filter", "at", nodes_at_addedNode);

  return [
    ...updated_above_array,
    ...updated_below_array,
    ...nodes_at_addedNode,
  ];
};

const move_nodes_above = (arr) => {
  const value = parseInt(localStorage.getItem("move_up_by"));
  arr.forEach((item, index) => {
    if (item.type === "AddButtonNodeSVG") {
      const temp = {
        ...item,
        position: { ...item.position, y: item.position.y - value },
        data: {
          ...item.data,
          currentRef: {
            ...item.data.currentRef,
            bottom: item.data.currentRef.bottom - value,
            bottom_reached: item.data.currentRef.bottom_reached - value,
            centerY: item.data.currentRef.bottom - value,
            top: item.data.currentRef.top - value,
            top_reached: item.data.currentRef.top_reached - value,
            y: item.data.currentRef.y - value,
          },
        },
      };
      arr[index] = temp;
    } else {
      const temp = {
        ...item,
        position: { ...item.position, y: item.position.y - value },
      };
      arr[index] = temp;
    }
  });
  return arr;
};

const move_nodes_below = (arr) => {
  const value = parseInt(localStorage.getItem("move_down_by"));
  arr.forEach((item, index) => {
    if (item.type === "AddButtonNodeSVG") {
      const temp = {
        ...item,
        position: { ...item.position, y: item.position.y + value },
        data: {
          ...item.data,
          currentRef: {
            ...item.data.currentRef,
            bottom: item.data.currentRef.bottom + value,
            bottom_reached: item.data.currentRef.bottom_reached + value,
            centerY: item.data.currentRef.bottom + value,
            top: item.data.currentRef.top + value,
            top_reached: item.data.currentRef.top_reached + value,
            y: item.data.currentRef.y + value,
          },
        },
      };
      arr[index] = temp;
    } else {
      const temp = {
        ...item,
        position: { ...item.position, y: item.position.y + value },
      };
      arr[index] = temp;
    }
  });
  return arr;
};

export default ShiftNodes;
