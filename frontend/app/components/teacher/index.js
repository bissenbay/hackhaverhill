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



const StudentsList = function(students){
  console.log('studnet',students);
  return (
    <div>
          <ul>
            <li>student</li>
            <li>student</li>
            <li>student</li>
            <li>student</li>
            <li>student</li>

          </ul>
        </div>
  )
}


class Students extends Component {
  constructor(props){
    super(props);
    this.state = {
      studets: {}
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
      console.log('state update', this.state);
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
