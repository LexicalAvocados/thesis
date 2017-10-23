import React from 'react';
import ProjectList from './ProjectList.jsx';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../../actions';


class DashboardHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      retrieved: false
    };
    this.onProjectClick = this.onProjectClick.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  componentDidMount() {
    axios.get('/api/getProjectsForUser', {params: { username: this.props.loggedInUser.username }})
      .then((response) => {
        // console.log(response.data);
        let sortedProjects = response.data.sort((one, two) => {
          if (one.createdAt < two.createdAt) return 1;
          if (one.createdAt > two.createdAt) return -1;
        });
        console.log(sortedProjects);
        this.setState({
          projects: sortedProjects,
          retrieved: true
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }


  onProjectClick(obj, sections) {
    obj['sections'] = sections;
    this.props.actions.changeCurrentProject(obj);
  }

  deleteProject(id) {
    let filteredProjects = this.state.projects.filter((project) => {
      if (project.id !== id) return project
    })
    axios.delete('/api/deleteProject', { params: {projectId: id, toDelete: 'id'}})
    .then((response) => {
      // console.log(response);
      this.setState({
        projects: filteredProjects
      })
    })
    .catch((err) => {
      console.log('Error deleting project', err);
    })
  }

  render () {
    return (
      <div className="dashboardHomeContainer">
        <h2>Projects</h2>
        <hr/>
        <br/>
        { this.state.retrieved ? (
          this.state.projects.length ? (
            <div>
              { this.state.projects.map((project, i) => (
                <ProjectList
                  onProjectClick={this.onProjectClick}
                  deleteProject={this.deleteProject}
                  project={project}
                  key={i}
                />
              ))}
            </div>
          ) : (
            <div>
              <p>Welcome Good Sir/Lady, you do not currently have any projects!</p>
              <p>Why don't you click the 'Create Projects' button in the Navigation Bar and start doing something with your life!</p>
            </div>
          )
        ) : (
          null
        )}

      </div>
    );
  }
}



const mapStateToProps = (state) => {
  console.log('LOG WITHIN DASHBOARD', state);
  return ({
    router: state.router,
    currentProject: state.currentProject,
    loggedInUser: state.loggedInUser
  });
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (DashboardHome);
