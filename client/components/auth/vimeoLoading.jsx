import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChangeActions from '../../actions';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class vimeoLoading extends React.Component {
  constructor (props) {
    super(props);	
    this.handleVimeoLogin = this.handleVimeoLogin.bind(this);
  }

  componentDidMount() {
    axios.get('/vimeouserdata')
      .then((response) => {
        // console.log('RESPONSE FROM VIMEO', response)
        axios.get('/api/auth/vimeoUserDatabaseEntry', {
          params: {
            username: response.data.username
          }
        })
          .then((userObj) => {
            // console.log('USER FROM OUT SYSTEM', userObj)
            var user = userObj.data;
            this.props.actions.setLoggedIn(user.id, user.username, user.name, user.age, user.sex, user.race, true);
          })
          .then(() => {
            setTimeout(() => this.props.history.push('/'), 700);
          })
      })
  }

  // console.log('NEW USER ROLE', this.props.role.isCreator)
  // if (this.props.role.isCreator === undefined) {
  // 	//user is a returning user
  // 	//fetch user from db 
  // 	//if user is creator
  // 		//log in as creator
  // 	// else
  // 		// log in as tester
  // } else {
  // 	//new account
  // 	if (this.props.role.isCreator) {
  // 		axios.post('/api/updateAfterFb', {
  // 			newUsername: user.username,
  // 			newIsCreator: this.props.role.isCreator
  // 		})
  // 			.then( (res, err) => {
  // 				console.log('res from updating creator status of new user', res);
  // 			});
  // 		this.props.actions.setLoggedIn(user.id, user.username, user.name, user.age, user.sex, user.race, this.props.role.isCreator);
  // 	} else {
  // 		this.props.actions.setLoggedIn(user.id, user.username, user.name, user.age, user.sex, user.race, user.isCreator);
  // 	}
  // }
  // console.log('IN VIMEO LOADING COMPONENT');

  handleVimeoLogin() {
  }

  render() {
    return (
      <div className='loadingBarContainer'>
        <img src='https://media.giphy.com/media/TlAojSK5cxI76/giphy.gif'></img>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state in vimeo loading', state);
  return ({
    example: state.example,
    setLoggedIn: state.setLoggedIn,
    role: state.signupwithfb,
    loggedInUser: state.loggedInUser,
    router: state.router
  });
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ChangeActions, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(vimeoLoading));