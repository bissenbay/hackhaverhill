import React, { Component } from 'react';
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Chat from '../Chat';

const Side = styled.div`
  background-color: rgb(242,243,245);
  padding-left: 16px;
  height: 100vh;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`

const TeacherSection = styled.div`
  padding-left:16px;
`


const TeacherMenu = styled.div`
  a {
    margin: 5px;
  }
`
const StudentsList = function({props}){
  const people = Object.keys(props).map(function(key, index) {
    return props[key].basic_info
 });
 console.log('names',people);

  if(people.length){
    const names = people.map((person,index) =>
      <li key={index}>
        {person.first_name}
      </li>)
      console.log('hi');
    return (
      <ul> {names} </ul>
    )
  } else {
    return (
      <p>loading</p>
    )
  }

}

class Students extends Component {
  constructor(props){
    super(props);
    this.state = {
      students: {}
    };
  }

  componentDidMount= () =>{
    axios.get('http://localhost:3000/userList')
    .then(({data}) => {
      console.log('API RESULTS', data);
      this.setState({
        students: data
      })
    })
  }
    render(){
      return (
        <StudentsList props = {this.state.students } />
      )
    }
}

const SideBar = function(){
  return (
    <Side>
      <p>Good Morning</p>
      <h2>Mr. Lee </h2>

      <hr/>
      <h3>Classes</h3>
      <ul>
        <li>Math</li>
        <li>Science</li>
        <li>Brit. Lit.</li>
      </ul>
    </Side>
  )
}

 class Teacher extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.match = props.match;

  }



  render(){
    return <Container>
      <SideBar/>
      <TeacherSection>
        <h2>Teacher Section</h2>
        <TeacherMenu>
           <Link to={`${this.match.url}/chat`}>Messages</Link>
            <Link to={`${this.match.url}/students`}>Students</Link>
        </TeacherMenu>
        <hr/>
         <Route path={`${this.match.url}/chat`} component={Chat} />
         <Route path={`${this.match.url}/students`} component={Students} />
      </TeacherSection>
    </Container>
  }
}

export default Teacher;
