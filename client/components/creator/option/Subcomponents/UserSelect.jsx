import React from 'react';
import axios from 'axios';
import { Form, FormGroup, FormControl, Checkbox, Button } from 'react-bootstrap';

class UserSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempSelectedUsers: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAllUsers = this.toggleAllUsers.bind(this);
  }

  componentDidMount() {
    this.setState({
      tempSelectedUsers: this.props.selectedUsers
    })
  }

  handleChange(userObj) {
    var indOfUser = this.state.tempSelectedUsers.indexOf(userObj);
    var tempArray = this.state.tempSelectedUsers.slice()
    indOfUser > -1 ? tempArray.splice(indOfUser, 1) : tempArray.push(userObj);
    this.setState({
      tempSelectedUsers: tempArray
    }, () => console.log('state after edit', this.state.tempSelectedUsers))
  }

  handleSubmit() {
    //callback with selected users state
    this.props.userSelectCb(this.state.tempSelectedUsers);
    this.props.changeSideNavSelection('overview');
  };

  toggleAllUsers() {
    let currStatus = this.state.tempSelectedUsers.length === this.props.allUsers.length;
    if (currStatus) {
      this.setState({
        tempSelectedUsers: []
      })
    } else {
      this.setState({
        tempSelectedUsers: this.props.allUsers
      })
    }
  }

  render() {
    return (
      <div className='userSelect'>
        <h3> Select viewers </h3>
        <FormGroup>
          <Checkbox bsClass='checkbox'
                    checked={this.state.tempSelectedUsers.length === this.props.allUsers.length}
                    onChange={this.toggleAllUsers}
          >All Testers</Checkbox>
        {this.props.allUsers.map((userObj, i) => (
            <Checkbox bsClass='checkbox'
                      checked={this.state.tempSelectedUsers.reduce((acc, curr) => {
                        acc.push(curr.username); return acc;
                      }, []).includes(userObj.username)}
                      key={i}
                      onChange={() => this.handleChange(userObj)}>
              {userObj.name || userObj.username}
            </Checkbox>
          ))}
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </div>
    )
  }
};

export default UserSelect;
