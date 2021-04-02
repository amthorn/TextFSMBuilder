import React from 'react';
import { Nodes } from "./Nodes";
import classNames from "classnames/dedupe";



export const Sidebar = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside>
            <div className="description">
                You can drag these nodes to the pane on the left.
            </div>
            {
                Nodes.map(node => (
                    <div 
                        className={ classNames(
                            "dndnode", 
                            node['type'], 
                            `bg-${node['bg']}`, 
                            `text-${node['color']}`,
                            node['name'].toLowerCase()
                        ) }
                        onDragStart={ (event) => onDragStart(event, node['type']) }
                        draggable
                    >
                        { node['name'] } Node
                    </div>
                ))
            }
        </aside>
    );
};