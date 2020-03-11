import React, { Component } from 'react';
import { connect } from 'react-redux';
// import projectRedux from '../../redux/projects'
import { withRouter } from 'react-router-dom';
import Embed from '../../components/itemTypes/Iframe'
import RichText from '../../components/itemTypes/RichText'

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
  const type = this.props.match.params.type

    if (type === 'embed') {
      return (
        <Embed editing={true}/>
      )
    }

    if (type === 'richText') {
      return (
        <div>
          <RichText editing={true}/>
        </div>
      )
    }

    return (
      <div>
        Hello!
      </div>
    )

  }
}

const mapDispatchToProps = {

}

const mapStateToProps = state => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateItem))