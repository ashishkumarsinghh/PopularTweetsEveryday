import React, { Component } from "react";

export default class ParamSegment extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.param}</h2>
        <h2>Score : {this.props.score}</h2>
        <h3>Most Positive Tweet</h3>
        <p>{this.props.mpt}</p>
        <h3>Most Negative Tweet</h3>
        <p>{this.props.mnt}</p>
      </div>
    );
  }
}
