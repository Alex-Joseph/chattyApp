import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    console.log("Rendering <MessageList/>");
    return (
      <div>
        {
          this.props.messages.map((m, i) => {
            return <Message message={m} key={i} />
          })
        }
      </div>
    )
  }
}
export default MessageList;
