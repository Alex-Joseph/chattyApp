import React, {Component} from 'react'
import { render } from 'react-dom'

class Message extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    console.log("Rendering <Message/>", this.props.message);
    return(
      <div>
        <div key={this.props.message.id} className="message">
          <span className="message-username">{this.props.message.currentUser}</span>
          <span className="message-content"
            style={{color: this.props.message.clientColor}}>
            {this.props.message.content}
          </span>
        </div>
        <div className="message system">
          {this.props.message.notification}
        </div>
      </div>
    )
  }
}
export default Message;
