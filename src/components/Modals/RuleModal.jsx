import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button } from "reactstrap";
import { Popover } from "components/Components";


export const RuleModal = (props) => {
  	const [content, setContent] = useState('');
  	const [popoverOpen, setPopoverOpen] = useState(false);
  	const onChange = (event) => { setContent(event.target.value) };
  	const validate = () => { 
  		if(content === ''){
  			setPopoverOpen(true);
  		}else{
  			setPopoverOpen(false);
  			props.onSubmit(content);
  		}
  	}
  	const cancel = () => {
  		setPopoverOpen(false);
  		props.onCancel(content)
  	}

    return (
    	<Modal isOpen={props.open}>
	    	<ModalHeader>
	    		Define New Rule<br/>
	    		<small style={{"fontSize": "60%"}}>Enter the regex for the rule which describes the transition between these states</small>
	    	</ModalHeader>
	        <ModalBody>
	            <Input id="ruleRegexInput" type="text" placeholder="^\s+.*" onChange={ onChange } />
	            <Popover 
	            	className="ruleRegexPopover"
	            	open={ popoverOpen }
	            	onClose={ () => setPopoverOpen(false) }
	            	target="ruleRegexInput"
	            	text="Regex missing or not valid."
	            />
	        </ModalBody>
	        <ModalFooter>
	            <Button color="primary" onClick={ () => { validate() } }>Submit</Button>
	            <Button color="secondary" onClick={ () => { cancel() }}>Cancel</Button>
	        </ModalFooter>
	    </Modal>
	);
}