import React from 'react';
import { StyledSunEditor, DisplayRichText, StyledItem } from './styled';
import { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Form from '../../elements/Form';
import Button from '../../elements/Button';
import StyledLink from "../../elements/Link";
import Item from '../../Item';
import { Base64 } from 'js-base64';
import { connect } from 'react-redux';
import projectRedux from '../../../redux/projects'
import { withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

class RichText extends Item {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }

  state = {
    type: 'richText'
  }

  handleChange(cont){
    var encodedData = Base64.encode(cont);
    this.setState({
      content: encodedData
    })
  }


  render() {
    const project_id = this.props.match.params.id
    if (this.props.editing && this.props.first === undefined) {
      return (
        <Form onSubmit={this.handleSaveSubmit}>
            <StyledSunEditor onChange={this.handleChange} editing={true} placeholder="Please type here..." autoFocus={true} enable={true} showToolbar={true}
              setOptions={{
                buttonList: buttonList.complex}}/><br/><br/>
            <Button type="submit">CREATE</Button><hr/>
            <StyledLink to={"/dashboard/projects/" + project_id}>Back to Project</StyledLink>
        </Form>
      );
    }
    if (this.props.editing && !this.props.first) {
      const content = Base64.decode(this.props.content)
      return (
        <Form onSubmit={this.handleUpdateSubmit}>
          <StyledItem>
            <StyledSunEditor setContents={content} onChange={this.handleChange} editing={true} placeholder="Please type here..." autoFocus={true} enable={true} showToolbar={true}
              setOptions={{
                buttonList: buttonList.complex}}/><br/><br/>
            <Button type="submit" width={'150px'}>Save</Button>
          </StyledItem>
        </Form>
      );
    }

    if (!this.props.editing) {
      const content = ReactHtmlParser(Base64.decode(this.props.content))
      return (
        <DisplayRichText>
          {content}
        </DisplayRichText>
      );
    }
  }
}

const mapDispatchToProps = {
  createItem: projectRedux.thunks.itemCreation,
  updateItem: projectRedux.thunks.itemUpdate

}

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  element: state.projects.element,
  item: state.projects.item
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RichText))
