import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageViwer from './containers/imageViwer';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <ImageViwer />
      </div>
    );
  }
}
