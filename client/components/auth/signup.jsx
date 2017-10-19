import React from 'react';
import { Col, Form, FormGroup, FieldGroup, FormControl, ControlLabel, Checkbox, Button, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import axios from 'axios';

// React-Redux connect() boilerplate
// NOTE: you may have to modify the filepath for ChangeActions
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../actions';

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typedUsername: '',
      typedPassword: '',
      typedEmail: '',
      isCreator: false
    }
    this.updateTypedUsername = this.updateTypedUsername.bind(this);
    this.updateTypedPassword = this.updateTypedPassword.bind(this);
    this.updateTypedEmail = this.updateTypedEmail.bind(this);
    this.updateIsCreator = this.updateIsCreator.bind(this);
    this.submitNewAccount = this.submitNewAccount.bind(this);
    this.handleRoleSelect = this.handleRoleSelect.bind(this);
  }

  updateTypedUsername(e) {
    this.setState({typedUsername: e.target.value});
  }

  updateTypedPassword(e) {
    this.setState({typedPassword: e.target.value});
  }

  updateTypedEmail(e) {
    this.setState({typedEmail: e.target.value});
  }

  updateIsCreator(e) {
    this.setState({isCreator: !this.state.isCreator});
  }

  submitNewAccount(e) {
    e.preventDefault();
    axios.post('/signup', {
      username: this.state.typedUsername,
      password: this.state.typedPassword,
      email: this.state.typedEmail,
      isCreator: this.state.isCreator
    })
      .then(res => {
        let {username, name, age, sex, race, isCreator} = res.data.userData;
        this.props.actions.setLoggedIn(username, name, age, sex, race, isCreator);
        this.props.history.push('/');
      })
      .catch(err => {
        console.log('submitNewAccount Error:', err);
      })
  }

  handleRoleSelect(ind) {
    if (ind === 2) {
      this.setState({
        isCreator: true
      }, () => {
        this.props.actions.setRoleForNewFbUser({isCreator: this.state.isCreator})
      });
    } else {
      this.setState({
        isCreator: false
      }, () => {
        this.props.actions.setRoleForNewFbUser({isCreator: this.state.isCreator})
      });
    }
  }

  render() {
    return (
      <div className='auth'>
        <h2 className='signupHeader'>New Account</h2>
        <Form horizontal onSubmit={this.submitNewAccount}>
          <FormGroup>
            <Col className='authInput'>
              <FormControl
                type='text'
                value={this.state.typedUsername}
                placeholder='Username'
                onChange={this.updateTypedUsername}
              />
            </Col>
            <Col className='authInput'>
              <FormControl
                type='password'
                value={this.state.typedPassword}
                placeholder='Password'
                onChange={this.updateTypedPassword}
              />
            </Col>
            <Col className='authInput'>
              <FormControl
                type='text'
                value={this.state.typedEmail}
                placeholder='Email'
                onChange={this.updateTypedEmail}
              />
            </Col>
            <ButtonToolbar>
              <ToggleButtonGroup type="radio" name="options" defaultValue={1} onChange={this.handleRoleSelect}>
                <ToggleButton value={1}>Tester</ToggleButton>
                <ToggleButton value={2}>Creator</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
            <br/>
            <Button type='submit'>Submit</Button>
          </FormGroup>
        </Form>
        <hr/>
          <a href='/auth/facebook'>
            <img className='fblogin' src='https://www.promotevideoonline.com/style/images/facebook-login.png'></img>
          </a>
          <p style={center}> Don't forget to select Tester/Creator!</p>
      </div>
    )
  }
}

const center = {
  textAlign: "center"
}

// React-Redux connect() boilerplate
// 1. Include the properties in the Store you want this component to have access to
// 2. Change the Component name at the very end to the one in the current file
const mapStateToProps = (state) => {
  console.log('state in signup', state)
  return ({
    example: state.example,
    setLoggedIn: state.setLoggedIn,
    router: state.router
  })
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup));
