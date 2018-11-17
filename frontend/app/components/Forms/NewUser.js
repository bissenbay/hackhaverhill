import React, { Component } from 'react';
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

const Container = styled.div`
  margin: 0 auto;
  input {
    display: block;
    margin: 1em;
  }
  select {
    display: block;
    margin: 1em;

  }
`

const Button = styled.button`
  margin: 1em;
`


// formControls: {
//   first_name: {
//     value: ''
//   },
//   last_name: {
//     value: ''
//   },
//   type: {
//     value: ''
//   }
// }

 class AddUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      type: ''
    }


  }

  submitUser  = e => {
    console.log(this.state);
    e.preventDefault()

    axios.post('http://localhost:3000/newuser', {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      type: this.state.type,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  getUsers = (e) => {
    axios.get('http://localhost:3000/userList')
    .then(function(data){
      console.log('data',data);
    })
  }

  changeHandler = event => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
        formControls: {
          [name]: value
        }
    });
  }

  handleChange = event => {
    this.setState({[event.target.name ] : event.target.value});
  }

    changeSelect = event => {
      console.log('changeSelect', event.target.value);
      event.preventDefault();
      this.setState({type: event.target.value});
    }

    render(){
      return (
        <Container>
         <form>
              <input type="text"
                     name="firstName"
                     value={this.state.firstName}
                     onChange={this.handleChange}
              />

              <input type="text"
                     name="lastName"
                     value={this.state.lastName}
                     onChange={this.handleChange}
              />

             <select onChange={this.changeSelect}>
              <option value="student">student</option>
              <option value="admin">admin</option>
            </select>
          </form>
          <Button onClick={this.submitUser}>Submit Data</Button>

      </Container>
      )
    }

  }

export default AddUser;
