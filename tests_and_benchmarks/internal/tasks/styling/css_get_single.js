_pfreak.tasks.push({

    short_name: "css_get_single",
    display_order: 46,
    category: "styling",
    description: "",
    assert_delay: 0,

    setTaskData: function(config){
        return config;
    },
    
    candidateSetup: function(config){
        _pfreak.clearBody();
        
        var div = document.createElement("div");

        div.innerHTML = 
            '<div class="container">'
                + '<input type="text" value="one" style="background-color:#0F0; font-size: 4em" />'
            + '</div>';

        document.body.appendChild( div );

        config.caldomInstance = _( "input" );

        return config;
    },
    
    candidates: {
        "caldom": function(config){
            return config.caldomInstance.css("font-size");
        }
    },

    assert: function(config, test_return){
        if( test_return[0] != "4em" ) throw test_return[0];
    },

        reset: function(){
        _pfreak.clearBody();
    }
})