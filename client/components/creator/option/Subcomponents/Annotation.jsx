import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../../../actions';
import axios from 'axios';
import {Button, Col} from 'react-bootstrap';

class Annotations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null,
      emotion: '',
      desc: '',
      select: null,
      error: false,
      Anger: 0,
      Contempt: 1,
      Disgust: 2,
      Fear: 3,
      Happiness: 4,
      Neutral: 5,
      Sadness: 6,
      Surprise: 7
      
    }

    this.handleChange = this.handleChange.bind(this);
    this.addAnnotation = this.addAnnotation.bind(this);
    this.zoom = this.zoom.bind(this);
    this.deSelect = this.deSelect.bind(this);
    this.findLargest = this.findLargest.bind(this);
    console.log(this);

  }

  componentDidMount() {

  }

  handleChange(e) {
    e.preventDefault();
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val
    })
    console.log(this);
  }

  addAnnotation(e) {
    e.preventDefault();
    if (this.state.emotion === 'Anger' || this.state.emotion === 'Contempt' || this.state.emotion === 'Disgust' || this.state.emotion === 'Fear' || this.state.emotion === 'Happiness' || this.state.emotion === 'Neutral' || this.state.emotion === 'Sadness' || this.state.emotion === 'Surprise') {
      let annotation = {
        time: this.state.time,
        emotion: this.state.emotion,
        desc: this.state.desc,
        option: this.props.currentOption
      }
      axios.post('/api/option/addAnnotation', annotation);

      this.props.annotations.annotations.push(annotation);
      var temp = {
        annotations: this.props.annotations.annotations
      }
      this.props.actions.changeAnnotations(temp);
      this.setState({
        error: false
      })
    } else {
      this.setState({
        error: true
      })
    }
    
  }

  zoom(ann) {
    console.log('zoom');
    this.props.graph.zoom([ann.time - 3, ann.time + 3]);
    this.props.graph.select([ann.emotion], [ann.time]);
    this.props.player.seekTo(ann.time);
  }

  deSelect(e) {
    e.preventDefault();
    this.props.graph.unzoom();
  }

  findLargest(ann) {
    var test = this.props.lineGraphData.data[this.state[ann.emotion]][ann.time];
    var emotion;
    this.props.lineGraphData.data.forEach(elem => {
      if (elem[0] !== ann.emotion) {
        if (elem[ann.time] > test) {
          test = elem[ann.time];
          emotion = elem[0];
        }
      }
    })
    if (emotion) {
      return (
        <p> {emotion}: {test} </p>
        )
    } else {
      return (
        <p> {ann.emotion} </p>
        )
    }
  }



render() {
    let annotations = this.props.annotations.annotations.map((ann, i) => {
      return (
        
        <div onClick={() => {
            this.zoom(ann);
          }} className="annotations">
          <Col md={6}>
            <p> Second: {ann.time} </p>
            <p> Emotion: {ann.emotion} </p>
            <p> Description: {ann.desc} </p>

          </Col>
          <Col md={6}>

            <p> {`Expected Emotion Score: ${this.props.lineGraphData.data[this.state[ann.emotion]][ann.time]}`} </p>

            <p> {`Highest Emotion:`} </p>
            {this.findLargest(ann)}
            
          </Col>
        </div>
        

        )
    })
    var unselect = {
      float: 'right',
      marginRight: '16px'
    };
    return (
      <Col md={12}>
      <div className="optionAnnotations">
        <h3 className="optionAnnotationsTitle"> Annotations </h3>

        
        
        <div className="annotationForm">
          <h5> Add Annoation </h5>
          <form>
            <label> 
            Time: 
            <input type="number" name="time" value={this.state.time} onChange={this.handleChange} required/>
            </label>
             <br/>
            <label>
            Emotion:  
            <input name="emotion" value={this.state.emotion} onChange={this.handleChange} required/>
            {this.state.error ? <p className="error">  error  </p> : null}
             <br/>
            </label>
            <label>
            Description:
            <input name="desc" value={this.state.desc} onChange={this.handleChange}/>
            </label>
            <br/>
            <Button onClick={this.addAnnotation}> Add </Button>
            <Button style={unselect} onClick={this.deSelect}> Unselect </Button>
          </form>
        </div>

        

        {annotations}

      </div>
      </Col>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    router: state.router,
    currentOptionAnnotations: state.currentOptionAnnotations,
    currentOption: state.currentOption,
    annotations: state.annotations,
    lineGraphData: state.lineGraphData
  });
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (Annotations);
