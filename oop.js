// create my objects, functions, and global vars
var games = [];

class Model {
  constructor(){
    this.controller = null;
    this.counter = 0;
  }
  setController (c){
    this.controller = c;
  }
  setState(s){
    this.counter = s;
    this.onSetState();
  }
  getState(){
    return this.counter;
  }
  onSetState(){
    this.controller.updateView();
  }
  async init(){
    // 
  }
}

// View class
class View {
  constructor (){
    this.m = null;
    this.increment_btn = document.getElementById("increment_btn");
    this.decrement_btn = document.getElementById("decrement_btn");
    this.counter_txt = document.getElementById("counter_txt");
  }
  
  setModel (model){
    this.m = model;
  }
  
  async render (){
    this.counter_txt.textContent = this.getState();
  }
  
  getState(){
    var c = this.m.getState();
    return c;
  }
}

class Controller {
  constructor(model, view){
    this.v = view;
    this.m = model;
  }
  
  async init(){
    this.v.increment_btn.addEventListener('click', this.changeCounter.bind(this));
    //this.v.increment_btn.addEventListener('click', init);
    this.v.decrement_btn.addEventListener('click', this.changeCounter.bind(this));
  }
  
  incrementCounter(e){
    this.m.setState(this.m.counter+1);
  }
  
  decrementCounter(){
    this.m.setState(this.m.counter-1);
  }
  
  changeCounter (e){
    var val = 0;
    if(e.target.id == "increment_btn"){
      val = this.m.counter+1;
      
    } else {
      val = this.m.counter-1;
    }
    this.m.setState(val);
  }
  
  updateView(){
    if(this.m.counter > 9){
      alert(`You have clicked this too many times... ${this.m.counter}.`)
    }
    this.v.render();
  }
  
}

class Game {
  constructor (){
    this.m = new Model();
    this.v = new View();
    this.v.setModel(this.m);
    this.c = new Controller(this.m, this.v);
    this.m.setController(this.c);
  }
  
  async init(){
    console.log("starting the app");
    await this.m.init();
    await this.v.render();
    await this.c.init();
    
  }
}


async function init (){
    // instantiate and init the Model, View, and Controller

    // 1 - page loads, run init on the app
  for(let i = 0; i < 10; i++){
    let g = new Game();
    await g.init();
    games.push(g);
    console.log(g);
  }
}

