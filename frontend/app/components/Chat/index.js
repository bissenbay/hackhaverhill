import React, { Component } from 'react';
import styled from 'styled-components'

const ChatWindow = styled.div`
  border: solid 1px grey;
  background-color: rgb(242,243,245);
  height: 200px;
  width: 400px;
`
class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
      return(<>
        <ChatWindow>

        </ChatWindow>

        <input type="text" value = "" />
        <button type="button">Send Messages</button>
       </>
      )
  }
}


export default Chat;
