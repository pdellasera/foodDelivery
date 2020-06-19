
class handler {
  constructor() {
    var utils = new util()
    this.add = function () {
    };
    this.update = function(){

    }
    this.delete = function(){

    }
    this.validate = function(){

    }
    this.handlers = function(action,module){
      utils.exec(action,module)
    }
  }
}

