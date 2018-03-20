import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {modelInstance} from '../data/DinnerModel';

class Overview extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: 'INITIAL',
      numberOfGuests: this.props.model.getNumberOfGuests()
    }
  }

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
      numberOfGuests: this.props.model.getNumberOfGuests()
    })
  }

  render(){
    switch (this.state.status) {
      case 'INITIAL':
      return (
        <div className="col">
          <div className="row">
            <h1 className="col">Dinner For {this.state.numberOfGuests} People</h1>
            <div className="col">
              <Link to="/search">
                <button>
                    Back to Menu
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            {this.props.model.getSelectedDishesImage().map((image, j) => {
                return (
                        <div className="col">
                          <img key={j} src={image}/>
                        </div>
                  )
              }
            )
            }
            </div>
            <div className="row">
            {this.props.model.getSelectedDishes().map((dish, j) => {
                return (
                        <div className="col" key={j}>
                          <p>{dish}</p>
                        </div>
                  )
              }
            )
            }
            </div>
            <div className="row">
            {this.props.model.getSelectedDishesPrice().map((price, j) => {
                return (
                  <div className="col" key={j} >
                    <p>{price * this.state.numberOfGuests}</p>
                  </div>
                  )
              }
            )
            }
          </div>
          <div className="row">
            <div className="col">
              <Link to="/printout">
                <button>
                    Print Full Recipe
                </button>
              </Link>
            </div>
            <div className="col">
              <h2>Total Price {this.props.model.getFullMenuPrice()*this.state.numberOfGuests}</h2>
            </div>
          </div>
        </div>

      );
  }
}
}

export default Overview;
