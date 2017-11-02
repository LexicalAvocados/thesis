import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../actions';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import ScrollableAnchor from 'react-scrollable-anchor';
import TryItOutHome from './TryItOut/TryItOutHome.jsx';
import { Button, Modal, Col } from 'react-bootstrap';
// import logo from '../photos/testerInfo.png'



class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTry: false,
      tryerId: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    $(".navBar").css("background-color", "transparent");
  }

  componentWillUnmount() {
    $(".navBar").css("background-color", "#7c519e");
  }

  handleClick(e) {
    // axios.post('api/createTryer', {})
    // .then( (res) => {
      this.setState({
        showTry: true
      })
    // })
  }

  render() {
    var color = {
      backgroundColor: "#7c519e",
      border: "none",
      color: "white"
    }
    var margin = {
      marginRight: "15px"
    }
    return (
      
      <div className='landingContainer'>
        <div className='landingSectionA'> 
          <div className='aInfo'>
            <h2> Throw Away the Guesswork  </h2>
            <h3> Find Out How Your Audience is Feeling </h3>
            <br/>
            <br/>
            <a href='#section1'><Button bsSize="large" style={margin}> Sign Up </Button></a>
            <a href='#section1'><Button bsSize="large" style={color}>Try it out </Button></a>

          </div>
          <div className='aBackground'>
          </div>
          <div className='aBackground2'>
          </div>

        </div>
        <ScrollableAnchor id={'section1'}>
          <div className="landingSectionB">
            <TryItOutHome tryerId={this.state.tryerId}/>
          </div>
        </ScrollableAnchor>
        <hr/>

        <div className="landingSectionC"> 
          <Col md={6} className="landingSectionSubLeft">
            <h3> <b> Customize Your Audience </b>  </h3>
            <br/>
            <h5> Have an audience in mind? Filter your testers by age, sex or race to create your typical viewer. If you already have a following, create custom groups of viewers to watch your videos every time. </h5>
          </Col>

          <Col md={6}>
            <img height="200px" src="https://s3.us-east-2.amazonaws.com/reaction-sync/Screen+Shot+2017-11-01+at+5.05.48+PM.png" alt={"logo"}/> 
          </Col>


        </div>
        <hr/>

        <ScrollableAnchor id={'section2'}>
          <div className="landingSectionC"> 
            <Col md={6} className="landingSectionSubLeft">
              <h3> <b> Advanced Analytics </b> </h3>
              <br/>
              <h5> Every viewer who watches your videos generates emotional response data <b> 4 </b> times every second. On top of the emotions fo anger, contempt, disgust, fear, happiness, sadness and surprise, you can also see where on the screent the viewer is looking at at what time.  </h5>
              
            </Col>

            <Col md={6}>
              <img height="250px" src={'emo.png'} alt={"logo"}/> 
            </Col>


          </div>
        </ScrollableAnchor>

        <hr/>

        <ScrollableAnchor id={'section3'}>
          <div className='landingSectionC'> 
            <Col md={2}>
              
            </Col>

            <Col md={8} className="landingSectionSub">
              <h3> <b> Testers </b>  </h3>
              <br/>
              <h5> Turn passive viewing into income. Connect with creators you love and really show them how you feel about their content. Your feelings can help them improve their content and tailor their content for you. </h5>
            </Col>
            <Col md={2}>
              
            </Col>

        </div>
        </ScrollableAnchor>

        <hr/>

        <ScrollableAnchor id={'section4'}>
          <div className='landingSectionC'> 

            <div className='overflowSectionX'>
              <Col md={12} className="teamTitle">
                <h3> Team </h3>
              </Col>
              <Col md={12}>
                <Col xsHidden sm={1}>
                </Col>

                <Col  sm={2}>
                  <div className = "card">
                    <div className="cardImage1">
                    </div>
                    <div className="cardTitle">
                      <h5> Max Peng </h5>
                      <h5> <small> Software Engineer </small> </h5>
                    </div>
                  </div>
                </Col>
                <Col  sm={2}>
                  <div className = "card">
                    <div className="cardImage2">
                    </div>
                    <div className="cardTitle">
                      <h5> Lucas Ashby </h5>
                      <h5> <small> Software Engineer </small> </h5>
                    </div>
                  </div>
                </Col>
                <Col  sm={2}>
                  <div className = "card">
                    <div className="cardImage3">
                    </div>
                    <div className="cardTitle">
                      <h5> Nirvaan R. </h5>
                      <h5> <small> Software Engineer </small> </h5>
                    </div>
                  </div>
                </Col>
                <Col  sm={2}>
                  <div className = "card">
                    <div className="cardImage4">
                    </div>
                    <div className="cardTitle">
                      <h5> Craig Gordon </h5>
                      <h5> <small> Software Engineer </small> </h5>
                    </div>
                  </div>
                </Col>
                <Col  sm={2}>
                  <div className = "card">
                    <div className="cardImage5">
                    </div>
                    <div className="cardTitle">
                      <h5> Chao Dong </h5>
                      <h5> <small> Software Engineer </small> </h5>
                    </div>
                  </div>
                </Col>

                <Col xsHidden sm={1}>
                </Col>


                
              </Col>
            </div>
        </div>
        </ScrollableAnchor>


        <div className='landingFooter'>
          <Col xs={1}>
            <h5> <b> Emolytics </b> </h5>
            <h5> <small> About Emolytics </small> </h5>
            <h5> <small> Emolytics Blog </small> </h5>
            <h5> <small> Jobs </small> </h5>

          </Col>
          <Col xs={1}>
            <h5> <b> Help </b> </h5>
            <h5> <small> Help Center </small> </h5>
            <h5> <small> FAQ </small> </h5>
            <h5> <small> Report </small> </h5>

          </Col>
          <Col xs={1}>
            <h5> <b> More </b> </h5>
            <h5> <small> Site Map </small> </h5>

          </Col>

        </div>
        <div>
          <p> <small> TM + © 2017 Emolytics, Inc. All rights reserved. </small> </p>


        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  console.log('state in LandingPage', state);
  return ({
    router: state.router,
    loggedInUser: state.loggedInUser,
    role: state.signupwithfb
  });
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage));
