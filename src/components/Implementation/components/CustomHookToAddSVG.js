export const AddCustomSVGFunction = (
  itemsToAdd,
  data,
  setNodes,
  setCurrentNodeRef
) => {
  if (itemsToAdd.includes("gauge")) {
    setNodes((pre) => {
      console.log("pre", pre);
      const temp = [...pre];
      temp[data.id] = {
        id: data.id,
        type: "CustomGaugeNode",
        data: {
          label: "CustomGaugeNode",
          dimensions: { height: 88, width: 84 },
          location: data.location,
        },
        position: nodePosition(data.location, data.currentRef, 88, 84),
      };
      setCurrentNodeRef(temp[data.id]);
      return temp;
    });
  }
  if (itemsToAdd.includes("pipe")) {
    setNodes((pre) => {
      const temp = [...pre];
      temp[data.id] = {
        id: data.id,
        type: "CustomPipe",
        data: {
          label: "pipe",
          dimensions: { height: 58, width: 267 },
          location: data.location,
        },
        position: nodePosition(data.location, data.currentRef, 58, 267),
      };
      console.log("settingRef", temp[data.id]);
      setCurrentNodeRef(temp[data.id]);
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
          location: data.location,
        },
        position: nodePosition(data.location, data.currentRef, 107, 128),
      };
      setCurrentNodeRef(temp[data.id]);
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
          location: data.location,
        },
        position: nodePosition(data.location, data.currentRef, 175, 206),
      };
      setCurrentNodeRef(temp[data.id]);
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
          location: data.location,
        },
        position: nodePosition(data.location, data.currentRef, 157, 268),
      };
      setCurrentNodeRef(temp[data.id]);
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

export const calculateRef = (ref) => {
  const calculatedRef = {
    top: ref?.position?.y,
    bottom: ref?.position?.y + ref?.data?.dimensions?.height,
    left: ref?.position?.x,
    right: ref?.position?.x + ref?.data?.dimensions?.width,
    x: ref?.position?.x,
    y: ref?.position?.y,
    height: ref?.data?.dimensions?.height,
    width: ref?.data?.dimensions?.width,
    top_reached: ref?.position?.y - 48,
    // top_reached: ref?.position?.y,
    bottom_reached: ref?.position?.y + ref?.data?.dimensions?.height + 48,
    // bottom_reached: ref?.position?.y + ref?.data?.dimensions?.height,
    right_reached: ref?.position?.x + ref?.data?.dimensions?.width + 48,
    left_reached: ref?.position?.x - 48,
    centerX: ref?.position?.x + ref?.data?.dimensions?.width / 2,
    centerY: ref?.position?.y + ref?.data?.dimensions?.height / 2,
  };
  return calculatedRef;
};

export const DomRectToObj = (domRect) => {
  return {
    top: domRect.top,
    bottom: domRect.bottom,
    left: domRect.left,
    right: domRect.right,
    x: domRect.x,
    y: domRect.y,
    height: domRect.height,
    width: domRect.width,
    top_reached: domRect.top - 48,
    bottom_reached: domRect.top + domRect.height + 48,
    right_reached: domRect.left + domRect.width + 48,
    left_reached: domRect.left - 48,
    centerX: domRect.left + domRect.width / 2,
    centerY: domRect.top + domRect.height / 2,
  };
};
