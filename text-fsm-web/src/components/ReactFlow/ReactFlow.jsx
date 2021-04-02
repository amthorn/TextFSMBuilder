// import ReactF from 'react-flow-renderer';
import classNames from "classnames/dedupe";
import { Card, CardBody } from "reactstrap";
import React, { useState, useRef, useEffect } from 'react';
import ReactF, {
	isEdge,
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background
} from 'react-flow-renderer';

import { Sidebar } from './Sidebar';
import ColorSelectorNode from './StartNode';

import 'assets/css/react-flow.css';
import 'assets/css/dnd.css';

const nodeTypes = {
  selectorNode: ColorSelectorNode
};

let id = 0;
const getId = () => `dndnode_${id++}`;

export const ReactFlow = ({ ...props }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [bgColor, setBgColor] = useState(null);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: (event.clientX - reactFlowBounds.left - ((event.clientX - reactFlowBounds.left) % 20)) - 70,
      y: (event.clientY - reactFlowBounds.top - ((event.clientY - reactFlowBounds.top) % 20)) - 30,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setElements((es) => es.concat(newNode));
  };
 //  useEffect(() => {
	// 	// const onChange = (event) => {
	// 	//   setElements((els) =>
	// 	//     els.map((e) => {
	// 	//       if (isEdge(e) || e.id !== '2') {
	// 	//         return e;
	// 	//       }

	// 	//       const color = event.target.value;

	// 	//       setBgColor(color);

	// 	//       return {
	// 	//         ...e,
	// 	//         data: {
	// 	//           ...e.data,
	// 	//           color,
	// 	//         },
	// 	//       };
	// 	//     })
	// 	//   );
	// 	// };

	// 	setElements([
	// 	  {
	// 	    id: '1',
	// 	    type: 'input',
	// 	    data: { label: 'input node' },
	// 	    position: { x: 250, y: 25 },
	// 	  },
	// 	  // {
	// 	  //   id: '2',
	// 	  //   type: 'selectorNode',
	// 	  //   data: { onChange: () => {}, color: '#1A192B' },
	// 	  //   style: { border: '1px solid #777', padding: 10 },
	// 	  //   position: { x: 300, y: 50 },
	// 	  // },
	// 	]);
	// })

	return (
		<Card className={ classNames(props.className, "h-100") }>
			<CardBody>

			    <div className="dndflow">
			      <ReactFlowProvider>
			        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
			          <ReactF
			            elements={elements}
			            onConnect={onConnect}
			            onElementsRemove={onElementsRemove}
			            onLoad={onLoad}
			            onDrop={onDrop}
			            onDragOver={onDragOver}
			            // nodeTypes={nodeTypes}
			            snapToGrid={true}
			            snapGrid={[20, 20]}
			          >
			          	<Background variant="lines" gap={20}/>
			            <Controls />
			          </ReactF>
			        </div>
			        <Sidebar />
			      </ReactFlowProvider>
			    </div>
			</CardBody>
		</Card>
	)
}