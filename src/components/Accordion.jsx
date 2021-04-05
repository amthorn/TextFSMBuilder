import React, { useState } from 'react';
import { Collapse, CardBody, Card, Button } from 'reactstrap';
import { FaAngleDown, FaAngleUp } from "react-icons/fa"

export const Accordion = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
    	<div className={ props.className }>
      		<Button className="accordion-drop-link" color="link" onClick={ () => setIsOpen(!isOpen) } style={{ "cursor": "pointer" }}>
      			{ isOpen ? <FaAngleUp /> : <FaAngleDown /> }
      		</Button>
  			<Collapse isOpen={ isOpen }>
    			<Card className={ `bg-${ props.variant }` } style={{border: "1px solid black"}}>
      				<CardBody>
      					{ props.children }
      				</CardBody>
    			</Card>
  			</Collapse>
    	</div>
  	);
}