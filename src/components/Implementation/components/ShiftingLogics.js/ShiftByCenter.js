export const ShiftByCenter = (obj) => {
  const tempObj = { ...obj };
  const center_array = Object.keys(tempObj).sort();

  for (let i = 1; i < center_array.length; i++) {
    if (
      tempObj[center_array[i]].top_reached <
      tempObj[center_array[i - 1]].bottom_reached
    ) {
      const shiftby =
        tempObj[center_array[i - 1]].bottom_reached -
        tempObj[center_array[i]].top_reached +
        20;
      for (let j = i; j < center_array.length; j++) {
        tempObj[center_array[j]].node_array = shiftNodesBelow(
          tempObj[center_array[j]],
          shiftby
        );
        tempObj[center_array[j]].top_reached =
          tempObj[center_array[j]].top_reached + shiftby;
        tempObj[center_array[j]].bottom_reached =
          tempObj[center_array[j]].bottom_reached + shiftby;
      }
    }
  }
  const shifted_array = [];
  center_array.forEach((item) => {
    tempObj[item].node_array.forEach((newItem) => shifted_array.push(newItem));
  });
  console.log("shifted_array", shifted_array, tempObj);
  return shifted_array;
};

// export const ShiftByCenter = (obj) => {
//   const center_array = Object.keys(obj).sort();
//   const updated_array = [obj[center_array[0]]];

//   for (let i = 1; i < center_array.length; i++) {
//     if (
//       obj[center_array[i]].top_reached < obj[center_array[i - 1]].bottom_reached
//     ) {
//       const shiftby =
//         obj[center_array[i - 1]].bottom_reached -
//         obj[center_array[i]].top_reached +
//         20;
//       updated_array.push(obj[center_array[i]]);
//       for (let j = i; j < center_array.length; j++) {
//         updated_array.push(shiftNodesBelow(obj[center_array[j]], shiftby));
//       }
//       return updated_array;
//     } else {
//     }
//   }
// };

export const shiftNodesBelow = (nodes, shiftby) => {
  return nodes.node_array.map((element) => {
    if (element.type === "AddButtonNodeSVG") {
      return {
        ...element,
        position: { ...element.position, y: element.position.y + shiftby },
        data: {
          ...element.data,
          currentRef: {
            ...element.data.currentRef,
            bottom: element.data.currentRef.bottom + shiftby,
            bottom_reached: element.data.currentRef.bottom_reached + shiftby,
            centerY: element.data.currentRef.centerY + shiftby,
            top: element.data.currentRef.top + shiftby,
            top_reached: element.data.currentRef.top_reached + shiftby,
            y: element.data.currentRef.y + shiftby,
          },
        },
      };
    } else {
      console.log("elsecondition", element, {
        ...element,
        position: { ...element.position, y: element.position.y + shiftby },
      });
      return {
        ...element,
        position: { ...element.position, y: element.position.y + shiftby },
      };
    }
  });
};
