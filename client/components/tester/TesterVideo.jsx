import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../actions';
import ReactPlayer from 'react-player';
import axios from 'axios';
import TesterFinishedVideo from './TesterFinishedVideo.jsx';
import atob from 'atob';
import AWS from 'aws-sdk';
import S3Upload from 's3-bucket-upload';
// import cloudinary from 'cloudinary';
import ToggleDisplay from 'react-toggle-display';
import { Modal, Button } from 'react-bootstrap';
import {Circle} from 'react-shapes';
import Select from 'react-select';

class TesterVideo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      video: {
        url: this.props.currentTesterOption.youtubeUrl,
        name: this.props.currentTesterOption.name,
        desc: this.props.currentTesterOption.description
      },
      complete: false,
      time: {
        0: true
      },
      img: 0,
      show: false,
      key: '',
      height: 0,
      width: 0,
      eyeTime:{
        0: true
      },

    }
    this.videoStart = this.videoStart.bind(this);
    this.getWebcam = this.getWebcam.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.checkVideo = this.checkVideo.bind(this);
    this.processImage = this.processImage.bind(this);
    this.showOverlay = this.showOverlay.bind(this);
    this.likeClick = this.likeClick.bind(this);
    this.processImage = this.processImage.bind(this);
    this.eyeTracking = this.eyeTracking.bind(this);
    // this.upload = this.upload.bind(this);
  }
  componentWillMount() {
  }

  componentDidMount() {

    this.setState({
      height: screen.height,
      width: screen.width
    })
    this.getWebcam();



  }


  componentWillUnmount() {
    // console.log(this);
    clearInterval(this.state.runTimer);
    clearInterval(this.state.eyeTrackingTimer);
    window.webgazer.end();
    // vid.pause();
    // vid.src = "";
    console.log(window.localstream.getTracks());
    console.log(window.localstream.getVideoTracks());
    var video = document.getElementById('video');
    video.pause();
    video.srcObject = null;
    window.localstream.getTracks()[0].stop();
    window.localstream.getVideoTracks()[0].stop();
    window.localstream.getTracks()[0].enabled = false;
    console.log(window.localstream.getTracks());
    console.log(video.srcObject);
    var list = document.getElementById("video"); 
    console.log('LIST', list);
    list.removeChild(list.childNodes[0])
    console.log(list);
    var lists = document.getElementById("videoCanvas"); 
    lists.removeChild(lists.childNodes[0])
    console.log(this);
    window.URL.revokeObjectURL(window.src);
    console.log(this);


  }

  eyeTracking() {
    let prediction = window.webgazer.getCurrentPrediction();
    var video = this.refs.video;
    var time = (Math.round(video.getCurrentTime() * 4) / 4).toFixed(2);
    if (!this.state.eyeTime[time] && prediction) {
      let newPrediction = {};
      newPrediction.x = (prediction.x/this.state.width).toFixed(3);
      newPrediction.y = (prediction.y/this.state.height).toFixed(3);
      this.state.eyeTime[time] = true;
      let sendObj = {
        prediction: newPrediction,
        time: time,
        option: this.props.currentTesterOption
      }
      axios.post('/api/tester/addEyeTracking', sendObj)

    }

  }



  videoStart() {
    window.webgazer.setRegression('ridge')
      .begin()
    axios.post('/api/tester/startVideo', {
      option: this.props.currentTesterOption
    })
    var runTimer = setInterval(() => {
      this.checkVideo()
    }, 1000)

    var eyeTrackingTimer = setInterval(() => {
      this.eyeTracking();
    }, 250)

    this.setState({
      runTimer: runTimer,
      eyeTrackingTimer: eyeTrackingTimer
    }, () => {
      this.state.runTimer();
      this.state.eyeTrackingTimer();
    })

  }

  getWebcam() {
    var width = 320;   
    var height = 300;    

    var streaming = false;

    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var localstream;

    // navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    //   .then(function(stream) {
    //       video.srcObject = stream;
    //       window.localstream = stream;
          
    //       video.play();
    //   })
    //   .catch(function(err) {
    //       console.log("An error occured! " + err);
    //   });
    navigator.webkitGetUserMedia({ video: true, audio: false }, (stream) => {
      // console.log('window.url', window.URL);

      window.src = window.URL.createObjectURL(stream);
      video.src = window.src;
      window.localstream = stream;
      video.play();
    }, function (e) {
      console.log(e);
    })
  }

  takePicture() {
    var canvas = this.refs.canvas;
    var context = canvas.getContext('2d');

    canvas.width = 300;
    canvas.height = 250;
    context.drawImage(video, 0, 0, 300, 250);

    }

  checkVideo() {
    var video = this.refs.video;
    var time = Math.floor(video.getCurrentTime());
    var duration = Math.floor(video.getDuration());
    if (!this.state.time[time]) {
      this.takePicture();
      this.state.time[time] = true;
      this.processImage(time);
    }
  }

  showOverlay() {
    this.setState({
        show: true
      })
  }

  processImage(time) {

    var data = canvas.toDataURL('image/jpeg');

    let currentTesterOption = this.props.currentTesterOption;
    return fetch(data)
      .then(res => res.blob())
      .then(blobData => {
        // Microsoft Post Request
        axios.get('/api/tester/getKey')
          .then(data => {

            var subscriptionKey = data.data[0].key;
            var uriBase = "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?";

            var instance = axios.create({
              headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Content-Type': "application/octet-stream"
              }
            });

            instance.post(uriBase, blobData)
              .then(data => {
                // console.log((JSON.stringify(data.data, null, 2)));
                if (data.data[0]) {
                  let sendObj = {
                    emotions: data.data[0].scores,
                    time: time,
                    option: currentTesterOption
                  }
                  axios.post('/api/tester/sendFrame', sendObj)
                }
                else {
                  let sendObj = {
                    time: time,
                    option: currentTesterOption
                  }
                  axios.post('/api/tester/sendFrame', sendObj)
                }
              })
              .catch(err => {
                console.log(err);
              })
          })
      });
    };
    
  likeClick(e) {
    e.preventDefault();

    axios.post('/api/tester/getVideo', {
      like: e.target.value
    })
    this.setState({
      show: false
    })


  }

  render() {
    var imgStyle = {
      opacity: 0
    }

    var style = {
      height: "75vh"
    }

    return (
      <div style={style}>
        <ToggleDisplay className="overlay"  show={this.state.show}>
          <TesterFinishedVideo />
        </ToggleDisplay>

        <div className="videoPlayer">

          <ReactPlayer  className="videoWrapper" onStart={this.videoStart} onEnded={this.showOverlay} width='100%' height='100%' controls={false} ref="video" url={this.state.video.url} playing />
          <br/>
          <br/>

          <h2> {this.state.video.name} </h2>
          <h4> {this.state.video.desc} </h4>


        </div>


        <div id="videoCanvas">
          <video className="testerVideo" id="video">Video stream not available.</video>
          <canvas className="testerVideo" ref="canvas" id="canvas">
          </canvas>
        </div>

      </div>

    )
  }
}



const mapStateToProps = (state) => {
  return ({
    currentTesterOption: state.currentTesterOption
  })
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ChangeActions, dispatch)
})





export default connect(
  mapStateToProps,
  mapDispatchToProps
  ) (TesterVideo)
