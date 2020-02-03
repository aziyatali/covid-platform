(function(){
    var domready = false, data, paths;

    window.addEvent('domready', function(){
        domready = true;
        if (data && paths) go();
    });
    new Request.JSON({
        'url': 'js/paths/world.json',
        'onSuccess': function(resp){
            paths = resp;
            if (domready && data) go();
        }
    }).get();
    new Request.JSON({
        'url': 'data/world.json',
        'onSuccess': function(resp){
            data = resp;
            if (domready && paths) go();
        }
    }).get();

    function go(){
        run_map($('map-world'),{
                'paths': paths,
                'svg_width': 1920, // XXX magic numbers, need to be computed
                'svg_height': 451,
                'maxScale': 'x8'
            },
            {CL1:'#c5d1dd',CL2:'#ffffff',CL3: '#c17978',CL4:'#ffeded',
                ST1:1, ST2:1},
            data);
    }
})();