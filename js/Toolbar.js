
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
                        '<div class="controls">' +
                            '<label>Tooltip</label>' +
                            '<input name="tooltip" type="checkbox" checked />' +
                            '<label >Guiding Lines</label>' +
                            '<input name="lines" type="checkbox" checked />' +
                        '</div>' +
                    '</div>' +
                '</div>'

        this.$el = $(this.el);
    },

    setup: function () {
        this.onControlsChange = _.bind(this.onControlsChange, this);
    },

    onControlsChange: function (evt) {
        if($(evt.target).prop('checked')){
            toolbar.controls[$(evt.target).attr('name')] = true;
        } else {
            toolbar.controls[$(evt.target).attr('name')] = false;
        }
    }
}

