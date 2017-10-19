import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../actions';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.handleFbLogin = this.handleFbLogin.bind(this);
  }

  componentDidMount() {
    // console.log('in loading component')
    console.log('is new user a creator', this.props.role.isCreator)
    this.handleFbLogin();
  }

  handleFbLogin() {
    //check for the session here using dummy route
    axios.get('/userdata')
    .then( (resp, err) => {
      if (resp.data.passport) {
        var user = resp.data.passport.user || null;
        console.log('USER', user)
        this.props.actions.setLoggedIn(user.username, user.name, user.age, user.sex, user.race, this.props.role.isCreator);
      }
      axios.post('/api/updateAfterFb', {
        newUsername: user.username,
        newIsCreator: this.props.role.isCreator
      })
      .then( (res, err) => {
        console.log('res from updating creator status of new user', res)
      })
    })
    // .then( () => {
    //   this.props.history.push('/');
    // })
    .catch((err) => console.log('error happened', err))
  }


  render() {
    return (
      <div className='loadingBarContainer'>
        <img src='https://media.giphy.com/media/TlAojSK5cxI76/giphy.gif'></img>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state in loading', state);
  return ({
    example: state.example,
    setLoggedIn: state.setLoggedIn,
    role: state.signupwithfb,
    router: state.router
  })
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading));
