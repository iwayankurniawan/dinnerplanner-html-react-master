import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import SelectDish from "./SelectDish/SelectDish";
import Sidebar from "./Sidebar/Sidebar";
import DishDetail from "./DishDetail/DishDetail";
import Overview from "./Overview/Overview";
import Printout from "./Printout/Printout";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Dinner Planner',
    }
  }

  render() {
    return (
      <div className="App container-fluid">
        <header className="App-header">
          <h1 className="App-title">{this.state.title}</h1>

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}/>
          <Route path="/search" render={(props) => <SelectDish model={modelInstance}/>}/>
          <Route path="/detail/:id" render={(props) => <DishDetail info={props} model={modelInstance}/>}/>
          <Route path="/overview" render={(props) => <Overview info={props} model={modelInstance}/>}/>
          <Route path="/printout" render={(props) => <Printout info={props} model={modelInstance}/>}/>

        </header>
      </div>
    );
  }
}

export default App;
