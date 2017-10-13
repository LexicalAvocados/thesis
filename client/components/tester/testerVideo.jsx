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
import cloudinary from 'cloudinary';
import ToggleDisplay from 'react-toggle-display';
import { Modal, Button } from 'react-bootstrap';

class TesterVideo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      video: {
        url: null,
        name: '',
        desc: ''
      },
      complete: false,
      time: [0],
      img: [],
      show: false,
      like: true,
      dislike: false
    }

    this.getWebcam = this.getWebcam.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.checkVideo = this.checkVideo.bind(this);
    this.processImage = this.processImage.bind(this);
    this.showOverlay = this.showOverlay.bind(this);
    this.likeClick = this.likeClick.bind(this);
    // this.upload = this.upload.bind(this);
  }

  componentDidMount() {
    console.log(this);
    // window.webgazer.setRegression('ridge')
    //   .setTracker('clmtrackr')
    //   // .setGazeListener((data, clock) => {
    //   //   console.log(data);
    //   //   console.log(clock);
    //   // })
    //   .begin()
    axios.get('/api/tester/getVideo')
      .then((data) => {
        console.log(data);
        this.setState({
          video: {
            url: data.data[0].youtubeUrl,
            name: data.data[0].name,
            desc: data.data[0].description
          }
        })
      })

    this.getWebcam();
    setInterval(() => {
      this.checkVideo()
      // var prediction = window.webgazer.getCurrentPrediction();
      // console.log('prediction', prediction);
      // if (prediction) {
      //     var x = prediction.x;
      //     var y = prediction.y;
      //     console.log('predictions', x, y);
      // }
    }, 3000)


  }

  getWebcam() {
    var width = 320;    // We will scale the photo width to this
    var height = 0;     // This will be computed based on the input stream

    var streaming = false;

    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var photo = document.getElementById('photo');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function(stream) {
          video.srcObject = stream;
          video.play();
      })
      .catch(function(err) {
          console.log("An error occured! " + err);
      });
  }

  takePicture() {
    var canvas = this.refs.canvas;
    var context = canvas.getContext('2d');
      canvas.width = 300;
      canvas.height = 250;
      context.drawImage(video, 0, 0, 300, 250);
      console.log(canvas);
      var data = canvas.toDataURL('image/png');
      // axios.post('/api/tester/sendFrame', data)
      //   .then(res => {
      //     console.log(res);
      //   })
      // var realData = data.replace(/^data:image\/(png|jpg);base64,/, "");
      // var dataTest = data.split(',')[1];
      // var mimeType = data.split(';')[0].slice(5);

      // var bytes = window.atob(dataTest);
      // var buf = new ArrayBuffer(bytes.length);
      // var byteArr = new Uint8Array(buf);
      // axios.post('https://requestb.in/wpray0wp', byteArr);
      // console.log(data);
      fetch(data)
        .then(res => res.blob())
        .then(data => this.state.img.push(data));
      var photo = this.refs.photo;
      photo.setAttribute('src', data);
      console.log(photo)
  }

  checkVideo() {
    var video = this.refs.video;
    var time = Math.floor(video.getCurrentTime());
    var duration = Math.floor(video.getDuration());
    if (!this.state.time.includes(time)) {
      console.log(time);
      this.takePicture();
      this.state.time.push(time);
      this.processImage(time);
    }

  }

  showOverlay() {
    this.setState({
        show: true
      })
  }

  // upload(img) {
  //   cloudinary.config({
  //     cloud_name: 'dcp74bsm8',
  //     api_key: '169847461734926',
  //     api_secret: 'Gqk2mNBC1D8q3LJQe0b1fLokn-Y'
  //   });
  //   cloudinary.uploader.upload(
  //     img,
  //     function(res) {
  //       console.log('res from cloudinary', res)
        // Microsoft Post Request
        // var subscriptionKey = "4fc26d1500d04025a699f1ae74597ab3";
        // var uriBase = "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?";
        // // var uriBase = "https://requestb.in/1ijcwry1";

        // // axios.get(uriBase);

        // // axios.post(uriBase, {data: byteArr});
        // // var instance = axios.create({
        // //   headers: {
        // //     "Content-Type" : "application/octet-stream"
        // //   }
        // // });
        // // instance.post('https://requestb.in/wpray0wp', byteArr);

        // // var url ='https://requestb.in/zdz1bczd'
        // // request(url, function (error, response, body) {
        // //   if (!error) {
        // //     console.log(body);
        // //   }
        // // });

        // // Request parameters.
        // var params = {
        //   "returnFaceId": "true",
        //   "returnFaceLandmarks": "false",
        //   "returnFaceAttributes": "emotion",
        // };

        // $.ajax({
        //     url: uriBase + "?" + $.param(params),
        //     // url: uriBase,

        //     // Request headers.
        //     beforeSend: function(xhrObj){
        //         xhrObj.setRequestHeader("Content-Type", "application/json");
        //         // xhrObj.setRequestHeader("Access-Control-Allow-Origin", "*");
        //         xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        //     },

        //     type: "POST",

        //     // Request body.
        //     data: '{"url": ' + '"' + res.url + '"}'
        //     //processData: false,
        // })

        // .done(function(data) {
        //     // Show formatted JSON on webpage.
        //     console.log('data', data)
        //     console.log((JSON.stringify(data, null, 2)));
        // })

        // .fail(function(jqXHR, textStatus, errorThrown) {
        //     // Display error message.
        //     var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        //     errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
        //         jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
        //     alert(errorString);
        // });


  //     }
  //   )
  // }

  processImage(time) {


        var canvas = this.refs.canvas;
        // DOM element data Uri
        var data = canvas.toDataURL('image/jpeg');

        // pure base64 data
        // var realData = data.replace(/^data:image\/(png|jpg);base64,/, "")
        
        // // blob data
        // var blobData = this.state.img[0];

        // // file format
        // var file = new File([blobData], 'test');

        // // form format
        // var fd = new FormData();
        // fd.append('data', blobData);

        // console.log('file format', file);
        // console.log('blob format', blobData);
        // console.log('form data', fd);

        // // test to see if image about to send is the correct one
        // var test = this.refs.test;
        // test.setAttribute('src', data);

        // var dataTest = data.split(',')[1];
        // var mimeType = data.split(';')[0].slice(5);

        // var bytes = window.atob(dataTest);
        // var buf = new ArrayBuffer(bytes.length);
        // var byteArr = new Uint8Array(buf);

        // for (var i = 0; i < bytes.length; i++) {
        //   byteArr[i] = bytes.charCodeAt(i);
        // }
        fetch(data) 
          .then(res => res.blob())
          .then(blobData => {
            // Microsoft Post Request
            var subscriptionKey = "4fc26d1500d04025a699f1ae74597ab3";
            var uriBase = "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?";
            // var uriBase = "https://requestb.in/1ijcwry1";

            // axios.get(uriBase);

            // axios.post(uriBase, {data: byteArr});
            // var instance = axios.create({
            //   headers: {
            //     "Content-Type" : "application/octet-stream"
            //   }
            // });
            // instance.post('https://requestb.in/wpray0wp', byteArr);

            // var url ='https://requestb.in/zdz1bczd'
            // request(url, function (error, response, body) {
            //   if (!error) {
            //     console.log(body);
            //   }
            // });

            // Request parameters.
            var params = {
              "returnFaceId": "true",
              "returnFaceLandmarks": "false",
              "returnFaceAttributes": "emotion",
            };

            $.ajax({
                // url: uriBase + "?" + $.param(params),
                url: uriBase,

                // Request headers.
                beforeSend: function(xhrObj){
                    xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                    // xhrObj.setRequestHeader("Access-Control-Allow-Origin", "*");
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
                },

                type: "POST",

                // Request body.
                data: blobData,
                processData: false,
            })

            .done(function(data) {
                // Show formatted JSON on webpage.
                console.log((JSON.stringify(data, null, 2)));

                let sendObj = {
                  emotions: data[0].scores,
                  time: time
                }

                axios.post('/api/tester/sendFrame', sendObj)
                  .then(res => {
                    console.log(res);
                  })
            })

            .fail(function(jqXHR, textStatus, errorThrown) {
                // Display error message.
                var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
                errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                    jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
                alert(errorString);
            });
          });

        //var dataBlob = canvas.toBlob()
        // console.log('byteArr', byteArr);
        // this.state.img[0] = byteArr;



        // Kairos post request
        // var instance = axios.create({
        //   timeout: 5000,
        //   headers: {
        //     "Content-Type" : "application/x-www-form-urlencoded",
        //     "app_id": '87bbd5b0',
        //     "app_key": '113158cf12ebfe904380eff729e99034'
        //   }
        // });

        // instance.post('https://api.kairos.com/v2/media', {
        //   source: fd
        // })
        //   .then(res => console.log(res))
        //   .catch(err => console.log(err))

        // var uriBase = 'https://requestb.in/wpray0wp';

        // axios.post(uriBase, byteArr);


        // instance.get('https://api.kairos.com/v2/analytics/59dfc67f3f273')
        //   .then(res => console.log(res))

      // let s3Upload = new S3Upload(AWS, {
      //   Bucket: 'reaction-sync',
      //   // region: [String],
      //   // PoolId: [String],
      //   // IdentityPoolId: [String],
      //   // idToken: [String],
      //   // dirName: [String],
      //   // existingObjectUrl: [String],
      //   onError: (err) => {
      //     console.log('error')
      //   },
      //   onSuccess: (data) => {
      //     console.log('success');
      //   }
      // });

      // s3Upload.uploadBase64(data, 'test.png');

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

    return (
      <div>
        <ToggleDisplay className="overlay"  show={this.state.show}>
          <h1> Finished </h1> 
          <TesterFinishedVideo />
          <button value={this.state.like} onClick={this.likeClick} > like </button>
          <button value={this.state.dislike} onClick={this.likeClick} > dislike </button>
        </ToggleDisplay>

        <h2> Test Video </h2>
        <ReactPlayer onEnded={this.showOverlay} controls={true} ref="video" url={this.state.video.url || 'https://www.youtube.com/watch?v=OpI2fqXDh1w'} playing />
        <h2> {this.state.video.name} </h2>
        <h4> {this.state.video.desc} </h4>
        <div class="camera">  
          <video style={imgStyle} id="video">Video stream not available.</video>
        </div>


        <canvas style={imgStyle} ref="canvas" id="canvas">
        </canvas>
        <div class="output">
          <img style={imgStyle} ref="photo" id="photo" alt="The screen capture will appear in this box."/>
          <img style={imgStyle} ref="test" alt="The screen capture will appear in this box."/>
        </div>
      </div>

    )
  }
}



const mapStateToProps = (state) => {
  console.log('state', state);
  return ({

  })
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ChangeActions, dispatch)
})





export default connect(
  mapStateToProps,
  mapDispatchToProps
  ) (TesterVideo)
