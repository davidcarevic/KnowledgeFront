import React, { Component } from 'react';
import { connect } from 'react-redux';
import projectRedux from '../../redux/projects'
import { withRouter } from 'react-router-dom';
import Embed from '../../components/itemTypes/Iframe';
import RichText from '../../components/itemTypes/RichText';
import Button from '../../components/elements/Button';
import Form from '../../components/elements/Form';
import Input from '../../components/elements/Input';
import { StyledPopover } from './styled';
import SunEditor, { buttonList } from 'suneditor-react';
import { Base64 } from 'js-base64';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-tomorrow";

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.handlePopover = this.handlePopover.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  state = {
    type: '',
    content: '',
    language: '',
    opened: false,
    openedLanguage: false,
    button: 'Add new Item'
  }

  onChange(cont) {
    this.setState({
      content: cont
    })
  }

  handleInputChange = (e) => {
      this.setState({ [e.target.id]: e.target.value })
  }

  handlePopover = (e) => {
    e.persist()
    if (this.state.opened) {
      this.setState({
        opened: false,
        openedLanguage: false,
        button: 'Add new Item',
        type: '',
        content: '',
        language: ''
      })
    } else {
      this.setState({
        opened: true,
        button: 'Close',
      })
    }
  }

  handleItemCreate(type) {
    this.setState({
      type: type
    })
    if (type === 'codeSnipet') {
      this.setState({
        opened: false,
        openedLanguage: true
      })
    }
  }

  handleLanguage(language) {
    if (!this.state.opened) {
      this.setState({
        language: language,
        opened: true
      })
    } else {
      this.setState({
        opened: false
      })
    }

  }

  handleChange(cont) {
    var encodedData = Base64.encode(cont);
    this.setState({
      content: encodedData
    })
  }

  handleSaveSubmit = (e) => {
      e.preventDefault();
      const { content, type, language } = this.state;
      const category = this.props.category
      const element_id = this.props.element
      if (type === 'codeSnipet') {
        let codeContent = {}
        codeContent['code'] = content
        codeContent['language'] = language
        this.props.createItem(codeContent, type, element_id, category);
      } else {
        this.props.createItem(content, type, element_id, category);
      }

      this.setState({
          opened: false,
          openedLanguage: false,
          button: 'Add new Item',
          type: '',
          content: '',
          language: ''
      })
  }

  render() {
  const { type, content, button, opened, openedLanguage } = this.state

    if (type === 'embed' && opened) {
      return (
        <div>
        <Form onSubmit={this.handleSaveSubmit}>
            <Input id="content" placeholder="ENTER YOUR URL" type="text" value={content} onChange={this.handleInputChange} /><br/><br/>
            <Button type="submit">CREATE</Button>
        </Form>
          <Button onClick={this.handlePopover}>CANCEL</Button>
        </div>
      )
    }

    if (type === 'richText' && opened) {
      return (
        <div>
        <Form onSubmit={this.handleSaveSubmit}>
            <SunEditor onChange={this.handleChange} editing={true} placeholder="Please type here..." autoFocus={true} enable={true} showToolbar={true}
              setOptions={{
                height: 'auto',
                width: 'auto',
                buttonList: buttonList.complex}}/><br/><br/>
            <Button type="submit">CREATE</Button>
        </Form>
        <Button onClick={this.handlePopover}>CANCEL</Button>
        </div>
      )
    }
    if (type === 'codeSnipet' && opened) {
      return (
        <div>
          <Form onSubmit={this.handleSaveSubmit}>
            <AceEditor
              mode="java"
              theme="tomorrow"
              height="auto"
              value={content}
              onChange={this.onChange}
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 4,
                maxLines: Infinity
              }}
            /><br/><br/>
            <Button type="submit">CREATE</Button>
          </Form>
          <Button onClick={this.handlePopover}>CANCEL</Button>
        </div>
      )
    }

    return (
      <div>
        <Button width={'150px'} onClick={this.handlePopover}>{button}</Button>
        {opened && (
					<StyledPopover>
            <h4>Select Item Type</h4>
						<div onClick={() => this.handleItemCreate('embed')}>Iframe</div>
						<div onClick={() => this.handleItemCreate('richText')}>Rich Text</div>
            <div onClick={() => this.handleItemCreate('codeSnipet')}>Code Snipet</div>
					</StyledPopover>
				)}
        {openedLanguage && (
          <StyledPopover>
            <h4>Select Programming Language</h4>
            <div onClick={() => this.handleLanguage('javascript')}>JavaScript</div>
            <div onClick={() => this.handleLanguage('java')}>Java</div>
            <div onClick={() => this.handleLanguage('python')}>Python</div>
            <div onClick={() => this.handleLanguage('xml')}>XML</div>
            <div onClick={() => this.handleLanguage('ruby')}>Ruby</div>
            <div onClick={() => this.handleLanguage('sass')}>SASS</div>
            <div onClick={() => this.handleLanguage('markdown')}>Markdown</div>
            <div onClick={() => this.handleLanguage('mysql')}>MySQL</div>
            <div onClick={() => this.handleLanguage('json')}>JSON</div>
            <div onClick={() => this.handleLanguage('html')}>HTML</div>
            <div onClick={() => this.handleLanguage('handlebars')}>Handlebars</div>
            <div onClick={() => this.handleLanguage('golang')}>Golang</div>
            <div onClick={() => this.handleLanguage('csharp')}>Csharp</div>
            <div onClick={() => this.handleLanguage('elixir')}>Elixir</div>
            <div onClick={() => this.handleLanguage('typescript')}>TypeScript</div>
            <div onClick={() => this.handleLanguage('css')}>CSS</div>
          </StyledPopover>
        )}
      </div>
    )

  }
}

const mapDispatchToProps = {
  createItem: projectRedux.thunks.itemCreation,
}

const mapStateToProps = state => ({
  category: state.projects.category
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateItem))
