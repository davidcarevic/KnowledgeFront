import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import projectRedux from '../../redux/projects'
import { withRouter } from 'react-router-dom';
// import Button from '../../components/elements/Button';
// import Title from '../../components/elements/Title';
import StyledLink from '../../components/elements/Link';
// import Input from '../../components/elements/Input';
// import TextArea from '../../components/elements/TextArea';
import RichTextEditor from 'react-rte';
import Button from '../../components/elements/Button';
import Form from '../../components/elements/Form';

class CreateItem extends Component {
    static propTypes = {
        onChange: PropTypes.func
      };
    
      state = {
        value: RichTextEditor.createEmptyValue()
      }
    
      onChange = (value) => {
        this.setState({value});
        if (this.props.onChange) {
          // Send the changes up to the parent component as an HTML string.
          // This is here to demonstrate using `.toString()` but in a real app it
          // would be better to avoid generating a string on each change.
          this.props.onChange(
            value.toString('html')
          );
        }
      };

      handleFormSubmit = (e) => {
        e.preventDefault();
        const { history } = this.props
        const { value } = this.state;
        const element_id = this.props.match.params.e_id
        const project_id = this.props.match.params.id
        this.props.createItem(value, element_id);
        history.push("/dashboard/projects/" + project_id);
        
    }
    
      render() {
        const project_id = this.props.match.params.id
        const toolbarConfig = {
          display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
          INLINE_STYLE_BUTTONS: [
            {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
            {label: 'Italic', style: 'ITALIC'},
            {label: 'Underline', style: 'UNDERLINE'},
            {label: 'Strikethrough', style: 'STRIKETHROUGH'},
          ],
          BLOCK_TYPE_DROPDOWN: [
            {label: 'Normal', style: 'unstyled'},
            {label: 'Heading Large', style: 'header-one'},
            {label: 'Heading Medium', style: 'header-two'},
            {label: 'Heading Small', style: 'header-three'}
          ],
          BLOCK_TYPE_BUTTONS: [
            {label: 'UL', style: 'unordered-list-item'},
            {label: 'OL', style: 'ordered-list-item'},
            {label: 'Blockquote', style: 'blockquote'},
          ]
        };
        return (
            <div>
            <Form onSubmit={this.handleFormSubmit}>
                <RichTextEditor
                    toolbarConfig={toolbarConfig}
                    value={this.state.value}
                    onChange={this.onChange}/>
                <Button type="submit">CREATE</Button><hr/>
            </Form>
            <StyledLink to={"/dashboard/projects/" + project_id}>Back to Project</StyledLink>
          </div>
        );
      }
}

const mapDispatchToProps = {
    createItem: projectRedux.thunks.itemCreation
}

const mapStateToProps = state => ({
    item: state.projects.item
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateItem))