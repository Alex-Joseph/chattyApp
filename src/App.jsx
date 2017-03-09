import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';
import Notification from './Notification.jsx';

const wss = new WebSocket('ws://localhost:3001');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 0
    }
  }

  handleSubmitMessage = (msg) => {
    console.log("submitting message to server");
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

  componentDidMount = () => {
    console.log("componentDidMount <App />");
    wss.onopen = () => {
      console.log('Connected to server');
    }
    wss.onmessage = (ev) => {
      const data = JSON.parse(ev.data);
      console.log("incoming mes from server", data);
      switch(data.type) {
       case "incomingMessage":
         // handle incoming message
         this.handleOnMessage(data)
         break;
       case "incomingNotification":
         // handle incoming notification
         this.handleOnMessage(data)
         break;
       case "userUpdate":
         // handle incoming userUpdate
         this.setState({userCount: data.count})
         break;
       default:
        throw new Error("Unknown event type " + data.type);
      }
    };
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
      </div>
    )
  }
}
export default App;
