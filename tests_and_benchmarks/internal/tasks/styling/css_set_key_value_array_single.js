_pfreak.tasks.push({

    short_name: "css_set_key_value_array_single",
    display_order: 48,
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
            return config.caldomInstance.css("font-size", ["5em", "6em"]);
        }
    },

    assert: function(config, test_return){
        if( !(test_return instanceof _.Component) ) throw "Returned is not an instance of CalDOM";

        var inputs = document.querySelectorAll("input");

        if( inputs[0].style.fontSize != "5em" ) throw false;
    },

        reset: function(){
        _pfreak.clearBody();
    }
})