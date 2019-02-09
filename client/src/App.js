import React, { Component } from "react";
import ParamSegment from "./components/paramSegment";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state.data = [];
    this.state.p1 = "";
    this.state.p2 = "";
  }
  handleSubmit = e => {
    this.setState({
      p1: document.getElementById("param1").textContent,
      p2: document.getElementById("param2").textContent
    });
    fetch(
      "https://twibot26.herokuapp.com/compare?p1=" +
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
        <form>
          <input type="text" id="param1" placeholder="First Item" required />
          <input type="text" id="param2" placeholder="Second Item" required />
          <input
            type="button"
            onClick={this.handleSubmit.bind(this)}
            value="Compare"
          />
        </form>
        <div>
          <h1>Results</h1>
          <ParamSegment
            p1={this.state.p1}
            score={this.state.p1score}
            mpt={this.state.p1mpt}
            mnt={this.state.p1mnt}
          />

          <ParamSegment
            p1={this.state.p2}
            score={this.state.p2score}
            mpt={this.state.p2mpt}
            mnt={this.state.p2mnt}
          />
        </div>
      </div>
    );
  }
}

export default App;
