import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';

class SelectDish extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      searchText: this.props.model.getSearchText()
    }
    // we put on state the properties we want to use and modify in the component
  }

  componentDidMount = () => {
    this.props.model.addObserver(this)
    this.setState({
      status: 'LOADED',
    })
  }


  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      nameOfChosenDishes : this.props.model.getSelectedDishes(),
      searchText: this.props.model.getSearchText()
    })
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  onSearchTextChanged = (e) => {
  //console.log(e.target.value)
  this.props.model.setSearchText(e.target.value)
}

onSearchTypeChanged = (e) => {
  //console.log(e.target.value)
  this.props.model.setSearchType(e.target.value)
}

  render() {
    switch (this.state.status) {
      case 'INITIAL':
      return (
        <em>Loading...</em>
        );
        break;
      case 'LOADED':
      return (
        <div className="SelectDish row">
          <Sidebar model={this.props.model}/>
          <div className="col-md-10">
            <h3>Find a Dish</h3>
              <div className="row">
                <input className="col-sm-2" onChange={this.onSearchTextChanged} placeholder="Enter Key Words"/>
                <select className="col-sm-2" onChange={this.onSearchTypeChanged}>
                  <option value="">All</option>
                  <option value="side dish">Side Dish</option>
                  <option value="main course">Main Course</option>
                  <option value="dessert">Dessert</option>
                  <option value="appetizer">Appetizer</option>
                  <option value="salad">Salad</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="soup">Soup</option>
                  <option value="beverage">Beverage</option>
                  <option value="drink">Drink</option>
                  <option value="vegetarian">Vegetarian</option>
                </select>
              </div>
            <Dishes model={this.props.model} />
          </div>
        </div>
      );
        break;
      default:
      return (
        <b>Failed to load data, please try again</b>
        );
        break;
      }
    }
  }
export default SelectDish;
