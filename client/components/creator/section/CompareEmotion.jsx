import React from 'react';
import axios from 'axios';
import c3 from 'c3';

// Separate component because we will want to display more information and style it easily
class CompareEmotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {



    }
    console.log(this);
  }

  render () {

    var pieChart = c3.generate({
        bindto: `#emotionChart${this.props.idx}`,
        data: {
          columns: [
            ['Anger', this.props.data.anger],
            ['Contempt', this.props.data.contempt],
            ['Disgust', this.props.data.disgust],
            ['Fear', this.props.data.fear],
            ['Happiness', this.props.data.happiness],
            ['Neutral', this.props.data.neutral],
            ['Sadness', this.props.data.sadness],
            ['Surprise', this.props.data.surprise]
          ],
          type : 'pie'
        }
      });
    return (

        <div className="testerDetails">
          <div className="optionTitle">
            <h4> <small> Emotions </small> </h4>
          </div>
          <hr/>
            <div className='allUsers'>
              <div id={`emotionChart${this.props.idx}`}>
              </div>
              <br/>
            </div>
          </div>
    );
  }
}

export default CompareEmotion;


{/* <Checkbox onChange={(e) => this.props.handleInvites(e, this.props.index)}>
Name: {this.props.tester.username} Age: {this.props.tester.age} Sex: {this.props.tester.sex} Race: {this.props.tester.race}
</Checkbox> */}