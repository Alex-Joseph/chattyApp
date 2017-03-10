import React, {Component} from 'react';
class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {newUser: '', message: ''};
  }

  handleChange = (event) => {
    this.setState({message: event.target.value});
  }

  handleUserChange = (event) => {
    if (event.target.value) {
      this.setState({newUser: event.target.value});
    }
    else {
      this.setState({newUser: "Anonymous"});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let currentUser = this.props.currentUser;
    let newUser = this.state.newUser;
    let notification = '';
    if (newUser) {
      currentUser = newUser;
      notification = `${currentUser} changed their name to ${newUser}`;
    }
    this.props.onSubmitMessage({
      type: "postMessage",
      currentUser: currentUser,
      content: this.state.message,
      notification: notification
    })
    this.setState({newUser: '', message: ''})
  }
  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <div>
        <footer className="chatbar">
          <form className="chatbar"
            onSubmit={this.handleSubmit}>
            <input className="chatbar-username"
              placeholder="Your Name (Optional)"
              defaultValue={this.props.currentUser}
              onChange={this.handleUserChange} />
            <input type="text"
              className="chatbar-message"
              placeholder="Type a message and hit ENTER"
              value={this.state.message}
              onChange={this.handleChange} />
            <input className="send" type="submit" value="Send" />
          </form>
        </footer>
      </div>
    )
  }
}
export default ChatBar;
