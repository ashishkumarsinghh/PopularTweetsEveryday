import React, { Component } from "react";
import ParamSegment from "./components/paramSegment";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { result: [] } };
    this.state.data.result = [
      { p1mnt: "", p1score: "", p1mpt: "" },
      { p2mnt: "", p2score: "", p2mpt: "" }
    ];
    this.state.p1 = "";
    this.state.p2 = "";
  }
  handlep1 = e => this.setState({ p1: e.target.value });
  handlep2 = e => this.setState({ p2: e.target.value });
  handleSubmit = e => {
    e.preventDefault();
    fetch(
      window.location.href +
        "compare?p1=" +
        this.state.p1 +
        "&p2=" +
        this.state.p2
    )
      .then(response => response.json())
      .then(rdata => this.setState({ data: rdata }));
  };

  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <input
          type="text"
          id="param1"
          placeholder="First Item"
          required
          onChange={this.handlep1}
          value={this.state.p1}
        />
        <input
          type="text"
          id="param2"
          placeholder="Second Item"
          required
          onChange={this.handlep2}
          value={this.state.p2}
        />
        <input type="button" onClick={this.handleSubmit} value="Compare" />

        <div>
          <h1>Results</h1>
          <ParamSegment
            p1={this.state.p1}
            score={this.state.data.result[0].p1score}
            mpt={this.state.data.result[0].p1mpt}
            mnt={this.state.data.result[0].p1mnt}
          />

          <ParamSegment
            p1={this.state.p2}
            score={this.state.data.result[1].p2score}
            mpt={this.state.data.result[1].p2mpt}
            mnt={this.state.data.result[1].p2mnt}
          />
        </div>
      </div>
    );
  }
}

export default App;
