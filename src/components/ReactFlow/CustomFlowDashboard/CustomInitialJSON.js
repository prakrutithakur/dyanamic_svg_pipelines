export const initialNodes = [
  {
    id: "1",
    position: { x: 50, y: 300 },
    type: "customNode",
    data: { label: "1" },
  },
  {
    id: "2",
    position: { x: 154, y: 327 },
    data: { label: "2" },
    type: "customVectorLinesNode",
  },
  {
    id: "3",
    position: { x: 292, y: 285 },
    data: { label: "3" },
    type: "customCloudNode",
  },
  {
    id: "4",
    position: { x: 550, y: 325 },
    data: { label: "4" },
    type: "customGeneralNodeLeftTarget",
  },
  {
    id: "5",
    position: { x: 550, y: 200 },
    data: { label: "5" },
    type: "customGeneralNodeLeftTarget",
  },
  {
    id: "6",
    position: { x: 675, y: 325 },
    data: { label: "6" },
    type: "customGeneralNodeLeftTarget",
  },
  {
    id: "7",
    position: { x: 550, y: 450 },
    data: { label: "7" },
    type: "customGeneralNodeLeftTarget",
  },
];

// { id: "e1-2", source: "1", target: "2", animated: true }
export const initialEdges = [
  { id: "e3-4", source: "3", target: "4", animated: true },
];
