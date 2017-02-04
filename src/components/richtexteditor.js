import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';
import './css/RichTextEditor.css';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';

const richButtonsPlugin = createRichButtonsPlugin();

const {    
  // inline buttons 
  ItalicButton, BoldButton, UnderlineButton,
  // block buttons 
   OLButton, ULButton,
} = richButtonsPlugin;

/* RichTextEditor creates a text editor for the announcement body using DraftJS. */
class RichTextEditor extends React.Component {

  constructor(props) {
    super(props);
    this.getStateFromProps(props);

    this.focus = () => this.refs.editor.focus();
    this.onChange = this.onChange.bind(this);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  getStateFromProps(props) {
    let html = this.props.text;
    let contentState = stateFromHTML(html);
    this.state = {editorState: EditorState.createWithContent(contentState)};
  }

  onChange(editorState) {
    this.setState({editorState});
    var contentState = editorState.getCurrentContent();
    let html = stateToHTML(contentState);
    this.props.onEdit(html);

  }

  handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
        )
      );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
        )
      );
  }

  updateStateIfDifferentFromProps(props) {
    const {editorState} = this.state;

    var contentState = editorState.getCurrentContent();
    let html = stateToHTML(contentState);
    let propshtml = this.props.text

    if (html != propshtml) {
      this.getStateFromProps(props);
    }
  }


  render() {
    this.updateStateIfDifferentFromProps(this.props);

    const {editorState} = this.state;

    let className = 'RichTextEditor-editor';
    var contentState = editorState.getCurrentContent();
    let html = stateToHTML(contentState);


    return (
      <div className = "RichEditor-root">
              <nav>
               <InlineStyleControls
                  editorState={editorState}
                  onToggle={this.toggleInlineStyle}/><BlockStyleControls
                  editorState={editorState}
                  onToggle={this.toggleBlockType}/> 
              </nav>


          <div>
          <Editor
            editorState={editorState}
            handleKeyCommand = {this.handleKeyCommand}
            onChange={this.onChange}
            onTab= {this.onTab}
            ref='editor'/>
          </div>
      </div>
    );
  }


}

      function getBlockStyle(block) {
        switch (block.getType()) {
          case 'blockquote': return 'RichEditor-blockquote';
          default: return null;
        }
      }

      /* Buttons for styling text */
      class StyleButton extends React.Component {
        constructor() {
          super();
          this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
          };
        }

        render() {
          let className = 'RichEditor-styleButton';
          if (this.props.active) {
            className += ' RichEditor-activeButton';
          }

          // render button images for block styles and plain text for inline styles
          var buttonDisplay;
          if (this.props.label == 'UL') {
            buttonDisplay = <img src={require('./images/ulButton.svg')} width="17px" height="17px"/>;
          } else if (this.props.label == 'OL') {
            buttonDisplay = <img src={require('./images/olButton.svg')} width="17px" height="17px"/>;
          } else {
            buttonDisplay = this.props.label;
          }

          return (
            <span className={className} onMouseDown={this.onToggle}>
              {buttonDisplay}
            </span>
          );
        }
      }


      const BLOCK_TYPES = [
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'},
      ];

      const BlockStyleControls = (props) => {
        const {editorState} = props;
        const selection = editorState.getSelection();
        const blockType = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();

        return (
          <span className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
              <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
              />
            )}
          </span>
        );
      };

      var INLINE_STYLES = [
        {label: 'B', style: 'BOLD'},
        {label: 'I', style: 'ITALIC'},
        {label: 'U', style: 'UNDERLINE'},
      ];

      const InlineStyleControls = (props) => {
        var currentStyle = props.editorState.getCurrentInlineStyle();
        return (
          <span className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
              <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
              />
            )}
          </span>
        );
      };

module.exports = RichTextEditor;