
requirejs.config({

    shim: {
        'lib/zepto': {
            exports:'$'
        },
        'lib/underscore': {
            exports: '_'
        },
        'lib/jsonapi': {
            deps: ['lib/zepto'],
            exports: 'JSONAPI'
        },
        'json/points': {},
        'lib/d3': {
            exports: 'd3'
        }
    }
});

// Start the app
requirejs(["app"]);




