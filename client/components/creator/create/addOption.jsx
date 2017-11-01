import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../../actions';
import ThumbnailListInAddOption from '../option/thumbnail/ThumbnailListInAddOption.jsx';
import { youtube } from '../../../../key.js';

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      url:'',
      thumbnails:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitOptionClick = this.submitOptionClick.bind(this);
    this.completeSubmitionsClick = this.completeSubmitionsClick.bind(this);
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

  // retrieveVimeoData(cb) {
  //   var vimeoData = {};
  //   var vidUrl = this.state.url;
  //   axios.get('https://api.vimeo.com/oauth/authorize', {
  //     params: {
        
  //     }
  //   });
  // }


  retrieveYouTubeData(cb) {
    var youTubeData = {};
    var vidUrl = this.state.url;
    var sliceFrom = this.state.url.indexOf('=');
    var vidId = vidUrl.slice(sliceFrom + 1, sliceFrom + 12);
    axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        id: vidId,
        part: 'snippet, contentDetails',
        type: 'video',
        key: youtube.APIKey
      }
    })
      .then((data) => {
        // console.log('response from youtube', data);
        youTubeData.thumbnail = data.data.items[0].snippet.thumbnails.default.url;
        youTubeData.tags = data.data.items[0].snippet.tags;
        // console.log('youtubeData>>>>>>', youTubeData);
        // console.log('youtubeData.tags>>>>>>', youTubeData.tags);
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
    if (this.props.currentProject.id === 0) {
      alert('You cannot create new options within the demo. If you\'d like to leave the demo please create a project.');
      return;
    } 

    // conditional: if this.state.url === 'vimeo' => use retrieveVimeoData
    // need to change: how link is generated, thumbnails, tags...

    this.retrieveYouTubeData((youTubeData) => {
      // console.log(youTubeData);
      axios.post('/api/addOption', {
        name: this.state.name,
        description: this.state.description,
        url: this.state.url,
        sectionId: this.props.currentSection.id,
        thumbnail: youTubeData.thumbnail,
        length: youTubeData.length,
        tags: youTubeData.tags
      })
        .then((response) => {
          this.setState({
            name: response.data.name,
            description: response.data.description,
            url: response.data.url
          }, () => {
            this.props.currentSection.options.unshift(response.data);
            this.props.actions.addOptionsToCurrentSection(this.props.currentSection.options);
          });
        })
        .catch((err) => {
          console.error('Request to add new option NOT sent to server!', err);
        });
    });
  }

  completeSubmitionsClick(e) {
    e.preventDefault();
    // this.props.history.push('/project' + `${this.props.currentProject.id}`);
    this.props.close();
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
      <div>
        <div className="AddOption">
          <h2>Section Name: {this.props.currentSection.name}</h2>
          <h4>Section Description: {this.props.currentSection.description}</h4>
          <form id="optionForm" onSubmit={this.submitOptionClick}>
            New Option Name: <br />
            <input type="text" pattern=".{3,}" required title="3 characters minimum" name="name" value={this.state.name} onChange={this.handleChange} /><br />
            Option Description: <br />
            <input type="text" pattern=".{3,}" required title="3 characters minimum" name="description" value={this.state.description} onChange={this.handleChange} /><br />
            Url: <br />
            <input type="url" pattern=".{15,}" required title="15 characters minimum" name="url" placeholder="https://www.example.com" value={this.state.url} onChange={this.handleChange} /><br />
            <input type="submit" value="Submit New Option" /><br />
          </form>
          <Button onClick={this.completeSubmitionsClick}>Complete Submitions</Button><br />
        </div>
        <div className="ThumbnailListInAddOption">
          { this.props.currentSection.options.map((option, i) => (
            <ThumbnailListInAddOption
              option={option}
              key={i}
              index={i}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  router: state.router,
  currentProject: state.currentProject,
  currentSection: state.currentSection
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOption));
