import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../../actions';

class AddSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitSectionClick = this.submitSectionClick.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    var name = e.target.name;
    var val = e.target.value;
    this.setState({
      [name]: val
    });
  }

  submitSectionClick(e) {
    e.preventDefault();
    if (this.props.currentProject.id === 0) {
      alert('Got ya! You cannot actually create new sections within the demo. When you want to leave the demo, please create a new project.');
      return;
    } 
    axios.post('/api/addSection', {
      name: this.state.name,
      description: this.state.description,
      projectId: this.props.currentProject.id
    })
      .then((response) => {
        this.props.actions.changeCurrentSection(response.data);
        this.props.actions.addSectionsToCurrentProject(response.data); 
        this.props.splitSections();
        this.props.close();
        
      })
      .catch((err) => {
        console.error('Request to add new section NOT sent to server!', err);
      });
  }

  render() {
    return (
      <div className="CreateProject">
        <h2>Project Title: {this.props.currentProject.name}</h2>
        <h4>Project Description: {this.props.currentProject.description}</h4>
        <br/>
        <form onSubmit={this.submitSectionClick}>
          New Section Name: <br />
          <div className="SectionNameInput">
            <input type="text" pattern=".{3,}" required title="3 characters minimum" name="name" value={this.state.name} onChange={this.handleChange} /><br />
          </div>
          Section Description: <br />
          <div className="SectionDescriptionInput">
            <textarea type="text" pattern=".{3,}" required title="3 characters minimum" name="description" value={this.state.description} onChange={this.handleChange} /><br />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return({
    router: state.router,
    currentProject: state.currentProject,
    currentSection: state.currentSection
  });
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
) (AddSection));

