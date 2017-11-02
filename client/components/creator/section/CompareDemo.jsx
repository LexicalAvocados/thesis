import React from 'react';
import axios from 'axios';
import c3 from 'c3';

// Separate component because we will want to display more information and style it easily
class CompareDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    }
    console.log(this);
  }

  render () {
    return (

    <div className="testerDetails">
      <div className="optionTitle">
        <h4> <small> Demographics </small> </h4>
      </div>
      <hr/>
        <div className='allUsers'>
          <p> Total Viewers: {this.props.data.total} </p>
          <div className='averages'>
            <p> Average Age: {this.props.data.age.toFixed(2)} </p>
            <p> Gender Distribution: {this.props.data.male}M/{this.props.data.total - this.props.data.male}F ({((this.props.data.male/this.props.data.total)*100).toFixed(2)}%/{(((this.props.data.total - this.props.data.male)/this.props.data.total)*100).toFixed(2)}%)</p>
          </div>
        </div>
        <br/>
        <br/>
    </div>
    );
  }
}

export default CompareDemo;


{/* <Checkbox onChange={(e) => this.props.handleInvites(e, this.props.index)}>
Name: {this.props.tester.username} Age: {this.props.tester.age} Sex: {this.props.tester.sex} Race: {this.props.tester.race}
</Checkbox> */}