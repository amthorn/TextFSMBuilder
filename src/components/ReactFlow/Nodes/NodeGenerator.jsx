import React from 'react';
import { Handle } from 'react-flow-renderer';
import { Accordion } from "components/Components";
import classNames from "classnames/dedupe";


const types = {
    'start': {
        topHandle: null,
        bottomHandle: {
            'id': 'a',
            'type': 'source',
            'position': 'bottom'
        },
        variant: "warning"
    },
    'state': {
        topHandle: {
            'id': 'a',
            'type': 'target',
            'position': 'top'
        },
        bottomHandle: {
            'id': 'b',
            'type': 'source',
            'position': 'bottom'
        },
        variant: "success"
    }
}

const validate = (event) => {
    // can't connect to yourself
    return event.source !== event.target
}

const handleGenerator = (props) => (props ? <Handle { ...props } isValidConnection={ validate } /> : null);

export const NodeGenerator = (type) => {
    const Node = (({ data, className, style }) => {
        const rules = data?.rules?.map(rule => (
            <div style={{"textAlign": "left"}} className={ rule.active ? "active-rule" : "" } key={rule.name}>{ rule.name }</div>
        ));
        const classes = classNames(className, `bg-${types[type]?.variant}`, data.active ? 'react-flow__node--active' : '');

        return (
            <div className={ classes } style={ style } >
                { handleGenerator(types[type]?.topHandle) }
                { data.label }
                <hr className="my-2"/>
                <Accordion variant={ types[type]?.variant } className="react-flow__node-accordion">
                    { rules }
                </Accordion>
                { handleGenerator(types[type]?.bottomHandle) }
            </div>
        );
    });
    return Node
}