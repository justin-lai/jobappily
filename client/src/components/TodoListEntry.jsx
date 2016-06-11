import React from 'react';

export default class TodoListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.data = this.props;
    this.companyName = this.data["data"]["company"];
    this.description = this.data["data"]["description"];
    this.interviewer = this.data["data"]["interviewers"];
    this.startTime = this.data["data"]["start"].slice(11, 16);
    this.endTime = this.data["data"]["end"].slice(11, 16);
  }

  render() {
    return (
      <div>
        <li>
          <span className="icon scnd-font-color"></span>
            <h5 className="time">{this.startTime}{"-"}{this.endTime}</h5>
            <h6 className="time end-time">{this.description} {"("}{this.companyName}{")"}</h6>
        </li>
      </div>
    );
  }
}
