define(['views/ClockView', 'views/PlayersView'], function (ClockView, PlayersView) {

    var SidebarView = function (map) {
        this.map = map;
        this.init();
    }

    SidebarView.prototype = {

        init: function () {
            this.el =   '<div class="sidebar">' +
                            '<div class="header">' +
                                '<img src="css/img/creeper.png" />' +
                            '</div>' +
                        '</div>';

            this.$el = $(this.el);
            this.setup();
        },

        setup: function () {
            this.clockView = new ClockView;
            this.playersView = new PlayersView(this.map);

            this.$el.append(this.playersView.$el).append(this.clockView.$el);
        }
    }

    return SidebarView;

});