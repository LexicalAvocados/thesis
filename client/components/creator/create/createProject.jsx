import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../../actions';

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
        this.setState({
          name: response.data.name,
          description: response.data.description
        });
        this.props.actions.changeCurrentProject(response.data);
        this.props.history.push('/addSection');
      })
      .catch((err) => {
        console.error('Request to create new project NOT sent to server!', err);
      });
  }

  render() {
    return (
      <div className="CreateProject">
        <h2>Create Project</h2>
        <form onSubmit={this.submitProjectClick}>
          Project Name: <br />
          <input type="text" pattern=".{3,}" required title="3 characters minimum" name="name" value={this.state.name} onChange={this.handleChange} /><br />
          Project Description: <br />
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

