import React from 'react';
import axios from 'axios';
import { Form, FormControl, Button, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

// React-Redux connect() boilerplate
// NOTE: you may have to modify the filepath for ChangeActions
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../../actions';

class FocusGroupsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typedFocusGroupName: '',
      typedTesterUsername: ''
    }
    this.updateTypedTesterUsername = this.updateTypedTesterUsername.bind(this);
    this.updateTypedFocusGroupName = this.updateTypedFocusGroupName.bind(this);
    this.createNewFocusGroup = this.createNewFocusGroup.bind(this);
    this.deleteFocusGroup = this.deleteFocusGroup.bind(this);
    this.addTesterToFocusGroup = this.addTesterToFocusGroup.bind(this);
    this.removeTesterFromFocusGroup = this.removeTesterFromFocusGroup.bind(this);
  }

  updateTypedTesterUsername(e) {
    this.setState({typedTesterUsername: e.target.value});
  }

  updateTypedFocusGroupName(e) {
    this.setState({typedFocusGroupName: e.target.value})
  }

  createNewFocusGroup(e) {
    e.preventDefault();
    axios.post('/api/creator/newFocusGroup', {
      focusGroupName: this.state.typedFocusGroupName,
      creatorUsername: this.props.loggedInUser.username
    })
      .then(res => {
        this.props.actions.addFocusGroup(res.data.name);
        this.setState({typedFocusGroupName: ''});
      })
  }

  deleteFocusGroup() {
    axios.put('/api/creator/deleteFocusGroup', {
      focusGroupName: this.props.currentFocusGroup,
      creatorUsername: this.props.loggedInUser.username
    })
      .then(res => {
        if (res.data) this.props.actions.deleteFocusGroup(this.props.currentFocusGroup.name);
        else console.log('Error deleting Focus Group');
      })
      .catch(err => {
        console.log('Error deleting Focus Group:', err);
      });
  }

  addTesterToFocusGroup(e) {
    e.preventDefault();
    let focusGroupName = this.props.currentFocusGroup.name;
    let testerUsername = this.state.typedTesterUsername;
    axios.post('/api/creator/addToFocusGroup', {
      focusGroupName,
      testerUsername
    })
      .then(res => {
        if (res.data) this.props.actions.addTesterToFocusGroup(focusGroupName, testerUsername);
        else console.log('Error associating Tester with Focus Group:', res);
        this.setState({typedTesterUsername: ''});
      })
      .catch(err => {
        console.log('Error adding Tester to Focus Group:', err);
      });
  }

  removeTesterFromFocusGroup(tester) {
    let focusGroupName = this.props.currentFocusGroup.name;
    let testerUsername = tester;
    axios.put('/api/creator/removeFromFocusGroup', {
      focusGroupName,
      testerUsername
    })
      .then(res => {
        if (res.data) this.props.actions.removeTesterFromFocusGroup(focusGroupName, testerUsername);
        else console.log('Error removing Tester from Focus Group');
      })
      .catch(err => {
        console.log('Error removing Tester from Focus Group:', err);
      });
  }

  render() {
    let focusGroups = this.props.focusGroups;
    let currentFocusGroup = this.props.currentFocusGroup;
    return (
      <div>
        <h2>Create New Focus Group</h2>
        <form onSubmit={this.createNewFocusGroup}>
          <FormControl
            type='text'
            value={this.state.typedFocusGroupName}
            placeholder='Focus Group Name'
            onChange={this.updateTypedFocusGroupName}
          />
          <Button bsStyle='primary' type='submit'>Create Group</Button>
        </form>

        {focusGroups.length > 0 ?
          (<div>
            <h2>Your Focus Groups</h2>
            <div>
              <ButtonToolbar>
                <ToggleButtonGroup
                  type='radio'
                  name='focusGroups'
                  value={focusGroups[focusGroups.indexOf(currentFocusGroup)]}
                  onChange={(e) => this.props.actions.changeCurrentFocusGroup(e, focusGroups)}
                >
                  {focusGroups.map((group, i) => (
                    <ToggleButton key={i} value={i}>{group.name}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </ButtonToolbar>
            </div>
          </div>)
        :
          null}

        {currentFocusGroup ?
          <div>

            <div>
              <Button bsStyle='danger' onClick={this.deleteFocusGroup}>Delete Focus Group</Button>
            </div>

            <h2>Add Tester to {currentFocusGroup.name}</h2>

            <form onSubmit={this.addTesterToFocusGroup}>
              <FormControl
                type='text'
                value={this.state.typedTesterUsername}
                placeholder='Tester Username'
                onChange={this.updateTypedTesterUsername}
              />
              <Button bsStyle='primary' type='submit'>Add Tester</Button>
            </form>

            <h2>{currentFocusGroup.name} Members</h2>

            {currentFocusGroup.testers.length > 0 ?
              <ul>
                {currentFocusGroup.testers.map((tester, i) => (
                  <li key={i} onClick={this.removeTesterFromFocusGroup.bind(null, tester)}>{tester}</li>
                ))}
              </ul>
            :
              'none'}

          </div>
        :
            null}

      </div>
    )
  }
}

// React-Redux connect() boilerplate
// 1. Include the properties in the Store you want this component to have access to
// 2. Change the Component name at the very end to the one in the current file
const mapStateToProps = (state) => ({
  loggedInUser: state.loggedInUser,
  focusGroups: state.focusGroups,
  currentFocusGroup: state.currentFocusGroup,
  router: state.router
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(FocusGroupsPage));