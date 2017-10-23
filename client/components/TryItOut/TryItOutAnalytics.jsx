import React from 'react';
import c3 from 'c3';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../actions';
import axios from 'axios';
import pad from 'array-pad';

import SideBar from '../creator/option/SideBar.jsx';
import Overview from '../creator/option/Subcomponents/Overview.jsx';
import Attention from '../creator/option/Subcomponents/Attention.jsx';
import Demographics from '../creator/option/Subcomponents/Demographics.jsx';
import Emotion from '../creator/option/Subcomponents/Emotion.jsx';
import Feedback from '../creator/option/Subcomponents/Feedback.jsx';
import UserSelect from '../creator/option/Subcomponents/UserSelect.jsx';
import Annotations from '../creator/option/Subcomponents/Annotation.jsx';
import DetailedDemographics from '../creator/option/Subcomponents/DetailedDemographics.jsx';

import TryItOutVideo from './TryItOutVideo.jsx';

class TryItOutAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {name: 'blobbert', age: '26', gender: 'male'},
      attention: [['Attention', 0, 0.5, 1, 1, 0.7, 0.8, 0.8, 0.5, 0.2, 0.6, 1, 1, 0.8, 0.5, 0.7, 1, 1, 0.9, 0.8, 0.9, 0.8,
                  0.75, 0.6, 0.4, 0.3, 0.34, 0.4, 0.6, 0.7, 0.8, 0.8, 0.6, 0.7, 0.4, 0.2, 0.36, 0.56, 0.7, 0.8, 0.7, 0.6,
                  0.6, 1, 1, 0.8, 0.5, 0.7, 1, 1, 0.9, 0.8, 0.9, 0.6, 1, 1, 0.8, 0.5, 0.7, 1, 1, 0.9, 0.8, 0.9, 0.7, 0.6,
                  0.6, 1, 1, 0.8, 0.5, 0.7, 1, 1, 0.9, 0.8, 0.9, 0.8, 0.7, 0.8, 0.6, 0.7, 0.19, 0.1, 0.36, 0.56, 0.7, 0.8
                ]],
      timestamp: '0',
      emotionObj: {},
      emotionsArrForRender: [],
      likeRatio: '',
      duration: 141,
      completion: 0,
      sideNavSelection: 'overview',
      allUsers: [],
      selectedUsers: [],
      graph: null,
      player: null,
    }
    this.timestampCallback = this.timestampCallback.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.generateCharts = this.generateCharts.bind(this);
    this.changeSideNavSelection = this.changeSideNavSelection.bind(this);
    this.lineGraphDataSwitch = this.lineGraphDataSwitch.bind(this);
    this.setStateAfterDuration = this.setStateAfterDuration.bind(this);
    this.handleUserSelectCb = this.handleUserSelectCb.bind(this);
    // this.recalculateChartsBasedOnUserSelect = this.recalculateChartsBasedOnUserSelect.bind(this);
    this.calculateCompletionPerc = this.calculateCompletionPerc.bind(this);
    this.setEmotionsArrFromObj = this.setEmotionsArrFromObj.bind(this);
    // console.log(this);
  }

  componentDidMount() {
    //orientation modal
    // this.props.actions.changeOption(this.props.currentSection.option);
    var player = this.refs.player;
    // console.log(player);
    this.setState({
      player: player
    })
    this.setStateAfterDuration()
  }

  calculateCompletionPerc(array) {
    let userCompletionObj = array.sort((a, b) => a.time - b.time).reduce((acc, curr) => {
      if (!acc[curr.userId]) acc[curr.userId] = 0;
      if (acc[curr.userId] >= 0) {
        if (curr.time > acc[curr.userId]) acc[curr.userId] = curr.time / this.state.duration
      }
      return acc;
    }, {})
    // console.log('completionObj', userCompletionObj);
    var avgCompletion = 0;
    var numberOfUsers = 0;
    for (var key in userCompletionObj) {
      avgCompletion += userCompletionObj[key];
      numberOfUsers++
    };
    avgCompletion = Math.floor(1000*(avgCompletion / numberOfUsers))/10;
    this.setState({
      completion: avgCompletion
    })
  }

  // changeOption(obj) {
  //
  // }

  setStateAfterDuration() {
    var emotions = ["anger", "contempt", "disgust", "fear", "happiness",
                    "neutral", "sadness", "surprise" ]

    axios.post('/api/getFrames', {
      optionId: 1
    })
    .then((res) => {
      let tempEmotionObj = {};
      this.calculateCompletionPerc(res.data)
      console.log('refresher on what is res.data', res.data)
      emotions.forEach(emo => {
        let capitalized = emo.slice(0, 1).toUpperCase() + emo.slice(1);
        tempEmotionObj[emo] = res.data.sort((a, b) => a.time - b.time).reduce((acc, curr) => {
            if (emo === 'neutral') {
              if (acc[curr.time]) {
                acc[curr.time] = (acc[curr.time] + +curr[emo] / 8) / 2;
                return acc;
              } else {
                acc.push(+curr[emo] / 8);
                return acc;
              }
            }
            else {
              if (acc[curr.time]) {
                acc[curr.time] = (acc[curr.time] + +curr[emo] )/ 2;
                return acc;
              } else {
                acc.push(+curr[emo]); // eventually want to use acc[curr.time] = +curr[emo] and pad the array with null values interspersed
                return acc;
              }
            }
          }, [capitalized]);
        if (tempEmotionObj[emo].length < this.state.duration) {
          var diff = this.state.duration - tempEmotionObj[emo].length - 1;
          let padArr = pad([], diff, null);
          tempEmotionObj[emo] = tempEmotionObj[emo].concat(padArr);
        }
      })
      // console.log('tempEmotionObj', tempEmotionObj)
      return tempEmotionObj;
    })
    .then((emoObj) => {
      let emoArray = [emoObj.anger, emoObj.contempt, emoObj.disgust, emoObj.fear,
                      emoObj.happiness, emoObj.neutral,emoObj.sadness,emoObj.surprise];
      this.setState({
        emotionObj: emoObj,
        emotionsArrForRender: emoArray
      }, () => console.log('state set', this.state))
    })
    .then( () => {
      this.generateCharts(this.state.emotionsArrForRender);
    })
    .then( () => {
      let diff = this.state.duration - this.state.attention[0].length - 1;
      let padArr = pad([], diff, null);
      let paddedAttentionArr = [this.state.attention[0].concat(padArr)];
      this.setState({
        attention: paddedAttentionArr
      })
    })
  }

  generateCharts(lineGraphData) {
      // console.log('generating charts now', lineGraphData);
      var lineData = {
        data: lineGraphData
      }
      this.props.actions.changeLineGraphData(lineData);
      // c3.select('.optionChart').unload();
      var lineGraph = c3.generate({
        bindto: '.optionChart',
        selection: {
          enabled: true
        },
        data: {
          onclick: (d) => {
            let clickedTimestamp = d.x.toString();
            this.setState({
              timestamp: clickedTimestamp
            }, () => {
              var player = this.refs.player;
              // console.log(player);
              player.seekTo(this.state.timestamp)
            })
          },
          columns: lineGraphData,
        }
      });

      var pieChart = c3.generate({
        bindto: '.emotionChart',
        data: {
          columns: [
            ['Anger', this.state.emotionObj.anger.slice(1).reduce((sum, val) => sum+= +val, 0)],
            ['Contempt', this.state.emotionObj.contempt.slice(1).reduce((sum, val) => sum+= +val, 0)],
            ['Disgust', this.state.emotionObj.disgust.slice(1).reduce((sum, val) => sum+= +val, 0)],
            ['Fear', this.state.emotionObj.fear.slice(1).reduce((sum, val) => sum+= +val, 0)],
            ['Happiness', this.state.emotionObj.happiness.slice(1).reduce((sum, val) => sum+= +val, 0)],
            ['Neutral', this.state.emotionObj.neutral.slice(1).reduce((sum, val) => sum+= +val, 0)],
            ['Sadness', this.state.emotionObj.sadness.slice(1).reduce((sum, val) => sum+= +val, 0)],
            ['Surprise', this.state.emotionObj.surprise.slice(1).reduce((sum, val) => sum+= +val, 0)]
          ],
          type : 'pie'
        }
      });
      this.setState({
        graph: lineGraph
      })
      this.forceUpdate();
  }

  setDuration(dur) {
    this.setState({
      duration: dur
    }, () => {
      this.setStateAfterDuration();
    })
  };

  timestampCallback(seconds){
    this.setState({
      timestamp: seconds
    }, () => {
      var player = this.refs.player;
      player.seekTo(this.state.timestamp)
    })
  };

  changeSideNavSelection(item) {
    this.setState({
      sideNavSelection: item
    }, this.lineGraphDataSwitch);
  };

  lineGraphDataSwitch() {
    if (this.state.sideNavSelection === 'attention') {
      this.generateCharts(this.state.attention);
    }
    if (this.state.sideNavSelection === 'overview' || this.state.sideNavSelection === 'emotions' || this.state.sideNavSelection == 'annotations') {
      this.generateCharts(this.state.emotionsArrForRender)
    }
  };

  handleUserSelectCb(userArr) {
    this.setState({
      selectedUsers: userArr
    }, () => {
      let userIdsArray = this.state.selectedUsers.reduce((acc, curr) => {
        acc.push(curr.id); return acc;
      }, []);
      this.recalculateChartsBasedOnUserSelect(userIdsArray);
    })
  };

  setEmotionsArrFromObj(emoObj) {
    console.log('Object in callback', emoObj)
  }

  render() {
    return (
      <div className='optionAnalyticsContainer'>
        <SideBar changeCb={this.changeSideNavSelection} currSelected={this.state.sideNavSelection}/>
        <div className='leftSide'>
          <TryItOutVideo setEmotionsArrFromObj={this.setEmotionsArrFromObj}/>
          <div className="optionChart">
          </div>
        </div>
        <div className="rightSide">
          {this.state.sideNavSelection === 'overview' ?
            (<Overview
              allUsers={this.state.allUsers}
              selectedUsers={this.state.selectedUsers}
              viewer={this.state.user}
              attention={this.state.attention[0]}
              user={this.state.user}
              timestampCallback={this.timestampCallback}
              emotionsObj={this.state.emotionObj}
              likeRatio={this.state.likeRatio}
              completionStatus={this.state.completion}
              sideNavSelection={this.state.sideNavSelection}
              />
            ): ''
          }

          {this.state.sideNavSelection === 'attention' ? (
            <div className='attentionRightPanelContainer'>
              <div className="optionContainer">
                <Demographics selectedUsers={this.state.selectedUsers} allUsers={this.state.allUsers}/>
              </div>
              <div className="optionContainer">
                <Attention attention={this.state.attention[0]} timestampCallback={this.timestampCallback}/>
              </div>
            </div>
          ) : ''}

          {this.state.sideNavSelection === 'feedback' ? (
            <div className='feedbackRightPanelContainer'>
              <Demographics selectedUsers={this.state.selectedUsers} allUsers={this.state.allUsers}/>
              <Feedback feedback={this.props.currentSection.option.feedback} likeRatio={this.state.likeRatio} completionStatus={this.state.completion} />
            </div>
          ) : ''}

          {this.state.sideNavSelection === 'emotions' ? (
            <div className='emotionsRightPanelContainer'>
              <Demographics selectedUsers={this.state.selectedUsers} allUsers={this.state.allUsers}/>
              <Emotion emotionsObj={this.state.emotionObj} />
            </div>
          ) : ''}

          {this.state.sideNavSelection === 'settings' ? (
            <div className='emotionsRightPanelContainer'>
              <UserSelect user={this.state.user} optionId={this.props.currentSection.option.id}
                          userSelectCb={this.handleUserSelectCb} changeSideNavSelection={this.changeSideNavSelection}
                          selectedUsers={this.state.selectedUsers} allUsers={this.state.allUsers}/>
            </div>
          ) : ''}

          {this.state.sideNavSelection === 'annotations' ? (
              <Annotations graph={this.state.graph} player={this.state.player}/>
          ) : ''}

          {this.state.sideNavSelection === 'detailedDemographics' ? (
              <DetailedDemographics selectedUsers={this.state.selectedUsers}/>
          ) : ''}

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    router: state.router,
    currentProject: state.currentProject,
    currentSection: state.currentSection,
    loggedInUser: state.loggedInUser,
    currentOptionAnnotations: state.currentOptionAnnotations,
    currentOption: state.currentOption,
    lineGraphData: state.lineGraphData
  });
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
) (TryItOutAnalytics);