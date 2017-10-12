import React from 'react';
import { connect } from 'react-redux';
import { changeText} from '../actions';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../actions';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Home from './Home.jsx';

import ProjectHome from './creator/project/projectHome.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.onClick = this.onClick.bind(this);
    console.log(this);
  }

  onClick() {
    this.props.actions.changeExample('changed');
  }

  render() {
    return (
      <div>
        {this.props.example.text}
        <button onClick={this.onClick}> test </button>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/new" component={Home}/>
          <Route path="/testvideo" component={TesterVideo}/>
          <Route path="/project/:id" component={ProjectHome}/>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  console.log('state', state);
  return ({
    example: state.example,
    router: state.router
  })
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);