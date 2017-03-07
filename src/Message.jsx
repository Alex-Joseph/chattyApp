import React, {Component} from 'react';

class Message extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    console.log("Rendering <Message/>");
    return(
      <div>
        <div key={this.props.message.id} className="message">
          <span className="message-username">{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
          <div className="message system">
            Anonymous1 changed their name to nomnom.
          </div>
      </div>
    )
  }
}
export default Message;
