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

  // handleYouTubeUrl() {

  // }

  submitSectionClick(e) {
    e.preventDefault();
    axios.post('/api/addSection', {
      name: this.state.name,
      description: this.state.description,
      projectId: this.props.currentProject.id
    })
      .then((response) => {
        this.setState({
          name: response.data.name,
          description: response.data.description
        });
        this.props.actions.changeCurrentSection(response.data);
        this.props.actions.addSectionsToCurrentProject(response.data);
        // if (this.props.currentProject.sections) {
        //   this.props.currentProject.sections.push(response.data);
        // } else {
        //   this.props.currentProject.sections = [response.data];
        // }
        this.props.history.push('/addOption');
      })
      .catch((err) => {
        console.error('Request to add new section NOT sent to server!', err);
      });
  }

  render() {
    return (
      <div className="CreateProject">
        <p>{this.props.currentProject.name}</p>
        <h2>Add Section</h2>
        <br/>
        <form onSubmit={this.submitSectionClick}>
          Section Name: <br />
          <input type="text" pattern=".{3,}" required title="3 characters minimum" name="name" value={this.state.name} onChange={this.handleChange} /><br />
          Section Description: <br />
          <input type="text" pattern=".{3,}" required title="3 characters minimum" name="description" value={this.state.description} onChange={this.handleChange} /><br />
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

