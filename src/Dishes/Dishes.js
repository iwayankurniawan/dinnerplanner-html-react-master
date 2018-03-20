import React, {Component} from 'react';
import './Dishes.css';
import { Link } from 'react-router-dom';
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import {modelInstance} from '../data/DinnerModel';


class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: 'INITIAL'
    }
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    this.props.model.addObserver(this)
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.getAllDishes().then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  update() {
  modelInstance.getAllDishes().then(dishes => {

    this.setState({
      status: 'LOADED',
      dishes: dishes.results
    })
  }).catch(() => {
    this.setState({
      status: 'ERROR'
    })
  })
}

  render() {
    let dishesList = null;
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
        dishesList = <em>Loading...</em>
        break;
      case 'LOADED':
        dishesList = this.state.dishes.map((dish) =>
          <div key={dish.id} className="dishes col-sm-2" style={{width:215}}>
            <Link to={"/detail/" + dish.id}>
              <img className="dishImage" style={{width:300, height: 300}} src={"https://spoonacular.com/recipeImages/" + dish.image} />
              <p className="dishTitle"> {dish.title} </p>
            </Link>
          </div>
        )
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="Dishes row">
        <h3>Dishes</h3>
        <div className="row">
          {dishesList}
        </div>
      </div>
    );
  }
}

export default Dishes;
