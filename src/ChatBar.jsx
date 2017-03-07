import React, {Component} from 'react';
class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {newUser: '', message: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleUserChange(event) {
    if (event.target.value) {
      this.setState({newUser: event.target.value});
    }
    else {
      this.setState({newUser: "Anonymous"});
    }
  }

  handleSubmit(event) {
    console.log("the state is", this.state);
    event.preventDefault();
    this.props.onSubmitMessage({
      username: this.state.newUser || this.props.currentUser,
      content: this.state.message
    })
    this.setState({message: ''})
  }
  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <div>
        <footer className="chatbar">
          <form className="chatbar" onSubmit={this.handleSubmit}>
            <input className="chatbar-username" placeholder="Your Name (Optional)"
              defaultValue={this.props.currentUser} onChange={this.handleUserChange.bind(this)} />
            <input type="text" className="chatbar-message" placeholder="Type a message
              and hit ENTER" value={this.state.message} onChange={this.handleChange} />
            <input type="submit" value="Send" />
          </form>
        </footer>
      </div>
    )
  }
}
export default ChatBar;
