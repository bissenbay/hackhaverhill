import React, { Component } from 'react';
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Square = styled.div`
  border: solid 1px black;
  padding: 1em;
  margin-top: 10px;
  width: 33%;
  margin: 10px auto;
  text-align: center;
`


const Root = styled.div`
  margin: 20px 40px;
`
const Container = styled.div`
  display: grid;
  grid-template-columsn: 1f 1fr;
`

 class Setup extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    console.log('rendered');
    return <>

      <Root>
        <Container>
            <Link to="/teachers/"> <Square>teacher</Square></Link>
            <Link to="/about/"> <Square>non profit</Square></Link>
            <Link to="/about/"> <Square>parent</Square></Link>
            <Link to="/about/"> <Square>admin</Square></Link>
        </Container>
      </Root>
    </>
  }
}

export default Setup;
