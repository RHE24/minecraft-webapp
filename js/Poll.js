define([], function () {

    var Poll = (function () {
        
        var instance;

        function init() {

            var mapCallbacks = function (data) {
                    var success = data.success;
                    _.each(success, function (success) {
                        callbacks[success.source](success.success);
                    });
                },

                jsonapi = new JSONAPI({
                    host:'67.222.234.99',
                    port:'20059',
                    username:'alecgorge',
                    password:'MySecret',
                    salt:'pepper123'
                }),

                subscriptions = {},
                callbacks = {},
                subscriptions = [],
                argumentsArray = [],
                run = false,
                interval = 5000,
                that = this,
                callCount = 0,

                publicMethods = {

                jsonapi: jsonapi, 

                subscribe: function (method, args, callback) {
                    subscriptions.push(method);
                    argumentsArray.push(args);
                    callbacks[method] = callback;
                },

                start: function () {
                    if(run){
                        return;
                    }
                    run = true;
                    this.pollManager();
                },

                stop: function () {
                    run = false;
                },

                pollManager: function () {
                    if(!run){
                        return;
                    }

                    if(subscriptions.length){
                        this.poll()    
                    }

                    setTimeout(this.pollManager, interval);
                },

                poll: function () {
                    var that = this;
                    var currentCall = callCount;

                    var isRelevant = function () {
                        return currentCall == callCount;
                    }

                    jsonapi.callMultiple(subscriptions, argumentsArray, function (data) {
                        if(isRelevant()){
                            mapCallbacks(data);
                        }
                    });
                }
            }

            publicMethods.poll = _.bind(publicMethods.poll, publicMethods);
            publicMethods.pollManager = _.bind(publicMethods.pollManager, publicMethods);

            return publicMethods;
        }

        return {
            // Get the Singleton instance if one exists
            // or create one if it doesn't
            getInstance: function () {
         
              if ( !instance ) {
                instance = init();
              }
         
              return instance;
            }
         
          };

    })();

    return Poll;

});

