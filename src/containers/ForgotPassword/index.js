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
        guid: '',
        email: '',
        password:'',
        password2:'',
        resend:false,
        data: {}
    }

    componentDidMount() {
        console.log("GUID : ", this.props.match.params.guid)
        var guid = this.props.match.params.guid
        if (guid) {
            this.setState({guid: guid})
            if (!this.props.isLoading && guid){
                this.props.getUserReset(guid)
                this.setState({email:this.props.user.reset.email })
            }
        }

    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { email } = this.state;
        console.log(email)
        this.props.sendPassReset(email);
        this.setState({resend:true})

    }

    handlePassReset = (e) =>{
        e.preventDefault();
        const {guid, password, password2, email} = this.state
        const { history } = this.props
        if(password === password2){
            this.props.resetPass(guid, password, email)
            history.push('/')
        }
    }

    render() {
        const { email, guid, password, password2,resend } = this.state;
        if(guid){
            return (
                <HomeHolder>
                    <Form onSubmit={this.handlePassReset}>
                        <Title> RESET YOUR PASSWORD </Title>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris<br />nisi ut aliquip ex ea commodo consequat.
                        </div><br/>
                        <h2>{this.props.user.reset.email?this.props.user.reset.email:''}</h2>
                        <Input id="password" placeholder="NEW PASSWORD" type="password" value={password} onChange={this.handleInputChange} /><br/><br/>
                        <Input id="password2" placeholder="CONFIRM PASSWORD" type="password" value={password2} onChange={this.handleInputChange} /><br/><br/>
                        <Button primary type="submit">RESET PASSWORD</Button>
                    </Form>
                </HomeHolder>
            )
        }
        if(resend){
            return(
                <HomeHolder>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Title>CHECK YOUR INBOX</Title>
                        <div>
                            An email has been sent to {email}, please follow the instructions. Please check your email.<br/>
                            Didn't receive an email?
                        </div><br />
                        <Button primary type="submit">RESEND</Button>
                    </Form>
                </HomeHolder>
            )
        }
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
    sendPassReset:userRedux.thunks.sendResetPassword,
    getUserReset:userRedux.thunks.getResetPassUser,
    resetPass: userRedux.thunks.resetPasswordForUser
}

const mapStateToProps = state => ({
    user:state.user
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword))