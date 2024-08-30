export const addIconsInsertion = (currentRef, index) => {
  const arr = [
    {
      id: `${index}`,
      type: "AddButtonNodeSVG",
      data: {
        label: "added_on_top",
        currentRef,
        location: "top",
        id: `${index}`,
      },
      position: {
        x: (currentRef.left + currentRef.right - 48) / 2,
        y: currentRef.y - 48,
      },
    },
    {
      id: `${index + 1}`,
      type: "AddButtonNodeSVG",
      data: {
        label: "added_on_right",
        currentRef,
        location: "right",
        id: `${index + 1}`,
      },
      position: {
        x: currentRef.x + currentRef.width,
        y: (currentRef.top + currentRef.bottom - 48) / 2,
      },
    },
    {
      id: `${index + 2}`,
      type: "AddButtonNodeSVG",
      data: {
        label: "added_on_bottom",
        currentRef,
        location: "bottom",
        id: `${index + 2}`,
      },
      position: {
        x: (currentRef.left + currentRef.right - 48) / 2,
        y: currentRef.bottom,
      },
    },
    // {
    //   id: `${index + 3}`,
    //   type: "AddButtonNodeSVG",
    //   data: {
    //     label: "added_on_left",
    //     currentRef,
    //     location: "left",
    //     id: `${index + 3}`,
    //   },
    //   position: {
    //     x: currentRef.x - 48,
    //     y: (currentRef.top + currentRef.bottom - 48) / 2,
    //   },
    // },
  ];

  return arr;
};
