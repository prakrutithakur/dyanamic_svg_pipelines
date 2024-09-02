export const addIconsInsertion = (currentRef, index, filter) => {
  const arr = [
    {
      type: "AddButtonNodeSVG",
      data: {
        label: "added_on_top",
        currentRef,
        location: "top",
      },
      position: {
        x: (currentRef.left + currentRef.right - 48) / 2,
        y: currentRef.y - 48,
      },
    },
    {
      type: "AddButtonNodeSVG",
      data: {
        label: "added_on_right",
        currentRef,
        location: "right",
      },
      position: {
        x: currentRef.x + currentRef.width,
        y: (currentRef.top + currentRef.bottom - 48) / 2,
      },
    },
    {
      type: "AddButtonNodeSVG",
      data: {
        label: "added_on_bottom",
        currentRef,
        location: "bottom",
      },
      position: {
        x: (currentRef.left + currentRef.right - 48) / 2,
        y: currentRef.bottom,
      },
    },
    // {
    //   type: "AddButtonNodeSVG",
    //   data: {
    //     label: "added_on_left",
    //     currentRef,
    //     location: "left",
    //   },
    //   position: {
    //     x: currentRef.x - 48,
    //     y: (currentRef.top + currentRef.bottom - 48) / 2,
    //   },
    // },
  ];
  return arr
    .filter((item) => item.data.location !== filter)
    .map((newItem, i) => ({
      ...newItem,
      id: `${index + i}`,
      data: { ...newItem.data, id: `${index + i}` },
    }));
};

export const filterFunction = (location) => {
  switch (location) {
    case "top":
      return "bottom";
    case "left":
      return "right";
    case "bottom":
      return "top";
    default:
      return "left";
  }
};
