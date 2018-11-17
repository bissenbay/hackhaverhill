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



 class AddUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      formControls: {
          name: {
            value: ''
          },
          type: {
            value: ''
          }
      }
    }
  }

  submit  = e => {
    axios.post('http://localhost:3000/user', {
      first_name: this.state.formControls.name.value,
      type: this.state.formControls.type.value
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

    const name = event.target.name;
    const value = event.target.value;

    this.setState({
        formControls: {
          [name]: value
        }
    });
  }

    render(){
      return (
        <Container>
         <form>
              <input type="text"
                     name="name"
                     value={this.state.formControls.name.value}
                     onChange={this.changeHandler}
              />


             <select onChange={this.changeSelect}>
              <option value="student">student</option>
              <option value="admin">admin</option>
            </select>
          </form>
          <Button onClick={this.getUsers}>Submit Data</Button>

      </Container>
      )
    }

  }

export default AddUser;
