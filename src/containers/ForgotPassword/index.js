import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '../../components/elements/Button';
import Title from '../../components/elements/Title';
import Form from '../../components/elements/Form';
import Input from '../../components/elements/Input';
import HomeHolder from '../../components/elements/HomeHolder';
import userRedux from '../../redux/user';

class ForgotPassword extends Component {
    state = {
        email: '',
        data: {}
    }

    componentDidMount() {
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { email } = this.state;
        console.log(email)
        //this.props.resetPass(email);
    }
    render() {
        const { email } = this.state;
        return (
            <HomeHolder>
                <Form onSubmit={this.handleFormSubmit}>
                    <Title> FORGOT PASSWORD? </Title>
                    <div>
                        Enter the email address you used when you joined and<br/>
                        we'll send you instructions to reset your password.
                    </div><br />
                    <Input id="email" type="email" placeholder="EMAIL" value={email} onChange={this.handleInputChange} /><br/><br/>
                    <Button primary type="submit">EMAIL ME RECOVERY LINK</Button>
                </Form>
            </HomeHolder>
        )
    }
}

const mapDispatchToProps = {
    resetPass:userRedux.thunks.resetPassword
}

const mapStateToProps = state => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword))