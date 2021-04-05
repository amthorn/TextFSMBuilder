import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Button } from "reactstrap";
import { Popover } from "components/Components";

const placeholder = `^\\s+.*
^\\s+\\d+
...`


export const NodeModal = (props) => {
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
	    		Define New State<br/>
	    		<small style={{"fontSize": "60%"}}>Enter the regex rules for this state, seperated by new lines.</small>
	    	</ModalHeader>
	        <ModalBody>
	            <Input id="nodeRegexInput" type="textarea" rows={5} placeholder={ placeholder } onChange={ onChange } />
	            <Popover 
	            	className="nodeRegexPopover"
	            	open={ popoverOpen }
	            	onClose={ () => setPopoverOpen(false) }
	            	target="nodeRegexInput"
	            	text="At least one state rule must be defined"
	            />
	        </ModalBody>
	        <ModalFooter>
	            <Button color="primary" onClick={ () => { validate() } }>Submit</Button>
	            <Button color="secondary" onClick={ () => { cancel() }}>Cancel</Button>
	        </ModalFooter>
	    </Modal>
	);
}