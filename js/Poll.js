

var Poll = function () {
    
    // do we have an existing instance?
    if (typeof Poll.instance === 'object') {
        return Poll.instance;
    }

    this.jsonapi = new JSONAPI({
        host:'67.222.234.99',
        port:'20059',
        username:'alecgorge',
        password:'MySecret',
        salt:'pepper123'
    });

    this.subscriptions = {}
    this.callbacks = {};
    this.subscriptions = [];
    this.arguments = [];
    this.run = false;
    this.interval = 5000;
    var that = this;

    this.subscribe = function (method, arguments, callback) {
        this.subscriptions.push(method);
        this.arguments.push(arguments);
        this.callbacks[method] = callback;
    }

    this.start = function () {
        if(this.run){
            return;
        }
        this.run = true;
        this.poll();
    }

    this.mapCallbacks = function (data) {
        var success = data.success;
        _.each(success, function (success) {
            that.callbacks[success.source](success.success);
        });
    }

    this.poll = function () {
        if(!that.run){
            return;
        }

        if(!that.subscriptions.length){
            setTimeout(that.poll, that.interval);
        }

        that.jsonapi.callMultiple(that.subscriptions, that.arguments, function (data) {
            that.mapCallbacks(data);
            setTimeout(that.poll, that.interval);
        });
    }
}

