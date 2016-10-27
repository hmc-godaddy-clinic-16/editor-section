import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';

// var editor_styles = {
// 	border: '1px',
// 	padding: '6px'

// };

class RichTextEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {editorState: EditorState.createEmpty()};
		this.onChange = (editorState) => this.setState({editorState});
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
	}
	handleKeyCommand(command) {
		const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
		if (newState) {
			this.onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	}

	_onBoldClick() {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
	}

	_onItalicClick() {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
	}

	render() {
		return (
			<div>
				<button onClick={this._onBoldClick.bind(this)}>Bold</button>
				<button onClick={this._onItalicClick.bind(this)}>Italic</button>
				<div>
				<Editor
					editorState={this.state.editorState}
					handleKeyCommand = {this.handleKeyCommand}
					onChange={this.onChange}
				/>
				</div>
			</div>
		);
	}
}

module.exports = RichTextEditor;