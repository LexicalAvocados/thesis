import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../../actions';
import { Button } from 'react-bootstrap';

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitProjectClick = this.submitProjectClick.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    var name = e.target.name;
    var val = e.target.value;
    this.setState({
      [name]: val
    });
  }

  submitProjectClick(e) {
    e.preventDefault();
    axios.post('/api/createProject', {
      name: this.state.name,
      description: this.state.description
    })
      .then((response) => {
        // console.log('response', response)
        if (this.props.fromDashboard) {
          this.props.getProjectsFromDatabase(true);
          this.props.close();
        } else {
          // console.log('this.props.fromDashboard', this.props.fromDashboard);
          this.props.history.push('/');
        }
      })
      .catch((err) => {
        console.error('Request to create new project NOT sent to server!', err);
      });
  }

  render() {
    const fromDashboard = this.props.fromDashboard;
    let header = null;
    if (!fromDashboard) {
      header = <h3>Create A Project</h3>;
    } else if (fromDashboard && this.props.inDemo === 0) {
      header = <p>Creating a project will end the demo. Make sure you have checked out sections and options before creating a project</p>
    }

    return (
      <div className="CreateProject">
        <form onSubmit={this.submitProjectClick}>
          {header}
          { this.props.currentProject.id === 0 ? (
            <p>Creating a project will end the demo. Make sure you have checked out sections and options before creating a project</p>
          ) : (
            null
          )}
          Project Name: <br />
          <div className="ProjectNameInput">
            <input type="text" pattern=".{3,}" required title="3 characters minimum" name="name" value={this.state.name} onChange={this.handleChange} /><br />
          </div>
          Project Description: <br />
          <div className="ProjectDescriptionInput">
            <textarea type="text" pattern=".{3,}" required title="3 characters minimum" name="description" value={this.state.description} onChange={this.handleChange} /><br />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return({
    router: state.router,
    currentProject: state.currentProject
  });
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
) (CreateProject));

