import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class TesterFinishedVideo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      likeResponse: '',
      feedbackText: ''
    }
    this.LikeOnClick = this.LikeOnClick.bind(this);
    this.feedBackTextChange = this.feedBackTextChange.bind(this);
  }

  LikeOnClick(e) {
    this.setState({
      likeResponse: e.target.value
    })
  }

  feedBackTextChange(e) {
    this.setState({
      feedbackText: e.target.value
    })
  }

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
      return (
        <div>


        </div>
      )
    }

};

export default TesterFinishedVideo;