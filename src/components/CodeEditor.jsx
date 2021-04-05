import AceEditor from "react-ace";
import React from "react";

// https://github.com/securingsincity/react-ace

const style = {
	"maxWidth": "100%",
	"borderRadius": "5px",
    "border": "1px solid #ccc"
};

export class CodeEditor extends React.Component{
    render() {
        return (
        	<AceEditor
            	focus={ true }
            	// width="100%"
            	// height={ this.props.height }
            	// mode={ this.state.mode }
            	// theme="sqlserver"
                onLoad={ this.props.onLoad } 
            	fontSize={ 12 }
            	showPrintMargin={ false }
            	showGutter={ true }
            	highlightActiveLine={ true }
            	value={ this.props.value }
        		setOptions={ {
                    enableSnippets: false,
                    enableLiveAutocompletion: true,
        			showLineNumbers: true,
        			tabSize: 2,
                    useWorker: true
        		} }
        		style={ style }
        		{ ...this.props }
        	/>
        )
    }
}
