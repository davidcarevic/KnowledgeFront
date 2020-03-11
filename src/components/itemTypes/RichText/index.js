import React from 'react';
import SunEditor, { buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Form from '../../elements/Form';
import Button from '../../elements/Button';
import StyledLink from "../../elements/Link";
import projectRedux from '../../../redux/projects';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Item from '../../Item';
import { Base64 } from 'js-base64';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class RichText extends Item {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }
  
  state = {
    type: 'richText'
  }

  handleChange(cont){
    console.log(cont)
    var encodedData = Base64.encode(cont);
    this.setState({
      content: encodedData
    })
  }

  render() {
    const project_id = this.props.match.params.id
    if (this.props.editing) {
      return (
        <Form onSubmit={this.handleFormSubmit}>
                <SunEditor onChange={this.handleChange} editing={true} placeholder="Please type here..." autoFocus={true} enable={true} showToolbar={true}
                  setOptions={{
                    height: 300,
                    buttonList: buttonList.complex}}/><br/><br/>
                <Button type="submit">CREATE</Button><hr/>
                <StyledLink to={"/dashboard/projects/" + project_id}>Back to Project</StyledLink>
            </Form>
        );
      }
      if (!this.props.editing) {
        const content = ReactHtmlParser(Base64.decode(this.props.content))
        return (
            <div>
              {content}
            </div>
        );
    }
  }
}

const mapDispatchToProps = {
  createItem: projectRedux.thunks.itemCreation
}

const mapStateToProps = state => ({
  isLoading: state.global.isLoading,
  element: state.projects.element
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RichText))