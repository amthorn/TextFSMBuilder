import { Machine, assign, interpret } from "xstate";
import _ from 'lodash';

//////* RESTRICTIONS *******************************/
/////* 1) Unique rules within a state             */
////*  2) At least one rule within all states    */
///*   3) States cannot connect to themselves   */
//*    4) Only one initial state               */
/**********************************************/

/* TODO: Permit these */
/* 1) States can have multiple rules that lead to the same state */

export default class FlowFSM {

	static globalMachine = {
		id: 'FlowFSM',
		context: {
			line: ''
		}
	};
	static guards = {
		resolveRule: (context, event, { cond }) => {
			console.log("IN RESOLVE RULE")
			console.log("RULE IS")
			console.log(cond.rule)
			return true;
		}
	};

	constructor({ elements, setElements }){
		this.elements = elements;
		this.setElements = setElements;
		this.states = {...this.convertStates(elements), 'hist': {'type': 'history'}};
		this.initialState = this.getInitialState(elements)
		this.machineDescription = { 
			...FlowFSM.globalMachine, 
			states: this.states, 
			initial: this.initialState
		};
		this.machine = Machine(this.machineDescription, {guards: FlowFSM.guards}) 
		this.service = interpret(this.machine).onTransition((state, event) => {
			console.log(state)
			console.log(event)
			setElements(this.elements.map(e => {
				const data = state.value.split('->');
				if(data[0] === e.id && e.data.rules.length > 0){
					return {
						...e, 
						data: {
							...e.data, 
							rules: e.data.rules.map(r => ({
								...r, 
								active: r.name === data[1]
							}))
						}
					};
				}else{
					return e;
				}
			}));
		})
		console.log(this.machineDescription)
	}

	getState = (state, rule, target) => (
		{
			[[state.id, rule, 'preRule'].join('->')]: {
				on: {
					STEP: {
						target: [state.id, rule, 'rule'].join('->'),
						actions: assign({line: (context, event) => {console.log("IN RULE"); return 1}})
					}
				}
			},
			[[state.id, rule, 'rule'].join('->')]: {
				always: {
					target: target,
					internal: false,
					cond: {
						type: 'resolveRule',
						rule: rule
					}
				}
			}
		}
	);

	getOutboundEdges = (source) => {
		
	}

	convertStates = (elements) => {
		let states = {};
		_.each(elements, i => {
			// only check states per comment below
			if(i.type !== 'default'){
				let ruleStates = {}
				for(let k = 0; k < i.data?.rules?.length; k++){
					let target = k < i.data.rules.length - 1 ? [i.id, i.data.rules[k+1].name, 'preRule'].join('->') : 'final';
					states = {...states, ...this.getState(i, i.data.rules[k].name, target)};
				}
			}
		});
		_.each(elements, i => {
			// only check edges
			if(i.type === 'default'){
				// have to do this after adding all state rules so we can detect
				// the last rule
				for(let s in states[i.source]?.states) {
					if(states[i.source]?.states[[i.source, s].join('->')]?.states?.rule?.target == 'final'){
						states[i.source]?.states[[i.source, s].join('->')].states.rule.target = i.label
					}
				}
				states = {...states, ...this.getState(i, i.label, i.target)}
			}
		});
		// set global state
		states = {...states, ...{
			final: {
				type: 'final'
			}
		}}
		return states;
	};
	getInitialState = (elements) => {
		const state = _.find(elements, ['type', 'start'])
		if(state?.data?.rules?.length > 0){
			return [state?.id, state?.data?.rules[0]?.name, 'preRule'].join('->')
		}
	};
	step = () => {
		if(this.initialState){
			if(!this.service?.initialized){
				this.service?.start();
			}
			console.log("STEP")
			this.service.send("STEP");
		}
	}

}