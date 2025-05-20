import { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

let id = 0;
const getId = () => `node_${id++}`;

const initialNodes = [
  {
    id: getId(),
    type: 'default',
    data: { label: 'Ideia Central' },
    position: { x: 250, y: 150 },
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDoubleClick = useCallback((event) => {
    const bounds = event.target.getBoundingClientRect();
    const position = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };

    const newNode = {
      id: getId(),
      type: 'default',
      position,
      data: { label: `Ideia ${id}` },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDoubleClick={onDoubleClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={12} />
      </ReactFlow>
    </div>
  );
}

export default App;
