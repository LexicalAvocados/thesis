import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallow } from 'enzyme';
import { App } from '../client/components/App.jsx';
import { Signup } from '../client/components/auth/signup.jsx';
import { Login } from '../client/components/auth/login.jsx';

Enzyme.configure({ adapter: new Adapter() });

// Run 'npm test' to run these tests. 
// These tests compare an Enzyme "Shallow Render" of the Component in question to an existing Snapshot taken by Jest.
// A Shallow Render only renders the Component in question, and does NOT render any child Components.
// If you make changes to any of these Components, or otherwise introduce code that causes a Shallow Render to not match a Snapshot,
// expect tests to break. Jest will show you the differences between the Shallow Render and the existing Snapshot.
// If you believe the new code to be sound,
// run 'npm test -- -u' to overwrite the existing Snapshot with a new Snapshot of the current Shallow Render.
// You can check existing snapshots in the __snapshots__ folder

// If you want to add similar tests for other components, follow these steps:
// 1. Add 'export' in front of 'class MyComponent extends React.Component' in the relevant Component file
// 2. Add 'import { MyComponent } from <MyComponent filepath>' to the top of this file
// (note: with the current setup we can only test the base Component Class, NOT the default export of the Component wrapped in withRouter + connect)
// 3. Follow the template seen below

describe('App Component Shallow Render', () => {

  it('renders accurately to the existing "App while logged in as Creator" snapshot', () => {
    const appCreator = shallow(<App loggedInUser={{username: 'a', isCreator: true}}/>);
    expect(appCreator).toMatchSnapshot();
  });

  it('renders accurately to the existing "App while logged in as Tester" snapshot', () => {
    const appTester = shallow(<App loggedInUser={{username: 'b', isCreator: false}}/>);
    expect(appTester).toMatchSnapshot();
  });

  it('renders accurately to the existing "App while not logged in" snapshot', () => {
    const appNoAuth = shallow(<App loggedInUser={{username: undefined, isCreator: undefined}}/>);
    expect(appNoAuth).toMatchSnapshot();
  });

});


describe('Signup Component Shallow Render', () => {
  
  it('renders accurately to the existing Signup snapshot', () => {
    const signup = shallow(<Signup />);
    expect(signup).toMatchSnapshot();
  });

});


describe('Login Component Shallow Render', () => {

  it('renders accurately to the existing Login snapshot', () => {
    const login = shallow(<Login />);
    expect(login).toMatchSnapshot();
  });

});