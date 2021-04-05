import React from 'react';
import classNames from "classnames/dedupe";
import { Popover as PopO, PopoverHeader, Button } from 'reactstrap';

const style = {
    "float": "right",
    "marginTop": "-4px",
    "textDecoration": "none"
}

export const Popover = ({ className, open, target, onClose, text }) => (
    <PopO className={ classNames(className, "bg-danger") } placement="bottom-start" isOpen={ open } target={ target } >
        <PopoverHeader className="bg-danger">
            { text }
            <Button color="link" className="popover-close-button" style={ style } onClick={ onClose }>&times;</Button>
        </PopoverHeader>
    </PopO>
)