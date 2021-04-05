import { NodeGenerator } from "./NodeGenerator";

export const NodeTypes = {
	start: NodeGenerator('start'),
	// rule: RuleNode,
	state: NodeGenerator('state')
}
export const DragAndDropNodeTypes = [
	{
		name: "Start",
		bg: "warning",
		type: "start",
		color: "dark"
	}, 
	// {
	// 	name: "Rule",
	// 	bg: "danger",
	// 	type: "input",
	// 	color: "dark"
	// }, 
	{
		name: "State",
		bg: "success",
		type: "state",
		color: "dark"
	}, 
	// {
	// 	name: "Start",
	// 	type: "output"
	// }
]