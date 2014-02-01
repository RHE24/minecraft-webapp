
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
                        // '<div class="controls">' +
                        //     '<label>Tooltip</label>' +
                        //     '<input name="tooltip" type="checkbox" checked />' +
                        //     '<label >Guiding Lines</label>' +
                        //     '<input name="lines" type="checkbox" checked />' +
                        // '</div>' +
                        '<div class="clock-container">' +
                            '<div class="clock">' +
                                '<img src="css/img/clock.png"></img>' +
                                '<div class="pointer"></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';



        this.$el = $(this.el);
        this.$playersTable = this.$el.find('.players table');
        this.$pointer = this.$el.find('.pointer');
        this.setup();
    },

    setup: function () {
        this.onPlayersSuccess = _.bind(this.onPlayersSuccess, this);
        this.onControlsChange = _.bind(this.onControlsChange, this);
        this.onServerSuccess = _.bind(this.onServerSuccess, this);

        Poll.getInstance().subscribe('getPlayers', [], this.onPlayersSuccess);
        Poll.getInstance().subscribe('getWorlds', [], this.onServerSuccess);
    },

    updatePlayer: function (player){
        var el = this.$playersTable.find('.' + player.name);
        if(el[0]){
            el.find('td[name="health"]').text(player.health);
            el.find('td[name="food"]').text(player.foodLevel);
        } else {
            this.$playersTable.append(this.getNewPlayerHTML(player));
        }
    },

    syncPlayersWithUI: function () {
        var uiPlayers = _.map(this.$playersTable.find('tr'), function (row) {
            return row.className;
        });
        for(var i = 0; i < uiPlayers.length; i++){
            if(!this.currentPlayers[uiPlayers[i]]){
                this.$playersTable.find('.' + uiPlayers[i]).remove();    
            }
        }
    },

    getNewPlayerHTML: function (player){
        var el
        var img = $('<td class="image"></td>').append($('<img></img>').attr('src', 'css/img/users/' + player.name + '.jpg'));
        var name = $('<td></td>').text(player.name);
        var health = $('<td name="health"></td>').text(player.health);
        var food = $('<td name="food"></td>').text(player.foodLevel);
        return $('<tr></tr>').append(img).append(name).append(health).append(food).addClass(player.name);
    },

    onPlayersSuccess: function (data) {
        var that = this;
        var playerCoordinates = []
        that.currentPlayers = {};

        _.each(data, function (player){
            that.currentPlayers[player.name] = player;
            playerCoordinates.push({
                name: player.name,
                overworldCoordinates: player.location,
                type: 'image',
                src: 'css/img/users/' + player.name + '.jpg'
            });
            that.updatePlayer(player);
        });

        window.map.updatePlayers(playerCoordinates);
        this.syncPlayersWithUI();
    },

    onServerSuccess: function (data) {
        var world = data[0];
        var time = world.time;
        var degrees = (360/24000) * time;

        this.$pointer.css({
            '-webkit-transform':'rotate(' + degrees + 'deg)'
        });
    },

    onControlsChange: function (evt) {
        if($(evt.target).prop('checked')){
            toolbar.controls[$(evt.target).attr('name')] = true;
        } else {
            toolbar.controls[$(evt.target).attr('name')] = false;
        }
    }
}

