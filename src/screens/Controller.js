import React, { Component } from 'react';
import Home from '../screens/home/Home';
import Details from '../screens/details/Details';
import moviesData from '../common/movieData';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookShow from '../screens/bookshow/BookShow';
import Confirmation from '../screens/confirmation/Confirmation';

class Controller extends Component {

    constructor() {
        super();
        this.baseUrl = "http://54.175.21.157:8080/api/v1";
    }

  render() {
    return (
      <Router>
        <div className="main-container">
          <Route exact path='/' render={(props) => <Home {...props} moviesData={moviesData} baseUrl={this.baseUrl}/>} />
          <Route path='/movie/:id' render={(props) => <Details {...props} />} baseUrl={this.baseUrl}/>
          <Route path='/bookshow/:id' render={(props) => <BookShow {...props} />} baseUrl={this.baseUrl}/>
          <Route path='/confirm/:id' render={(props) => <Confirmation {...props} />} baseUrl={this.baseUrl}/>
        </div>
      </Router>
    )
  }
}

export default Controller;