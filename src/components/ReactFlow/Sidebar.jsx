import React from 'react';
import { DragAndDropNodeTypes } from "./Nodes/NodeTypes";
import classNames from "classnames/dedupe";



export const Sidebar = ({ startNodeExists }) => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside>
            <div className="description">
                You can drag these nodes into the graph panel.
            </div>
            {
                DragAndDropNodeTypes.map(node => (
                    <div 
                        className={ classNames(
                            "dndnode", 
                            node['type'], 
                            `text-${node['color']}`,
                            node['name'].toLowerCase() + 'DnDNode',
                            startNodeExists && node.type === 'start' ? 'disabled' : ''
                        ) }
                        key={ node['name'] }
                        onDragStart={ (event) => onDragStart(event, node['type']) }
                        { ...(startNodeExists && node.type === 'start' ? {} : {draggable: true}) }
                    >
                        { node['name'] } Node
                    </div>
                ))
            }
        </aside>
    );
};