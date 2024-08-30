import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
} from "reactflow";
import dagre from "dagre";

import { initialNodes, initialEdges } from "./nodes-edges.js";

import "reactflow/dist/style.css";

import CustomNode from "./CustomNode";
import CustomVectorLinesNode from "./CustomVectorLinesNode";
import CustomCloudNode from "./CustomCloudNode.jsx";
import CustomGeneralNodeLeftTarget from "./CustomGeneralNode";
import CustomCombinedNodeSVG from "./CustomCombinedNodeSVG.jsx";
import NodesOnTop from "./CustomNodes/NodesOnTop.jsx";
import NodesOnRight from "./CustomNodes/NodesOnRight.jsx";
import NodesOnBottom from "./CustomNodes/NodesOnBottom.jsx";
import DashboardNode from "./CustomNodes/DashboardNode.jsx";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 100;
const nodeHeight = 100;
const buffer = 20;

const initialNodesHere = [
  // {
  //   id: "chip",
  //   position: { x: 50, y: 100 },
  //   type: "customNode",
  //   data: { label: "1" },
  // },
  // {
  //   id: "vector",
  //   position: { x: 154, y: 127 },
  //   data: { label: "2" },
  //   type: "customVectorLinesNode",
  // },
  // {
  //   id: "cloud",
  //   position: { x: 292, y: 85 },
  //   data: { label: "3" },
  //   type: "customCloudNode",
  // },
];

const initialCombinedSVG = {
  id: "allSVG",
  data: { label: "allSVG" },
  type: "customCombinedNodeSVG",
};

const nodeTypes = {
  customNode: CustomNode,
  customVectorLinesNode: CustomVectorLinesNode,
  customCloudNode: CustomCloudNode,
  customGeneralNodeLeftTarget: CustomGeneralNodeLeftTarget,
  customCombinedNodeSVG: CustomCombinedNodeSVG,
  nodesOnTop: NodesOnTop,
  nodesOnRight: NodesOnRight,
  nodesOnBottom: NodesOnBottom,
  dashboardNode: DashboardNode,
};

const getLayoutedElements = (nodes, edges, direction = "LR") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    if (edge.sourceHandle) {
      dagreGraph.setEdge(edge.source, edge.target);
    } else {
      dagreGraph.setEdge(edge.source, edge.target);
    }
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    console.log("node_id", node.id, node);
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    const slicedArray = node.id.slice(-4);
    const sourceId = slicedArray.slice(0, 2);
    const targetType = slicedArray.slice(-1);
    const sourcePosition = nodes
      .filter((item) => item.id === sourceId)
      .map((item) => item.position)[0];
    console.log("sourcePosition", sourcePosition);
    console.log("source", sourceId, "target", targetType);
    if (node.id === "allSVG") {
      //combined SVG position
      node.position = {
        x: nodeWithPosition.x - 409,
        y: nodeWithPosition.y - 130 / 2,
      };
    }
    // else if (node.id === "dashboard") {
    //   node.position = {
    //     x: 200,
    //     y: 0,
    //   };
    // }
    else {
      const buffer = node.id === "0" ? 0 : 200;
      if (targetType === "a" || targetType === "c") {
        node.position = {
          x: nodeWithPosition.x - nodeWidth * 2 + buffer,
          y: nodeWithPosition.y - nodeHeight / 2,
        };
      } else {
        node.position = {
          x: nodeWithPosition.x - nodeWidth / 2 + buffer,
          y: nodeWithPosition.y - nodeHeight / 2,
        };
      }
      // node.position = {
      //   x: nodeWithPosition.x - nodeWidth / 2,
      //   y: nodeWithPosition.y - nodeHeight / 2,
      // };
    }

    // if (sourcePosition) {
    //   console.log("here is this", sourcePosition);
    //   if (targetType === "a") {
    //     node.position = {
    //       x: sourcePosition.x,
    //       y: sourcePosition.y - (nodeHeight / 2 + buffer),
    //     };
    //   } else if (targetType === "b") {
    //     node.position = {
    //       x: sourcePosition.x + nodeWidth / 2 + buffer,
    //       y: sourcePosition.y,
    //     };
    //   } else
    //     node.position = {
    //       x: sourcePosition.x,
    //       y: sourcePosition.y + nodeHeight / 2 + buffer,
    //     };
    // } else {
    //   console.log("nodedata", node);
    //   const x = node.position?.x || 0;
    //   const y = node.position?.y || 0;
    //   node.position = {
    //     x: x + nodeWidth / 2 + buffer,
    //     y: y,
    //   };
    // }
    // console.log("allNodes", node);
    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  [initialCombinedSVG, ...initialNodes],
  initialEdges
);

const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <ReactFlow
      nodes={[...initialNodesHere, ...nodes]}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
      proOptions={{ hideAttribution: true }}
    >
      <Panel position="top-right">
        <button onClick={() => onLayout("TB")}>vertical layout</button>
        <button onClick={() => onLayout("LR")}>horizontal layout</button>
      </Panel>
    </ReactFlow>
  );
};

export default LayoutFlow;
