import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      link: '',
      depth: 2,
      records: [{"link": "jbsduybenvefv"}]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  // renderRecords() {
  //   return (
  //     <div>
  //         {this.state.records.map(record => (
  //             <div>{record}</div>
  //         ))}
  //     </div> 
  //   )  
  // }
  
  submitForm(event) {
  var self = this;
  var data = JSON.stringify({
    "link": self.state.link,
    "depth": self.state.depth
  });
  var header = {"content-type": "application/json"};
  axios.post('http://localhost:8000/crawl',
    data, header
  ).then(res => {
        console.log(res.data)
        self.setState({records: res.data});
        // self.renderRecords()
    });

  }  

  render() {
    return (
      <div>
        <form id="get-form">
          <label>
            Seed Link:
            <input
              name="link"
              type="text"
              value={this.state.link}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Depth:
            <input
              name="depth"
              type="number"
              value={this.state.depth}
              onChange={this.handleInputChange} />
          </label>
          <button type="button" onClick={this.submitForm.bind(this)}>Go </button>
        </form>
        <div>
          {this.state.records.map(record => (
              <div>{record.attributes}</div>
          ))}
      </div>
      </div>

    );
  }
      
}

export default App;
