
var Toolbar = function () {
    this.init();
}

Toolbar.prototype = {

    init: function () {
        this.el = '<div class="sidebar">' +
                    '<div class="header">' +
                        '<img src="css/img/creeper.png" />' +
                    '</div>' +
                    '<div class="content">' +
                        '<div class="players">' +
                            '<h1>Currently Online</h1>' +
                            '<table></table>' +
                        '</div>' +
                        '<div class="controls">' +
                            '<label>Tooltip</label>' +
                            '<input name="tooltip" type="checkbox" checked />' +
                            '<label >Guiding Lines</label>' +
                            '<input name="lines" type="checkbox" checked />' +
                        '</div>' +
                    '</div>' +
                '</div>';



        this.$el = $(this.el);
        this.$playersTable = this.$el.find('.players table');
        this.currentPlayers = {};
        this.setup();
    },

    setup: function () {
        this.onPlayersSuccess = _.bind(this.onPlayersSuccess, this);
        this.onControlsChange = _.bind(this.onControlsChange, this);
        window.poll.subscribe('getPlayers', [], this.onPlayersSuccess);
    },

    updatePlayer: function (player){
        var el
        var img = $('<td class="image"></td>').append($('<img></img>').attr('src', 'css/img/users/' + player.name + '.jpg'));
        var name = $('<td></td>').text(player.name);
        var health = $('<td></td>').text(player.health);
        var food = $('<td></td>').text(player.foodLevel);
        var row = $('<tr></tr>').append(img).append(name).append(health).append(food);
        this.$playersTable.append(row);
    },

    onPlayersSuccess: function (data) {
        var that = this;
        var playerCoordinates = []
        that.$playersTable.empty();
        _.each(data, function (player){
            playerCoordinates.push({
                name: player.name,
                overworldCoordinates: player.location,
                type: 'image',
                src: 'css/img/users/' + player.name + '.jpg'
            })
            that.updatePlayer(player);
        });

        window.map.updatePlayers(playerCoordinates);
    },

    onControlsChange: function (evt) {
        if($(evt.target).prop('checked')){
            toolbar.controls[$(evt.target).attr('name')] = true;
        } else {
            toolbar.controls[$(evt.target).attr('name')] = false;
        }
    }
}

