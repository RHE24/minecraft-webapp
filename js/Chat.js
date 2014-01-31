
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
        
    },

    appendMessage: function (message) {
        this.window.append(message);
        this.window[0].scrollTop = this.window[0].scrollHeight;
    },

    createMessage: function (message) {
        var ip = $('<span class="ip"></span>').text(window.ip);
        var name = $('<span class="user"></span>').text(this.nameInput.val());
        var message = $('<span class="msg"></span>').text(message);
        var $el = $('<div class="message"></div>').append(ip).append(name).append(message);
        return $el;
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
                this.appendMessage(message);
                $(evt.target).val('');
            }
        }
    }
}
