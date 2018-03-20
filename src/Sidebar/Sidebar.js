import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Sidebar.css';
class Sidebar extends Component {

  constructor(props) {
    super(props)

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      nameOfChosenDishes : this.props.model.getSelectedDishes(),
      TotalPrice : this.props.model.getFullMenuPrice()
    }
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      nameOfChosenDishes : this.props.model.getSelectedDishes(),
      TotalPrice : this.props.model.getFullMenuPrice()
    })
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  render() {
    // <p>{this.state.nameOfChosenDishes}</p>

    return (
      <div className="Sidebar col-md-2">
        <h3>My Dinner</h3>
        <p>
        People: <input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
        <br/>
        Total number of guests: {this.state.numberOfGuests}
        </p>
        <div className="row">
          <div className="col">
            <p>Dish Name</p>
            {this.props.model.getSelectedDishes().map((dish, j) => {
                return (
                        <div key={j}>
                          <p>{dish}</p>
                        </div>
                  )
              }
            )
            }
          </div>
          <div className="col">
            <p>Cost</p>
              {this.props.model.getSelectedDishesPrice().map((price, j) => {
                  return (
                          <div key={j}>
                            <p>{price * this.state.numberOfGuests}</p>
                          </div>
                    )
                }
              )
              }
              <p>Total: {this.props.model.getFullMenuPrice()*this.state.numberOfGuests}</p>
          </div>
        </div>
        <div>
          <Link to="/overview">
            <button>
                Confirm Dinner
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Sidebar;
