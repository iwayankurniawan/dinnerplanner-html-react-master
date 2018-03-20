const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};

const DinnerModel = function () {

  let numberOfGuests = 4;
  let observers = [];

  let SelectedDishes = [];
  let SelectedDishesPrice = [];
  let SelectedDishesImage = [];
  let SelectedDishesInstruction = [];

  let searchText = "";
  let searchType = "";

  let totalPrice = 0;

  this.setSelectedDishes = function (dish) {
    if(SelectedDishes.includes(dish)) {
    return;
  }
    SelectedDishes.push(dish);
    notifyObservers();
  }

  this.getSelectedDishes = function(){
    console.log(SelectedDishes)
    return SelectedDishes;
  }

  this.setSelectedDishesPrice = function (dish) {
    if(SelectedDishesPrice.includes(dish)) {
    return;
  }
    SelectedDishesPrice.push(dish);
    notifyObservers();
  }

  this.getSelectedDishesPrice = function(){
    return SelectedDishesPrice;
  }

  this.setSelectedDishesImage = function (dish) {
    if(SelectedDishesImage.includes(dish)) {
    return;
  }
    SelectedDishesImage.push(dish);
    notifyObservers();
  }

  this.getSelectedDishesImage = function(){
    return SelectedDishesImage;
  }

  this.setSelectedDishesInstruction = function (dish) {
    if(SelectedDishesInstruction.includes(dish)) {
    return;
  }
    SelectedDishesInstruction.push(dish);
    notifyObservers();
  }

  this.getSelectedDishesInstruction = function(){
    return SelectedDishesInstruction;
  }

  this.getFullMenuPrice = function(){
      totalPrice=0;
    for (var i = 0; i < SelectedDishesPrice.length; i++) {
      totalPrice= totalPrice + SelectedDishesPrice[i];
    }
    return totalPrice;
    notifyObservers()
  }

  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    notifyObservers();
  };

  this.getNumberOfGuests = function () {
    console.log(numberOfGuests)
    return numberOfGuests;
  };

  this.setSearchType = function(type) {
  searchType = type;
  notifyObservers();
  //console.log(searchType)
  };

  this.setSearchText = function (text) {
  searchText = text;
  notifyObservers();
  };

  this.getSearchText = function (text) {
    return searchText;
  };
  // API Calls

  this.getAllDishes = function () {
    let url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?'

    if(searchType !== "") {
    searchType = searchType.replace(" ", "+");
    url += 'type='+ searchType + '&'
  }

    if(searchText !== (""||undefined)) {
    searchText = searchText.replace(" ", "+");
    url += 'query='+ searchText
  }

    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  this.getDish = function (id){
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+id+'/information'
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }

  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new DinnerModel();
