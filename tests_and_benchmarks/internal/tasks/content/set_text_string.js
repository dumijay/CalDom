_pfreak.tasks.push({

    short_name: "set_text_string",
    display_order: 30,
    category: "content",
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
                + '<section class="inner-container">'
                    + '<p class="para-one">Para</p>'
                    + '<p class="para-two">Para</p>'
                + '</section>'
                + '<section class="inner-container">'
                    + '<p class="para-one">Para</p>'
                    + '<p class="para-two">Para</p>'
                + '</section>'
            + '</div>';

        document.body.appendChild( div );

        config.caldomInstance = _( "p" );

        return config;
    },
    
    candidates: {
        "caldom": function(config){
            return config.caldomInstance.text("Lorem Ipsum")
        }
    },

    assert: function(config, test_return){
        if( !(test_return instanceof _.Component) ) throw "Returned is not an instance of CalDOM";
        
        var paras = document.querySelectorAll("p");

        if( 
            paras[0].textContent != "Lorem Ipsum"
            || paras[1].textContent != "Lorem Ipsum"
            || paras[2].textContent != "Lorem Ipsum"
            || paras[3].textContent != "Lorem Ipsum"
        ) throw false;
    },

        reset: function(){
        _pfreak.clearBody();
    }
})