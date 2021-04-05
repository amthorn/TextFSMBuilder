import React, { useState } from "react";
import { Container, Row, Col, Label, Button } from "reactstrap";
import { ReactFlow, CodeEditor } from '../components/Components';
import { Range } from "ace-builds";
import FlowFSM from "functions/fsm/FlowFSM"


const elements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  // you can also pass a React component as a label
  { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
];

// const consume = (dog) => {
// 	console.log("CONSUMING")
// 	return (callback, onEvent) => {
// 		console.log("FINISHING")
// 		callback({type: "onDone", data: dog});
// 	};
// }

let fsm = null;

export const Main = () => {
  	const [elements, setElements] = useState([]);
  	const [line, setLine] = useState(0);
  	const [content, setContent] = useState("# Paste your output here");
  	const [editor, setEditor] = useState(null);
 //  	const states = {
 //  		start: {
 //  			on: { 
 //  				STEP: "consume"
 //  			}
 //  		},
 //  		consume: {
 //  			invoke: {
	// 	        id: 'consumeRule',
	// 	        src: (context, event) => consume('fido'),
	// 	        // onDone: 'final',
	// 	        onError: 'consumeFail'
	// 	    },
	// 	    on: {
	// 	        onDone: {
	// 	          	target: 'final',
	// 	          	actions: assign({dog: (_, event) => {
	// 	          		console.log(event);
	// 	          		return event.data;
	// 	          	}})
	// 	        },
	// 	    	CANCEL: 'hist'
	// 	    }
 //  		},
 //  		consumeFail: {

 //  		},
 //  		final: {
 //  			on: {
 //  				STEP: 'start'
 //  			}
 //  		},
 //  	}

	const onRun = () => setLine(++line);
	const onNextStep = () => {
		if(fsm === null || fsm.elements !== elements){
			fsm = new FlowFSM({ elements: elements, setElements: setElements });
			console.log(elements)
		}
		fsm.step();
	}

	const removeAllMarkers = () => {
		const markers = editor?.session?.getMarkers();
		if(markers){
			const markersArray = Object.keys(markers);
			for (const item of markersArray) {
				editor.getSession().removeMarker(markers[item].id);
			}
		}
		editor?.getSession().clearAnnotations()
	}
	
	removeAllMarkers()
    editor?.getSession()?.addMarker(
    	new Range(line, 0, line, 1), 
    	"ace_line_marker", 
    	"fullLine"
	);
   	editor?.getSession().setAnnotations([{
		row: line,
		column: 0,
		text: "RULE WILL GO HERE",  // TODO: 
		type: "info"
	}]);

   	return (
		<Container id="main_container" className="py-3">
			<Row style={{height: "96%"}}>
				<Col lg={4}>
					<Container className="h-100 p-0 mx-0 d-flex flex-column">
						<div>
				        	<Label for="dataExample" className="text-primary">Data</Label><br/>
			        		<small className="text-secondary">
			        			Paste some example data here for comparison
			        		</small>
		        		</div>
		        		<div className="h-100 mb-3">
		        			<CodeEditor 
		        				value={ content }
		        				className="my-2 h-100"
		        				onLoad={ (editor) => setEditor(editor) }
		        				onChange={ (content) => {
		        					removeAllMarkers(); 
		        					setLine(0);
		        					setContent(content);
		        				}}
		        			/>
				        </div>
				    </Container>
				</Col>
				<Col lg={8} className="mb-2">
					<ReactFlow elements={ elements } setElements={ setElements }/>
				</Col>
			</Row>
			<Row>
		        <Col>
	        		<Button variant="primary" block onClick={ onNextStep }>Next Step</Button>
	        	</Col>
	        	<Col>
	        		<Button variant="primary" block onClick={ onRun }>Run</Button>
	        	</Col>
			</Row>
		</Container>
	);
}