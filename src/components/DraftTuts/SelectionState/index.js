// https://lakesare.github.io/draft-rendering-methods/
import React, {Component} from 'react';

import { RichUtils, DefaultDraftBlockRenderMap, Editor, EditorState, ContentState, convertFromHTML } from 'draft-js';
import autoBind from 'react-autobind';
import Immutable from 'immutable';

import BlockStyleToolbar, {
  getBlockStyle
} from "./BlockStyleToolbar";

import './editor.css';





const Hello = (props) => {
  return <section style={{background: 'red'}}>
     {props.children}
  </section>
}


// const Images = (props) => {
//   return <div style={{className: 'images'}}>
//      {props.children}
//   </div>
// }



export default class Draft2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML('<p>hello</p><h6>Hii</h6>')))
    };

    autoBind(this);
  }

  blockStyleFn(contentBlock) {
    console.log(contentBlock.getType());
    if (contentBlock.getText() === 'Hii') {
      return 'cssClassToUseOnEveryHii';
    }

    if (contentBlock.getType() === 'images') {
      return 'images';
    }
    
  }

  toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  onChange(editorState) {
    this.setState({
      editorState
    });
  }
  

  render() {

        const blockRenderMap = DefaultDraftBlockRenderMap.merge(
      Immutable.Map({
        'header-six': {
          element: 'div'
          // Wrapper: <Hello/>
        },
        'images': {
          element: 'div',
          // Wrapper: <Images/>
        }
      })
        );
    
    return(
      <div className="editorContainer">
        <div className="toolbar">
              <BlockStyleToolbar
            editorState={this.state.editorState}
            onToggle={this.toggleBlockType}
                />
        </div>
      <Editor
      editorState={this.state.editorState}
      onChange={(newState) => this.setState({ editorState: newState })}
      blockStyleFn={this.blockStyleFn}
    blockRenderMap={blockRenderMap}
        />
      </div>
    )
  }
}

// ReactDOM.render(<Draft2/>, document.getElementById('app'));



