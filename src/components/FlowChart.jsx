// import React, { useState } from "react";
// import ReactFlow, {
//   MiniMap,
//   Controls,
//   Background,
//   addEdge,
//   useEdgesState,
//   useNodesState,
// } from "reactflow";
// import "reactflow/dist/style.css";

// const initialNodes = [
//   {
//     id: "1",
//     type: "input",
//     data: { label: "Lead Source" },
//     position: { x: 250, y: 0 },
//   },
// ];

// const initialEdges = [];

// const FlowChart = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

//   const addNode = (type) => {
//     const newNode = {
//       id: (nodes.length + 1).toString(),
//       type: "default",
//       data: { label: type },
//       position: { x: Math.random() * 400, y: Math.random() * 400 },
//     };
//     setNodes((nds) => [...nds, newNode]);
//   };

//   const saveFlow = () => {
//     const flowData = { nodes, edges };
//     console.log("Saved Flow:", flowData);
//     // Send this data to the backend for processing.
//   };

//   return (
//     <div style={{ height: "100vh" }}>
//       <div>
//         <button onClick={() => addNode("Cold Email")}>Add Cold Email</button>
//         <button onClick={() => addNode("Wait/Delay")}>Add Wait/Delay</button>
//         <button onClick={() => addNode("Lead Source")}>Add Lead Source</button>
//         <button onClick={saveFlow}>Save Flow</button>
//       </div>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>
//     </div>
//   );
// };

// export default FlowChart;


import React, { useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Lead Source" },
    position: { x: 250, y: 0 },
  },
];

const initialEdges = [];

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const addNode = (type) => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: "default",
      data: { label: type },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const saveFlow = async () => {
    const flowData = { nodes, edges };

    try {
      const response = await axios.post("http://localhost:5000/schedule-email", {
        time: new Date(Date.now() + 300), // Schedule for 1 hour later
        emailBody: "This is a test email from the flowchart app.",
        subject: "Flowchart Email",
        emailAddress: "shrinathasati111@gmail.com",
      });
      alert(`Email scheduled! Job ID: ${response.data.jobId}`);
    } catch (error) {
      console.error("Error saving flow:", error);
      alert("Failed to schedule email.");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div>
        <button onClick={() => addNode("Cold Email")}>Add Cold Email</button>
        <button onClick={() => addNode("Wait/Delay")}>Add Wait/Delay</button>
        <button onClick={() => addNode("Lead Source")}>Add Lead Source</button>
        <button onClick={saveFlow}>Save Flow</button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
