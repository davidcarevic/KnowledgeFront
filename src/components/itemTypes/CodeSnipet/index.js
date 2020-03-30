import React from 'react';
import { StyledItem } from './styled'
import Form from '../../elements/Form';
import Button from '../../elements/Button';
import Item from '../../Item'
import { connect } from 'react-redux';
import projectRedux from '../../../redux/projects'
import { withRouter } from 'react-router-dom';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-handlebars";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-elixir";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-tomorrow";

class CodeSnipet extends Item {
  constructor(props) {
    super(props);
    this.state.content = this.props.content || ''
    this.state.language = this.state.content['language']
    this.onChange = this.onChange.bind(this)
    this.changeContent = this.changeContent.bind(this)
  }

    state = {
      type: 'codeSnipet'
    }

    changeContent(cont) {
      this.setState({
        content: cont
      })
    }

    onChange(cont){
      var codeContent = {}
      codeContent['code'] = cont
      codeContent['language'] = this.state.language
      this.changeContent(codeContent)
    }


    render() {
      const { content } = this.state
      const { editing } = this.props
      if (editing) {
        return (
          <div>
            <Form onSubmit={this.handleUpdateSubmit}>
              <StyledItem>
                <AceEditor
                  mode={content['language']}
                  theme="tomorrow"
                  height="auto"
                  value={content['code']}
                  onChange={this.onChange}
                  editorProps={{ $blockScrolling: true }}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                    maxLines: Infinity
                  }}
                />
                <Button type="submit" width={'150px'}>Save</Button>
              </StyledItem>
            </Form>
            <Form onSubmit={this.handleDeleteSubmit}>
              <StyledItem>
                <Button type="submit" width={'150px'}>Delete</Button>
              </StyledItem>
            </Form>
          </div>
        );
      }
      if(!editing) {
        return (
          <div>
            <AceEditor
              mode={content['language']}
              theme="tomorrow"
              height="auto"
              value={content['code']}
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: true,
                showLineNumbers: true,
                maxLines: Infinity,
                readOnly: true
              }}
            />
          </div>
        );
      }
    }
}

const mapDispatchToProps = {
  updateItem: projectRedux.thunks.itemUpdate,
  deleteItem: projectRedux.thunks.itemDelete
}

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  element: state.projects.element,
  item: state.projects.item,
  category: state.projects.category
})

export default connect(mapStateToProps, mapDispatchToProps)(CodeSnipet)
