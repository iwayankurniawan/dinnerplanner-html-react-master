import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';

import {modelInstance} from '../data/DinnerModel';

class DishDetail extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: 'INITIAL',
      numberOfGuests: this.props.model.getNumberOfGuests()
    }
  }


  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount(){
    this.props.model.addObserver(this)
    // when data is retrieved we update the state
    // this will cause the component to re-render
      this.props.model.getDish(this.props.info.match.params.id).then(dishes => {
      this.setState({
        status: 'LOADED',
        ChosenDish: dishes
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

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    })
  }

  handleClick(dishes){
        this.props.model.setSelectedDishes(this.state.ChosenDish.title);
        this.props.model.setSelectedDishesPrice(this.state.ChosenDish.pricePerServing);
        this.props.model.setSelectedDishesImage(this.state.ChosenDish.image);
        this.props.model.setSelectedDishesInstruction(this.state.ChosenDish.instructions);
    }


  render() {
    let chosenDish = this.state.ChosenDish;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
      return (
        <div className="SelectDish row">
          <Sidebar model={this.props.model}/>
          <div className="DishDetail col-sm-10">
            <em>Loading...</em>
          </div>
        </div>
      );
        break;
      case 'LOADED':
      return (
      <div className="SelectDish row">
        <Sidebar model={this.props.model}/>
          <div className="DishDetail col-sm-10">
            <div className="row">
              <div className="col-sm-5">
                <h1>{chosenDish.title}</h1>
                <img src={chosenDish.image}/>
                <p>{chosenDish.instructions}</p>
                <Link to="/search">
                  <button>
                      Back to Menu
                  </button>
                </Link>
              </div>
              <div className="col-sm-5">
                <h1>Ingredients For {this.state.numberOfGuests} People</h1>
                {chosenDish.extendedIngredients.map((ingredients, i) => {
                      return (
                        <div key={i} className="row">
                          <div className="col-sm-4">
                            <p>{ingredients.amount * this.state.numberOfGuests} {ingredients.unit}</p>
                          </div>
                          <div className="col-sm-4">
                            <p>{ingredients.name}</p>
                          </div>
                          <div className="col-sm-4">
                            <p>SEK {ingredients.amount * this.state.numberOfGuests}</p>
                          </div>
                        </div>)
                    }
                  )
                }
                <div className="row">
                  <div className="col-sm-6">
                      <button onClick={(chosenDish) => this.handleClick(chosenDish)}>
                          Add Dish to Menu
                      </button>
                  </div>
                  <div className="col-sm-6">
                    <p>Total Price: SEK {chosenDish.pricePerServing * this.state.numberOfGuests}</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      );
        break;
      default:
      return (
        <div className="SelectDish row">
          <Sidebar model={this.props.model}/>
          <div className="DishDetail col-sm-10">
            <b>Failed to load data, please try again</b>
          </div>
        </div>
      );
        break;
    }
  }
}

export default DishDetail;
