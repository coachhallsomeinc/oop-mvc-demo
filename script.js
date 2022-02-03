// create my objects, functions, and global vars
var Model = {
    c:null,
    counter:null,
    clicks:[],
    init: function (controller){
        this.c = controller;
        this.counter = 0;
    },
    setState: function (s){
        // update the state variables
        this.counter = s;
        console.log(this.counter);
        this.clicks.push(s);
        this.onSetState();
    },
    onSetState: function (){
        this.c.updateView();
    }
}

// View class
var View = {
    m:null,
    increment_btn:null,
    decrement_btn:null,
    counter_txt:null,
    init:function (model){
        this.m = model;
        this.increment_btn = document.getElementById("increment_btn");
        this.decrement_btn = document.getElementById("decrement_btn");
        this.counter_txt = document.getElementById("counter_txt");
    },
    render:function (){
        // update the HTML
        this.counter_txt.textContent = this.getState();
    },
    getState: function (){
        var c = this.m.counter;
        return c;
    }
}

var Controller = {
    v:null,
    m:null,
    init: function (view, model){
        // setup click handlers
        this.v = view;
        this.m = model;
        this.v.increment_btn.addEventListener('click', this.incrementState.bind(this));
        this.v.decrement_btn.addEventListener('click', this.decrementState.bind(this));
        // event listeners
    },
    incrementState:function (e){
        console.log(this);
        console.log(e);
        this.m.setState(this.m.counter+1);
    },
    decrementState:function (e){
        this.m.setState(this.m.counter-1);
    },
    updateView:function (){
        this.v.render();
    }
}

var App =  {
    // 2 - sets up the mvc objects and initializes them
    m:Object.create(Model),

    v:Object.create(View),

    c:Object.create(Controller),

    init: function (){
        // 3
        this.m.init(this.c);

        // 4
        this.v.init(this.m);

        // 5
        this.c.init(this.v, this.m);
    },

    eof:function (){
        // clean up, exit
    }
}

function init (){
    // instantiate and init the Model, View, and Controller

    // 1 - page loads, run init on the app
    App.init();

    console.log(App);

}

