import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../actions';
import TesterVideo from './testerVideo.jsx';
import { Button, FormControl, FormGroup, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class TesterHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testerCode: ''
    }
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCodeChange(e) {
    this.setState({
      testerCode: e.target.value
    })
  };

  handleSubmit(e) {
    // Route to that video
    e.preventDefault();
  }

  render() {
    return (
      <div className="TesterHomeContainer">
        <h2> Welcome to Emolytics! </h2><br/>
        <p>If you have a code, please enter it below.</p>
        <form onSubmit={this.handleSubmit}>
          <FormGroup  controlId='promoCode'>
            <Col lg={5}>
            </Col>
            <Col className="promoButton" lg={2}>
            <FormControl
              type='text'
              value={this.state.testerCode}
              placeholder='Enter code'
              onChange={this.handleCodeChange}
              />
              <br/>

            <Link  to={`/video/${this.state.testerCode}`}> <Button> Go </Button> </Link>
          </Col>
          <Col lg={5}>
          <br/><br/><br/><br/><br/>
          </Col>
            
            
          </FormGroup>
        </form>
        <p> Otherwise, feel free to browse our collection of videos,
          and check out the analysis of your viewing session! </p><br/><br/>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return ({
    example: state.example,
    router: state.router
  })
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TesterHome);
