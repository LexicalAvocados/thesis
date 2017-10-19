import React from 'react';
import InviteTesters from './InviteTesters.jsx';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class InvitationPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ageSelected: false,
      sexSelected: false,
      raceSelected: false,
      invited: []
    };
    // this.renderPanel = this.renderPanel.bind(this);
    this.selectAge = this.selectAge.bind(this);
    this.selectSex = this.selectSex.bind(this);
    this.selectRace = this.selectRace.bind(this);
    this.filterTesters = this.filterTesters.bind(this);
    this.handleInvites = this.handleInvites.bind(this);
    this.sendInvites = this.sendInvites.bind(this);
    this.inviteAll = this.inviteAll.bind(this);
  }


  // renderPanel() {
  //   this.setState({
  //     displayPanel: !this.state.displayPanel
  //   });
  // }

  handleInvites(event, index) {
    if (event.target.checked) {
      this.setState({
        invited: [...this.state.invited, this.props.testersCopy[index]]
      });
    } else { // Uninvited
      var removed = this.state.invited.slice(index, 1);
      this.setState({
        invited: removed
      });   
    }
  }

  sendInvites(e, invited) { 
    if (e) {
      e.preventDefault();
    }
    axios.post('/api/sendEmails', { invitedArr: invited, options: this.props.options })
      .then((success) => {
        console.log(success);
        this.props.renderInvited();
      })
      .catch((failure) => {
        console.log('Invites NOT sent', failure);
      })
  }

  inviteAll() {
    console.log(this.props.testersCopy);
    this.setState({ 
      invited: this.props.testersCopy
    }, this.sendInvites(null, this.props.testersCopy));
  }


  selectAge(event) { 
    var filtered = this.filterTesters('age', event);
    this.setState({
      ageSelected: event
    });
    this.props.changeTestersCopy(filtered);
  }

  selectSex(event) {
    var filtered = this.filterTesters('sex', event);
    this.setState({
      sexSelected: event
    });
    this.props.changeTestersCopy(filtered);
  }

  selectRace(event) { // Can't test at the moment
    var filtered = this.filterTesters('race', event);
    this.setState({
      raceSelected: event
    });
    this.props.changeTestersCopy(filtered);
  }

  filterTesters(criteria, toFilterBy) {
    var filtered = [];
    // SEX
    if (criteria === 'sex' || this.state.sexSelected) {
      if (criteria === 'sex' && toFilterBy === 'None') {
        filtered = this.props.testers.map((tester) => {
          return tester;
        });
      } else if (criteria === 'sex') { // Catch for filtering by sex directly
        filtered = this.props.testers.filter((tester) => {
          if (tester.sex === toFilterBy) return tester;
        });
      } else if (this.state.sexSelected !== 'None') { // Catch for filtering by sex indirectly
        filtered = this.props.testers.filter((tester) => {
          if (tester.sex === this.state.sexSelected) return tester;
        });
      } else if (this.state.sexSelected === 'None') { // Catch for filtering by sex indirectly
        filtered = this.props.testers.map((tester) => {
          return tester;
        });
      }
    }
    // RACE FIX THIS
    if (criteria === 'race' || this.state.raceSelected) {
      if (criteria === 'race' && toFilterBy === 'None'  && this.state.sexSelected) {
        filtered = filtered.map((tester) => {
          return tester;
        });
      } else if (criteria === 'race' && this.state.sexSelected) { // Catch for filtering by race directly, with previosly selected sex. 
        filtered = filtered.filter((tester) => {
          if (tester.race === toFilterBy) return tester;
        });
      } else if (criteria === 'race' && toFilterBy !== 'None') { // Catch for filtering by race directly and alone.
        filtered = this.props.testers.filter((tester) => {
          if (tester.race === toFilterBy) return tester;
        });
      } else if (criteria === 'race' && toFilterBy === 'None') { // Catch for filtering by race directly and alone.
        filtered = this.props.testers.map((tester) => {
          return tester;
        });
      } else if (this.state.raceSelected && this.state.raceSelected !== 'None') { // Catch for filtering by race indirectly without sex set. 
        filtered = filtered.filter((tester) => {
          if (tester.race === this.state.raceSelected) return tester;
        });
      } else if (this.state.raceSelected === 'None') { // Catch for filtering by race indirectly without sex set. 
        filtered = filtered.map((tester) => {
          return tester;
        });
      }
    }
    // AGE
    if (criteria === 'age' || this.state.ageSelected) {
      if (criteria === 'age' && toFilterBy === 'None'  && (this.state.sexSelected || this.state.raceSelected)) {
        filtered = filtered.map((tester) => {
          return tester;
        });
      } else if (criteria === 'age' && toFilterBy === 'None' && (this.state.sexSelected || this.state.raceSelected)) { // Filtering by age with sex and race selected
        let index = toFilterBy.indexOf('-');
        let first = toFilterBy.slice(0, index);
        let second = toFilterBy.slice(index + 1);
        filtered = filtered.filter((tester) => {
          if (tester.age >= JSON.parse(first) && tester.age <= JSON.parse(second)) return tester;
        });
      } else if (criteria === 'age'  && toFilterBy !== 'None') { // filtering by age directly
        let index = toFilterBy.indexOf('-');
        let first = toFilterBy.slice(0, index);
        let second = toFilterBy.slice(index + 1);
        filtered = this.props.testers.filter((tester) => {
          if (tester.age >= JSON.parse(first) && tester.age <= JSON.parse(second)) return tester;
        });
      } else if (criteria === 'age' && toFilterBy === 'None') {
        filtered = this.props.testers.map((tester) => {
          return tester;
        });
      } else if (this.state.ageSelected && this.state.ageSelected !== 'None') { // filter by age indirectly
        let index = this.state.ageSelected.indexOf('-');
        let first = this.state.ageSelected.slice(0, index);
        let second = this.state.ageSelected.slice(index + 1);
        filtered = filtered.filter((tester) => {
          if (tester.age >= JSON.parse(first) && tester.age <= JSON.parse(second)) return tester;
        });
      } else if (this.state.ageSelected === 'None') { // Catch for filtering by race indirectly without sex set. 
        filtered = filtered.map((tester) => {
          return tester;
        });
      } 
    }
    return filtered;
  }

  render() {
    return (
      <div className="invitationPanel">
        <div className="invitationPanelSelectors">
          <p>Age:</p>
          <DropdownButton onSelect={this.selectAge} id="dropdown-btn-menu" title={this.state.ageSelected || 'Select an age'}>
            <MenuItem eventKey="None">None</MenuItem>
            <MenuItem eventKey="0-10">0-10</MenuItem>
            <MenuItem eventKey="11-20">11-20</MenuItem>
            <MenuItem eventKey="21-30">21-30</MenuItem>
            <MenuItem eventKey="31-40">31-40</MenuItem>
            <MenuItem eventKey="41-50">41-50</MenuItem>
            <MenuItem eventKey="51-60">51-60</MenuItem>
            <MenuItem eventKey="61-70">61-70</MenuItem>
            <MenuItem eventKey="71-80">71-80</MenuItem>
            <MenuItem eventKey="81-90">81-90</MenuItem>
            <MenuItem eventKey="91-100">91-100 Impressive!</MenuItem>
          </DropdownButton>
        </div>
        <br/>
        <div className="invitationPanelSelectors">
          <p>Sex:</p>
          <DropdownButton onSelect={this.selectSex} id="dropdown-btn-menu" title={this.state.sexSelected || 'Select a sex'}>
            <MenuItem eventKey="None">None</MenuItem>
            <MenuItem eventKey="Male">Male</MenuItem>
            <MenuItem eventKey="Female">Female</MenuItem>
          </DropdownButton>
        </div>
        <br/>
        <div className="invitationPanelSelectors">
          <p>Race:</p>
          <DropdownButton onSelect={this.selectRace} id="dropdown-btn-menu" title={this.state.raceSelected || 'Select a race'}>
            <MenuItem eventKey="None">None</MenuItem>
            <MenuItem eventKey="Caucasian">Caucasian</MenuItem>
            <MenuItem eventKey="Hispanic">Hispanic</MenuItem>
            <MenuItem eventKey="African American">African American</MenuItem>
            <MenuItem eventKey="Asian">Asian</MenuItem>
            <MenuItem eventKey="Pacific Islander">Pacific Islander</MenuItem>
            <MenuItem eventKey="Native American">Native American</MenuItem>
            <MenuItem eventKey="Other">Other</MenuItem> 
          </DropdownButton>
        </div>
        <div className="testersList">
          <form onSubmit={() => this.sendInvites(this.state.invited)}>
              <InviteTesters 
                totalTesters={this.props.testersCopy.length}
              />
            {/* <Button type="submit">Send Invites</Button> */}
            <Button onClick={this.inviteAll}>Invite Testers</Button>
            <Button onClick={this.props.renderPanel}>Close Invites Panel</Button>
          </form>
        </div>
      </div>
    );
  }
  
};

export default InvitationPanel;