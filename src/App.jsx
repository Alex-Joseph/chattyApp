import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';
import Notification from './Notification.jsx';
import ReactDOM from 'react-dom';

const wss = new WebSocket('ws://localhost:3001');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Alex'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 0
    }
  }

  scrollToBottom = () => {
      const node = ReactDOM.findDOMNode(this.messagesEnd);
      node.scrollIntoView({behavior: "smooth"});
  }

  handleSubmitMessage = (msg) => {
    console.log("submitting message to server");
    this.setState({currentUser: {name: msg.currentUser} });
    wss.send(JSON.stringify(msg));
  }

  handleOnMessage = (mes) => {
    console.log("adding mes to state");
    let addMsg = [...this.state.messages, mes];
    this.setState({messages: addMsg});
  }

  handleOnNotification = (notif) => {
    console.log("processing notification", notif);
    wss.send(notif);
  }

  componentDidUpdate() {
      this.scrollToBottom();
  }

  componentDidMount = () => {
    console.log("componentDidMount <App />");
    wss.onopen = () => {
      console.log('Connected to server');
    }
    wss.onmessage = (ev) => {
      const mes = JSON.parse(ev.data);
      console.log("incoming mes from server", mes);
      switch(mes.type) {
       case "incomingMessage":
         // handle incoming message
         this.handleOnMessage(mes)
         break;
       case "incomingNotification":
         // handle incoming notification
         this.handleOnMessage(mes)
         break;
       case "userUpdate":
         // handle incoming userUpdate
         this.setState({userCount: mes.count})
         break;
       default:
        throw new Error("Unknown event type " + mes.type);
      }
      this.scrollToBottom();
    }
  };

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="userCount">
            {this.state.userCount} users online
          </div>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          currentUser={this.state.currentUser.name}
          onSubmitMessage={this.handleSubmitMessage}
          onSubmitNotif={this.handleOnNotification}
        />
        <div style={ {float:"left", clear: "both"} }
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    )
  }
}
export default App;
