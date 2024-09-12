export const shiftNodes = (bottomReachedDetails, currentRef, setNodes) => {
  setNodes((pre) => {
    const filtered = [...pre];
    let addMargin = 0;
    let topmost = null;
    const newArray = filtered.filter((ele) => {
      // console.log("ele", ele);
      const elementCenter = {
        x: ele.position.x + ele.data.dimensions.width / 2,
        y: ele.position.y + ele.data.dimensions.height / 2,
      };
      if (
        (ele.type === "AddButtonNodeSVG" &&
          (ele.data.currentRef.top < bottomReachedDetails.bottom ||
            ele.position.y < bottomReachedDetails.bottom)) ||
        ele.position.y < bottomReachedDetails.bottom
      ) {
        const topY =
          ele.type === "AddButtonNodeSVG"
            ? ele.data.currentRef.top
            : ele.position.y;

        if (!topmost || topY < topmost) {
          topmost = topY;
        }
        console.log("topmost", topmost);
        return true;
      }
      return false;
    });
    if (topmost) addMargin = bottomReachedDetails.bottom - topmost;
    const final = [];
    if (newArray.length > 0) {
      filtered.forEach((item) => {
        // console.log("details", item, bottomReachedDetails);
        if (
          (item.type === "AddButtonNodeSVG" &&
            item.data.currentRef.y + item.data.currentRef.height / 2 >
              bottomReachedDetails.bottom) ||
          item.position.y + item.data.dimensions.height / 2 >
            bottomReachedDetails.bottom
        ) {
          if (item.type === "AddButtonNodeSVG") {
            final.push({
              ...item,
              data: {
                ...item.data,
                currentRef: {
                  x: item.data.currentRef.x,
                  y: item.data.currentRef.y + addMargin,
                  bottom: item.data.currentRef.bottom + addMargin,
                  top: item.data.currentRef.top + addMargin,
                  height: item.data.currentRef.height,
                  width: item.data.currentRef.width,
                  left: item.data.currentRef.left,
                  right: item.data.currentRef.right,
                },
              },
              position: {
                x: item.position.x,
                y: item.position.y + addMargin,
              },
            });
          } else {
            final.push({
              ...item,
              position: {
                x: item.position.x,
                y: item.position.y + addMargin,
              },
            });
          }
        } else {
          final.push(item);
        }
      });
      console.log("final", final);
      return final;
    }
    return pre;
  });
};

// if (
//   ele.type === "AddButtonNodeSVG" &&
//   elementCenter.y > bottomReachedDetails.bottom &&
//   ele.data.type === "right" &&
//   elementCenter.y - currentRef.height / 2 < bottomReachedDetails.bottom
// ) {
//   calculateShift(ele);
// } else if (ele.position.y < bottomReachedDetails.bottom) {
//   console.log("eleinoneconditon", ele);
//   if (ele.type === "AddButtonNodeSVG") {
//     if (
//       ele.data.type === "top" &&
//       bottomReachedDetails.center.y !==
//         elementCenter.y + 24 + ele.data.currentRef.height / 2
//     ) {
//       calculateShift(ele);
//     }
//     if (
//       ele.data.type === "bottom" &&
//       bottomReachedDetails.center.y !==
//         elementCenter.y - 24 - ele.data.currentRef.height / 2
//     ) {
//       calculateShift(ele);
//     }
//     if (
//       ele.data.type === "right" &&
//       bottomReachedDetails.center.y !== elementCenter.y
//     ) {
//       calculateShift(ele);
//     }
//   }
//   // else if (bottomReachedDetails.center.y !== elementCenter.y) {
//   //   ele.position.y = ele.position.y + currentRef.height;
//   // }
// } else if (bottomReachedDetails.center.y !== elementCenter.y) {
//   calculateShift(ele);
// }
