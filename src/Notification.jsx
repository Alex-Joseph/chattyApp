import React, {Component} from 'react';

class Notification extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    console.log("Rendering <Notification/>");
    return(
          <div className="message system">
            {this.props.notifcation}
          </div>
    )
  }
}
export default Notification;
