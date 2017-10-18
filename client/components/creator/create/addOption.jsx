import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../../actions';
import key from './key.js';

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      url:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitOptionClick = this.submitOptionClick.bind(this);
    this.retrieveYouTubeData = this.retrieveYouTubeData.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    var name = e.target.name;
    var val = e.target.value;
    this.setState({
      [name]: val
    });
  }

  retrieveYouTubeData(cb) {
    var youTubeData = {};
    var vidUrl = this.state.url;
    var sliceFrom = this.state.url.indexOf('=');
    var vidId = vidUrl.slice(sliceFrom + 1);
    axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
      params: {
        id: vidId,
        part: 'snippet, contentDetails',
        type: 'video',
        key: key
      }
    })
      .then((data) => {
        console.log('response from youtube', data);
        youTubeData.thumbnail = data.data.items[0].snippet.thumbnails.default.url;
        youTubeData.tags = data.data.items[0].snippet.tags;
        var unitsOfTime = ['H', 'M', 'S'];
        var nums = [];
        for (var i = 0; i < unitsOfTime.length; i++) {
          var num = this.convert(data.data.items[0].contentDetails.duration, unitsOfTime[i]);
          if (i === 0 && num) {
            num = num*60*60;
            nums.push(num);
          } else if (i === 1 && num) {
            num = num*60;
            nums.push(num);
          } else if (i === 2 && num) {
            nums.push(num);
          }
        }
        nums = nums.reduce((acc, cur) => {
          return acc + cur;
        });
        youTubeData.length = nums;
        cb(youTubeData);
      })
      .catch((err) => console.error('error in youtube', err));
  }

  submitOptionClick(e) {
    e.preventDefault();
    this.retrieveYouTubeData((youTubeData) => {
      axios.post('/api/addOption', {
        name: this.state.name,
        description: this. state.description,
        url: this.state.url,
        sectionId: this.props.currentSection.id,
        thumbnail: youTubeData.thumbnail,
        length: youTubeData.length,
        tags: youTubeData.tags
      })
        .then((response) => {
          this.setState({
            name: response.data.name,
            description: response.data.description
          }, () => {
            // this.props.actions.changeCurrentOption(response.data);
            this.props.actions.addOptionsToCurrentSection(response.data);
            this.props.history.push('/project' + this.props.currentProject.id);
          });

        })
        .catch((err) => {
          console.error('Request to add new option NOT sent to server!', err);
        });
    });
  }


  convert(string, sequence) {
    for (var i = string.length - 1; i >= 0; i--) {
      if (string[i] === sequence) {
        var num = '';
        var last = string[i - 1];
        if (!isNaN(string[i - 2])) {
          var first = string[i -2];
          return Number(num = first + last);
        } else {
          return Number(num = last);
        }
      }
    }
  }


  render() {
    return (
      <div className="AddOption">
        <p>{this.props.currentSection.name}</p>
        <h2>Add Option</h2>
        <form onSubmit={this.submitOptionClick}>
        Option Name: <br />
          <input type="text" pattern=".{3,}" required title="3 characters minimum" name="name" value={this.state.name} onChange={this.handleChange} /><br />
          Option Description: <br />
          <input type="text" pattern=".{3,}" required title="3 characters minimum" name="description" value={this.state.description} onChange={this.handleChange} /><br />
          Url: <br />
          <input type="text" name="url" value={this.state.url} onChange={this.handleChange} /><br />
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
) (AddOption));



