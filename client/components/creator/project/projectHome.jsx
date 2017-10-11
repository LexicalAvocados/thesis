import React from 'react';
import {Link} from 'react-router-dom';
import SectionList from './SectionList.jsx';
import { connect } from 'react-redux';
import axios from 'axios';


class ProjectHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  retrieveSections() {
    axios.get('/api/getRelatedSections', { params: {projectId: 1}})
      .then((res) => {
        console.log('yay'); // The sections we get back should probably just go in local state.
      })
      .catch((err) => {
        console.log('boo');
      })
  }

  testGet() { // set to a component did mount
    this.retrieveSections();
  }

  render() {
    return (
      <div>
        <h2 onClick={this.testGet.bind(this)}>PROJECT NAME</h2>
        <p>PROJECT DESCRIPTION</p>
        <Link to="/projectCreate">Add option</Link>
          {/* Pass sectionId in link*/}
        <SectionList />
        {/* Pass section information to each */}
      </div>
    )
  }
}

export default ProjectHome;
// Dynamically rendered secitons
  // Map through all related sections
    // For each section grab options, pass to section list

