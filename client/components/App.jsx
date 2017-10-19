import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index.js';
import { changeExample } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../actions';
import DashboardHome from './creator/dashboard/dashboardHome.jsx';
import FocusGroupsPage from './creator/dashboard/FocusGroupsPage.jsx';
import Navbar from './Navbar.jsx';
import Signup from './auth/signup.jsx';
import Login from './auth/login.jsx';
import TesterHome from './tester/TesterHome.jsx';
import TesterProfile from './tester/TesterProfile.jsx';
import TesterVideo from './tester/testerVideo.jsx';
import TesterQueue from './tester/TesterQueue.jsx';
import ProjectHome from './creator/project/projectHome.jsx';
import SectionHome from './creator/section/SectionHome.jsx';
import OptionHome from './creator/option/OptionHome.jsx';
import CreateProject from './creator/create/createProject.jsx';
import AddSection from './creator/create/addSection.jsx';
import AddOption from './creator/create/addOption.jsx';
import Loading from './auth/loading.jsx';


export class App extends React.Component {
  constructor(props) {
    super(props);
    // console.log('App: this:', this);
  }

  render() {
    return (
      <div className="app">
        <Navbar />
        {
          this.props.loggedInUser.username ? (
            this.props.loggedInUser.isCreator ? (
              <Switch>
                <Route exact path="/" component={DashboardHome}/>
                <Route path="/new" component={DashboardHome}/>
                <Route path='/focusgroups' component={FocusGroupsPage}/>
                <Route path="/testvideo" component={TesterVideo}/>
                <Route path="/project:id" component={ProjectHome}/>
                <Route path="/section:id" component={SectionHome}/>
                <Route path="/option:id" component={OptionHome}/>
                <Route path="/createProject" component={CreateProject}/>
                <Route path="/addSection" component={AddSection}/>
                <Route path="/addOption" component={AddOption}/>
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/" component={TesterHome}/>
                <Route path="/queue" component={TesterQueue}/>
                <Route path="/profile" component={TesterProfile}/>
                <Route path="/video/:id" component={TesterVideo}/>
              </Switch>
            )
          ) : (
            <Switch>
              <Route exact path="/loading" component={Loading}/>
              <Route exact path="/signup" component={Signup}/>
              <Route path="*" component={Login}/>
            </Switch>
          )
        }
      </div>
    );
  }
}

// example
// {this.props.example.text}
// <button onClick={this.onClick}> test </button><br/><br/>

// React-Redux connect() boilerplate
// 1. Include the properties in the Store you want this component to have access to
// 2. Change the Component name at the very end to the one in the current file
const mapStateToProps = (state) => {
  // console.log('state in App', state);
  return ({
    router: state.router,
    loggedInUser: state.loggedInUser
  });
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
