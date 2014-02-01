
var Chat = function () {
    this.init();
}

Chat.prototype = {
    
    init: function () {
        this.el =   '<div class="chat">' +
                        '<div class="container">' +
                            '<div class="window"></div>' +
                            '<div class="input">' +
                                '<div class="name">' +
                                    '<input class="name" type="text" placeholder="name" />' +
                                '</div>' +
                                '<div class="message">' +
                                    '<input class="message" type="text" placeholder="say something..." />' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'

        this.$el = $(this.el);
        this.setup();
        
        var that = this;

        setTimeout(function () {
            that.appendMessage($('<div class="message admin">Welcome to the Minecraft in-game chat!</div>'));
            setTimeout(function () {
                that.appendMessage($('<div class="message admin">Be sure to fill out your name to identify yourself.</div>'))
            },300)
        },1000);

        this.socket = new WebSocket('ws://'+ Poll.getInstance().jsonapi.host+':' +(parseInt(Poll.getInstance().jsonapi.port)+2)+'/');
        
        this.socket.onopen = function (e) {
            that.appendMessage(that.createMessage('Connection to server established...'));
            that.socket.send("/api/subscribe?source=chat&key="+ Poll.getInstance().jsonapi.createKey("chat"));
        };

        this.socket.onerror = function (e) {
            console.log('ERROR');
        };
        
        this.socket.onmessage = function (e) {
            var data = JSON.parse(e.data);
            that.appendMessage(that.createMessage('<' + data.success.player + '> ' + data.success.message));
        };
        
        this.socket.onclose = function (e) {
            that.appendMessage(that.createMessage('Lost connection to server...'));  
        }

        window.unload = function () {
            that.socket.close();
        };
        
    },

    appendMessage: function (message) {
        this.window.append(message);
        this.window[0].scrollTop = this.window[0].scrollHeight;
    },

    createMessage: function (message, user) {
        var name = $('<span class="user"></span>').text(user);
        var message = $('<span class="msg"></span>').text(message);
        var $el = $('<div class="message"></div>').append(name).append(message);
        return $el;
    },

    sendMessage: function (e) {
        var url = Poll.getInstance().jsonapi.makeURL("broadcast", [e]);
        url = "/api"+url.substr(url.lastIndexOf("/"));
        url = url.substr(0, url.indexOf("&callback=?"));
        this.socket.send(url);
    },

    setup: function () {
        this.window = this.$el.find('.window');
        this.onInputKeyup = _.bind(this.onInputKeyup, this);
        this.$el.find('.input input').on('keyup', this.onInputKeyup);
        this.nameInput = this.$el.find('.name input');
    },

    onInputKeyup: function (evt) {
        if(evt.keyCode == 13){
            var text = $(evt.target).val();
            if(text){
                var message = this.createMessage(text);
                this.sendMessage('<' + window.ip + '> ' + text);
                // this.appendMessage(message);
                $(evt.target).val('');
            }
        }
    }
}
