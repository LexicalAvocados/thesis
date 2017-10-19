import React from 'react';
import { Form, FormGroup, FormControl, ListGroup, ListGroupItem, Option, ButtonToolbar, Button, ToggleButtonGroup, ToggleButton, Alert, Fade } from 'react-bootstrap';
import axios from 'axios';

// React-Redux connect() boilerplate
// NOTE: you may have to modify the filepath for ChangeActions
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../actions';

class TesterProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingName: false,
      editingAge: false,
      editingSex: false,
      editingRace: false,
      showSaveChangesButton: false,
      showProfileUpdateSuccess: false,
      showProfileUpdateError: false
    }
    this.startEditingName = this.startEditingName.bind(this);
    this.stopEditingName = this.stopEditingName.bind(this);
    this.startEditingAge = this.startEditingAge.bind(this);
    this.stopEditingAge = this.stopEditingAge.bind(this);
    this.startEditingSex = this.startEditingSex.bind(this);
    this.stopEditingSex = this.stopEditingSex.bind(this);
    this.startEditingRace = this.startEditingRace.bind(this);
    this.stopEditingRace = this.stopEditingRace.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateAge = this.updateAge.bind(this);
    this.updateSex = this.updateSex.bind(this);
    this.updateRace = this.updateRace.bind(this);
    this.submitChangesToDB = this.submitChangesToDB.bind(this);
  }

  startEditingName() {
    this.setState({editingName: true});
  }

  stopEditingName(e) {
    e.preventDefault();
    this.setState({editingName: false, showSaveChangesButton: true});
  }

  startEditingAge() {
    this.setState({editingAge: true});
  }

  stopEditingAge(e) {
    e.preventDefault();
    this.setState({editingAge: false, showSaveChangesButton: true});
  }

  startEditingSex() {
    this.setState({editingSex: true});
  }

  stopEditingSex(e) {
    this.setState({editingSex: false, showSaveChangesButton: true});
  }

  startEditingRace() {
    this.setState({editingRace: true});
  }

  stopEditingRace(e) {
    this.setState({editingRace: false, showSaveChangesButton: true});
  }

  updateName(e) {
    if (e.target.value === '') {
      this.props.actions.setName(undefined);
    } else {
      this.props.actions.setName(e.target.value);
    }
  }

  updateAge(e) {
    if (e.target.value === '') {
      this.props.actions.setAge(undefined);
    } else if (e.target.value.split('').every(char => char === ' ') || Number.isNaN(Number(e.target.value))) {
      return;
    } else {
      this.props.actions.setAge(Number(e.target.value));
    }
  }

  updateSex(e) {
    this.props.actions.setSex(e);
  }

  updateRace(e) {
    this.props.actions.setRace(e);
  }

  submitChangesToDB() {
    axios.put('/profile', this.props.loggedInUser)
      .then(res => {
        if (res) {
          this.setState({showProfileUpdateSuccess: true});
          setTimeout(() => this.setState({showProfileUpdateSuccess: false}), 3000);
        } else {
          this.setState({showProfileUpdateError: true});
          setTimeout(() => this.setState({showProfileUpdateError: false}), 3000);        
        }
      })
  }

  render() {
    return (
      <div className='testerProfile'>
        <h2 className='profileHeading'>Your Profile</h2>
        <ListGroup>

          <ListGroupItem onClick={this.startEditingName}>
            <span className='profileLabel'>Name:</span> {this.state.editingName ?
              <span className='profileInput'>
                <form className='profileInput' onSubmit={this.stopEditingName}>
                  <FormGroup>
                    <FormControl type='text' value={this.props.loggedInUser.name} onChange={this.updateName} />
                  </FormGroup>
                </form>
              </span>
            :
              <span>{this.props.loggedInUser.name}</span>
            }
          </ListGroupItem>

          <ListGroupItem onClick={this.startEditingAge}>
            <span className='profileLabel'>Age:</span> {this.state.editingAge ?
              <span className='profileInput'>
                <form onSubmit={this.stopEditingAge}>
                  <FormGroup>
                    <FormControl type='text' value={this.props.loggedInUser.age} onChange={this.updateAge} />
                  </FormGroup>
                </form>
              </span>
            :
              <span>{this.props.loggedInUser.age}</span>}
          </ListGroupItem>

          <ListGroupItem onClick={this.startEditingSex}>
            <span className='profileLabel'>Sex:</span> {this.state.editingSex ?
              <span className='profileInput'>
                <ButtonToolbar>
                  <ToggleButtonGroup type='radio' name='sexOptions' onChange={(e) => {this.updateSex(e); this.stopEditingSex(e)}}>
                    <ToggleButton value='Male'>Male</ToggleButton>
                    <ToggleButton value='Female'>Female</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </span>
            :
              <span>{this.props.loggedInUser.sex}</span>
            }
          </ListGroupItem>

          <ListGroupItem onClick={this.startEditingRace}>
            <span className='profileLabel'>Race:</span> {this.state.editingRace ?
              <span className='profileInput'>
                <ButtonToolbar>
                  <ToggleButtonGroup type='radio' name='raceOptions' onChange={(e) => {this.updateRace(e); this.stopEditingRace(e)}}>
                    <ToggleButton value='Caucasian'>Caucasian</ToggleButton>
                    <ToggleButton value='Hispanic'>Hispanic</ToggleButton>
                    <ToggleButton value='African American'>African American</ToggleButton>
                    <ToggleButton value='Asian'>Asian</ToggleButton>
                    <ToggleButton value='Pacific Islander'>Pacific Islander</ToggleButton>
                    <ToggleButton value='Native American'>Native American</ToggleButton>
                    <ToggleButton value='Other'>Other Ethnicity</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </span>
            :
              <span>{this.props.loggedInUser.race}</span>}
          </ListGroupItem><br/>

          {this.state.showSaveChangesButton && 
          <Button
            bsStyle='primary'
            onClick={this.submitChangesToDB}
          >Save Changes</Button>} <br/><br/>

          <Fade in={this.state.showProfileUpdateSuccess}>
            <Alert bsStyle='success'>
              Profile updated!
            </Alert>
          </Fade>

          <Fade in={this.state.showProfileUpdateError}>
            <Alert bsStyle='warning'>
              Error updating profile. Please try again later.
            </Alert>
          </Fade>

        </ListGroup>
      </div>
    )
  }
}

const testerProfileContainerStyle = {
  display: "flex",
  marginTop: "3%"
}

// React-Redux connect() boilerplate
// 1. Include the properties in the Store you want this component to have access to
// 2. Change the Component name at the very end to the one in the current file
const mapStateToProps = (state) => {
  console.log('state', state);
  return ({
    example: state.example,
    loggedInUser: state.loggedInUser,
    router: state.router
  })
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TesterProfile));