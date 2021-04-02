import React from "react";
import { Container, Row, Col, Label, Input, Button } from "reactstrap";
import { ReactFlow } from '../components/Components';


const elements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  // you can also pass a React component as a label
  { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
];

export const Main = () => {
	return (
		<Container className="py-3">
			<Row className="h-100">
				<Col lg={4}>
					<Container className="h-100 p-0 d-flex flex-column justify-content-between">
						<div>
				        	<Label for="dataExample" className="text-primary">Data</Label><br/>
			        		<small className="text-secondary">
			        			Paste some example data here for comparison
			        		</small>
		        		</div>
		        		<div className="h-100 mb-3">
				        	<Input type="textarea" name="text" id="dataExample" className="my-2 h-100"/>
				        </div>
				        <div>
			        		<Button variant="primary" block>Process</Button>
			        	</div>
				    </Container>
				</Col>
				<Col lg={8}>
					<ReactFlow elements={ elements }/>
				</Col>
			</Row>
		</Container>
	)
}