// import ReactF from 'react-flow-renderer';
import classNames from "classnames/dedupe";
import { Card, CardBody } from "reactstrap";
import React, { useState, useRef } from 'react';
import ReactF, {
  	ReactFlowProvider,
  	addEdge,
  	removeElements,
  	Controls,
  	Background
} from 'react-flow-renderer';
import { v4 } from 'uuid';
import _ from "lodash";

import { Sidebar } from './Sidebar';
import { NodeTypes } from './Nodes/NodeTypes';
import { RuleModal, NodeModal } from "components/Components";

import 'assets/css/react-flow.css';
import 'assets/css/dnd.css';

const getId = v4;
const getEdgeId = (params) => ([
	'reactflow__edge', 
	params.source + (params.sourceHandle || 'null'), 
	params.target + (params.targetHandle || 'null')
].join('-'));

const edgeStyle = {
  	type: 'default',
  	labelBgPadding: [8, 4],
  	labelBgBorderRadius: 4,
  	labelStyle: { fill: 'white', "fontSize": '20px'},
  	labelBgStyle: { fill: '#dc3545', color: '#fff', fillOpacity: 0.7 },
    arrowHeadType: 'arrowclosed',
    animated: true,
}

export const ReactFlow = ({ elements, setElements, ...props }) => {
  	const reactFlowWrapper = useRef(null);
  	const [reactFlowInstance, setReactFlowInstance] = useState(null);
  	const [pendingItem, setPendingItem] = useState(null);

  	const [ruleModalOpen, setRuleModalOpen] = useState(null);
  	const [nodeModalOpen, setNodeModalOpen] = useState(null);

  	const onConnect = (params) => {
  		params = {...params, ...edgeStyle};
	    setPendingItem(getEdgeId(params))
	    setRuleModalOpen(true);

	  	setElements((els) => (addEdge(params, els)))

  	};

  	const onElementsRemove = (elementsToRemove) => {
    	setElements((els) => removeElements(elementsToRemove, els));
  	}

  	const onLoad = (_reactFlowInstance) => {
    	setReactFlowInstance(_reactFlowInstance);
  	}

	const onDragOver = (event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	};

	const getPosition = (value, boundingBox, offset) => (
		(value - boundingBox - ((value - boundingBox) % 20)) - offset
	)

  	const onDrop = (event) => {
	    event.preventDefault();

	    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
	    const type = event.dataTransfer.getData('application/reactflow');
	    const position = reactFlowInstance.project({
	      	x: getPosition(event.clientX, reactFlowBounds.left, 70),
	      	y: getPosition(event.clientY, reactFlowBounds.top, 30),
	    });
	    const newNode = {
	      	id: getId(),
	      	type,
	      	position,
	      	data: { label: `${type} node` },
	    };
	    setPendingItem(newNode.id)
	    setNodeModalOpen(true);

    	setElements((es) => es.concat(newNode));
  	};

  	const deletePendingItem = () => {
  		setElements((elements) => elements.filter(element => element.id !== pendingItem))
  		setPendingItem(null)
  	}

  	const updatePendingItem = (props) => {
  		setElements((elements) => (
  			elements.map((element) => {
  				if(element.id === pendingItem){
  					element = {
  						...element,
  						...props,
  						data: {
  							...element.data,
  							...props.data
  						}
  					}
  				}
  				return element;
  			})
  		))
  		setPendingItem(null)
  	}

	return (
		<>
			<RuleModal 
				open={ ruleModalOpen } 
				onCancel={ () => {
					deletePendingItem();
					setRuleModalOpen(false) 
				}} 
				onSubmit={ (content) => {
					updatePendingItem({label: content})
					setRuleModalOpen(false);
				}}
			/>
			<NodeModal
				open={ nodeModalOpen }
				onCancel={ () => {
					deletePendingItem();
					setNodeModalOpen(false)
				}}
				onSubmit={ (content) => {
					// Rules must be ordered, thus it must be a list of dictionaries
					let rules = [];
					_.each(content.split(/\r?\n/), i => {rules.push({name: i})});

					updatePendingItem({data: {rules: rules}});
					setNodeModalOpen(false);
				}}
			/>
			<Card className={ classNames(props.className, "h-100") }>
				<CardBody>
				    <div className="dndflow">
				      	<ReactFlowProvider>
				        	<div className="reactflow-wrapper" ref={reactFlowWrapper}>
				          		<ReactF
						            elements={ elements }
						            onConnect={onConnect}
						            onElementsRemove={onElementsRemove}
						            onLoad={onLoad}
						            onDrop={onDrop}
						            onDragOver={onDragOver}
						            nodeTypes={NodeTypes}
						            snapToGrid={true}
						            snapGrid={[20, 20]}
				          		>
					          		<Background variant="lines" gap={20}/>
					            	<Controls />
				          		</ReactF>
				        	</div>
				        	<Sidebar startNodeExists={ 
				        		elements.filter(el => el.type === 'start').length ? true : false 
				        	}/>
				      	</ReactFlowProvider>
				    </div>
				</CardBody>
			</Card>
		</>
	)
	
}