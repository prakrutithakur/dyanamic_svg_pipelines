import ELK from "elkjs/lib/elk.bundled.js";
import React, { useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";

// import { initialNodes, initialEdges } from "./nodes-edges.js";
import { initialNodes, initialEdges } from "./nodes-edges-layouts.jsx";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode.jsx";
import CustomVectorLinesNode from "./CustomVectorLinesNode.jsx";
import CustomCloudNode from "./CustomCloudNode.jsx";
import CustomGeneralNodeLeftTarget from "./CustomGeneralNode.jsx";

const nodeTypes = {
  customNode: CustomNode,
  customVectorLinesNode: CustomVectorLinesNode,
  customCloudNode: CustomCloudNode,
  customGeneralNodeLeftTarget: CustomGeneralNodeLeftTarget,
};

const elk = new ELK();

const svgNodes = [
  {
    id: "chip",
    position: { x: 50, y: 100 },
    type: "customNode",
    data: { label: "1" },
  },
  {
    id: "vector",
    position: { x: 154, y: 127 },
    data: { label: "2" },
    type: "customVectorLinesNode",
  },
  {
    id: "cloud",
    position: { x: 292, y: 85 },
    data: { label: "3" },
    type: "customCloudNode",
  },
];

const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const defaultOptions = {
    "elk.algorithm": "layered",
    "elk.layered.spacing.nodeNodeBetweenLayers": 100,
    "elk.spacing.nodeNode": 80,
  };

  const getLayoutedElements = useCallback((options) => {
    const layoutOptions = { ...defaultOptions, ...options };
    const graph = {
      id: "root",
      layoutOptions: layoutOptions,
      children: getNodes(),
      edges: getEdges(),
    };

    elk.layout(graph).then(({ children }) => {
      // By mutating the children in-place we saves ourselves from creating a
      // needless copy of the nodes array.
      children.forEach((node) => {
        node.position = { x: node.x, y: node.y };
      });

      setNodes(children);
      window.requestAnimationFrame(() => {
        fitView();
      });
    });
  }, []);

  return { getLayoutedElements };
};

const LayoutFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const { getLayoutedElements } = useLayoutedElements();

  return (
    <ReactFlow
      nodes={[...svgNodes, ...nodes]}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView={true}
      nodeTypes={nodeTypes}
    >
      <Panel position="top-right">
        <button
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "layered",
              "elk.direction": "DOWN",
            })
          }
        >
          vertical layout
        </button>
        <button
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "layered",
              "elk.direction": "RIGHT",
            })
          }
        >
          horizontal layout
        </button>
        <button
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "org.eclipse.elk.radial",
            })
          }
        >
          radial layout
        </button>
        <button
          onClick={() =>
            getLayoutedElements({
              "elk.algorithm": "org.eclipse.elk.force",
            })
          }
        >
          force layout
        </button>
      </Panel>
    </ReactFlow>
  );
};

export default function ComponentELK() {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
