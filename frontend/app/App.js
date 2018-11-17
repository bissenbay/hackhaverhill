
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './styles/styles.css'
import Setup from './components/setup/';
import Teacher from './components/teacher/'
import NewUser from './components/Forms/NewUser.js';
const Header = styled.header`
  background-color: rgb(51,119, 190);
  color:white;

`
const Heading = styled.h1`
  margin: 0;
  padding: .5em;
  font-size: 1em;
`

const Square = styled.div`
  border: solid 1px black;
  padding: 1em;
  margin-top: 10px;
  width: 33%;
  margin: 10px auto;
  text-align: center;
`

const NavMenu = styled.ul`
  margin: 0;
  li {
    display:inline;
    padding-left: 5px;
  }
`


const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;

`

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;





class App extends Component {

  render() {
    return (
      <Router>
      <>
        <Header>
          <Heading>
          <Link to="/">track yo peeps</Link>
          </Heading>
          <NavMenu>
            <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/newuser">Add User</Link></li>
            <li> <Link to="/teachers">Teachers</Link></li>
          </NavMenu>
        </Header>
        <Container>

            <Route path="/" exact component={Index} />
            <Route path="/newuser" component={NewUser} />
            <Route path="/teachers" component={Teacher} />

      </Container>
      </>
    </Router>
    );
  }
}

export default App;


// <Header>
// <Link to="/"> <Heading>track yo' peeps</Heading></Link>
// </Header>
// <Router path="/" >
// <Link to="/teacher"> <Square>teacher</Square></Link>
// <Link to="/nonprofit"> <Square>non profit</Square></Link>
// <Link to="/parent"> <Square>parent</Square></Link>
// <Link to="/admin"> <Square>admin</Square></Link>
// </Router>
