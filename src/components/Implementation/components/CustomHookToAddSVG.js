export const AddCustomSVGFunction = (itemsToAdd, data, setNodes) => {
  if (itemsToAdd.includes("gauge")) {
    setNodes((pre) => {
      const temp = [...pre];
      temp[data.id] = {
        id: data.id,
        type: "CustomGaugeNode",
        data: {
          label: "CustomGaugeNode",
          dimensions: { height: 88, width: 84 },
        },
        position: nodePosition(data.location, data.currentRef, 88, 84),
      };
      return temp;
    });
  }
  if (itemsToAdd.includes("pipe")) {
    setNodes((pre) => {
      const temp = [...pre];
      temp[data.id] = {
        id: data.id,
        type: "CustomPipe",
        data: { label: "pipe", dimensions: { height: 58, width: 267 } },
        position: nodePosition(data.location, data.currentRef, 58, 267),
      };
      return temp;
    });
  }
  if (itemsToAdd.includes("database")) {
    setNodes((pre) => {
      const temp = [...pre];
      temp[data.id] = {
        id: data.id,
        type: "CustomDatabase",
        data: {
          label: "CustomDatabase",
          dimensions: { height: 107, width: 128 },
        },
        position: nodePosition(data.location, data.currentRef, 107, 128),
      };
      return temp;
    });
  }
  if (itemsToAdd.includes("protocol")) {
    setNodes((pre) => {
      const temp = [...pre];
      temp[data.id] = {
        id: data.id,
        type: "CustomcurvedPipe",
        data: {
          label: "CustomcurvedPipe",
          dimensions: { width: 206, height: 175 },
        },
        position: nodePosition(data.location, data.currentRef, 175, 206),
      };
      return temp;
    });
  }
  if (itemsToAdd.includes("data")) {
    setNodes((pre) => {
      const temp = [...pre];
      temp[data.id] = {
        id: data.id,
        type: "CustomDataExp",
        data: {
          label: "CustomDataExp",
          dimensions: { width: 268, height: 157 },
        },
        position: nodePosition(data.location, data.currentRef, 157, 268),
      };
      return temp;
    });
  }
  return { length: itemsToAdd.length };
};

export const nodePosition = (location, currentRef, height, width) => {
  if (location === "top") {
    return {
      x: (currentRef.left + currentRef.right) / 2,
      y: currentRef.y - height,
    };
  }
  if (location === "right") {
    return {
      x: currentRef.x + currentRef.width,
      y: (currentRef.top + currentRef.bottom - height) / 2,
    };
  }
  if (location === "bottom") {
    return {
      x: (currentRef.left + currentRef.right) / 2,
      y: currentRef.bottom,
    };
  }
  if (location === "left") {
    return {
      x: currentRef.x - width,
      y: (currentRef.top + currentRef.bottom - height) / 2,
    };
  }
  return { x: 0, y: 0 };
};

export const calculateRef = (nodes, changes, node_index, change_index) => {
  const calculatedRef = {
    top: nodes[node_index]?.position?.y,
    bottom:
      nodes[node_index]?.position?.y +
      changes[change_index]?.dimensions?.height,
    left: nodes[node_index]?.position?.x,
    right:
      nodes[node_index]?.position?.x + changes[change_index]?.dimensions?.width,
    x: nodes[node_index]?.position?.x,
    y: nodes[node_index]?.position?.y,
    height: changes[change_index]?.dimensions?.height,
    width: changes[change_index]?.dimensions?.width,
  };
  return calculatedRef;
};
