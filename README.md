# CalDom
CalDom is a chainable DOM traverser and a manipulator. A super lightweight, 1.4KB minimalistic JavaScript library inspired by key jQuery features.

It's simply a chainable and iterable wrapper around document.createElement(), document.querySelectorAll() and document.evaluate(). Just the right amount of short-hand tricks while keeping a smaller footprint.

Since the framework is just wrapping the official DOM API, the performance drop is minimal compared to pure JavaScript.

# Basic Syntax
Using the alias _ (underscore) for easy reference. (This can be set to $ or any variable-name).
```js
//Creating a new <div>
var new_div = _("+div"); 

//Using CSS Selector to find an element by ID
var container = _("#main-container");

//Find <a> elements with href containing "wikipedia.org" using an XPath query starting with '$'
var wikipedia_links = _("$//a[contains(＠href, 'wikipedia.org')]");

//Append a <button> to <body> and add an click event
_("body").append(
    _("+button")
        .text("Click Me")
        .on("click", () => { console.log("Clicked"); } )
);
```

# Get Started

## CDN

```html
<script src="https://unpkg.com/caldom"></script>
```

CalDom uses _ by default. To use a different alias, set "_caldom_alias" before loading it:

```js
window["_caldom_alias"] = "<new_alias>"
```

## Download

* Minified versions are at [dist](./dist/)
* Source code is at [src](./src/)

## Use it as a Module
CalDom is not attaching anything to the global environment when used as a module.

```sh
npm install caldom
```

```js
//CommonJS
var _ = require('caldom');
```

```js
//RequireJS
requirejs( ["caldom"], function(_){} );
```

```js
//ES6 Module
import _ from "./dist/caldom-1.0.4.min.mjs.js";
```

# Demo: A Simple TODO App

[Play with it live at JSFiddle](https://jsfiddle.net/dumijay/c9m5zvgr/5/) without installing anything.

```html
<style>
    .error{
        box-shadow: 0 0 5px red;
    }

    .todo-item{
        cursor: pointer;
        font-size: 1.5em;
    }
</style>

<script src="https://unpkg.com/caldom"></script>
<script>

    var _input, _button;
    
    _(document.body)
        .append(
            _input = _("+input") //Create <input>
                .attr({
                    type: "text",
                    placeholder: "Type item here",
                })
                .on("keypress", (e) => {
                    //Calling function
                    if( e.keyCode == 13 ) _("button").eq(0).call("click");
                }),
            
            _button = _("+button")
                .text("Add")
                .css({
                    cursor: "pointer",
                    marginLeft: "0.5em",
                })
                .on("click", () => {
                    var value = _input.val()[0];

                    if( !value.length ) return _input.addClass("error");
                    else _input.removeClass("error");

                    _("#todo-list")
                        .append(
                            _("+li")
                                .attr("class", "todo-item")
                                .text( value )
                                .on("click", function(){
                                    _(this)
                                        .css("text-decoration", "line-through")
                                        .attr("custom_status", "finished");
                                })
                        );
                }),
            
            _("+ol").attr("id", "todo-list"),

            _("+button")
                .text("Clear Finished")
                .on("click", () => {
                    //Using XPath to match sub string "fini" of "finished"
                    _('$//li[ contains(@custom_status, "fini") ]').remove(); //Usin
                }),
            
            _("+button")
                .text("Clear All")
                .css("marginLeft", "5px")
                .on("click", () => {
                    _(".todo-item").remove();
                })
        );
</script>
```

# Quick Reference

Refer the [full documentation here.](./DOCUMENTATION.md)

## DOM Traversal

```js
//Constructor. +tag to createElement. Use a CSS Selector or XPath to find elements.
_("<q>");

//Access CalDom's query function directly. +tag to createElement. Use a CSS Selector or XPath
//to find elements. Returns an array of created or found elements.
_.q("<q>");

//Find descendants using a CSS Selector or XPath query starting with '$'.
_("<q>").find("<q>");
```

## Access any Element property or execute its methods.

```js
//Call n-th level function for all elements and get return results as an array.
_("<q>").call("path.to.function");

//Get n-th level property values for all elements as an array.
_("<q>").prop("path.to.property");

//Set properties using a {k:v,} object or as key, value[s] parameters.
_("<q>").prop( {key: value} || key, values[s] );

//This is an alias for prop(); (for compatibility reasons).
_("<q>").data();
```

## Manipulate DOM Tree

```js
//Append/Move element(s). Elements can be a single Element, an array of Elements,
//a CalDom instance or a generator function.
_("<q>").append(element[s][, node]);

//Prepend/Move element(s) as the first child or before. Elements can be a single Element, 
//an array of Elements, a CalDom instance or a generator function.
_("<q>").prepend(element[s][, before_elem]);

//Remove elements.
_("<q>").remove();
```

## Manipulate/Retrieve Content

```js
//Get an array of attribute value of each element.
_("<q>").attr("<attr_key>");

//Set attribute(s) using a {k:v,} object or as key, value[s] parameters.
_("<q>").attr( {key: value} || key, values[s] );

//Get an array of innerHTML from the elements. | Set a single or an array of innerHTML.
//Look out for XSS vulnerabilities. Always use .text() to change text.
_("<q>").html([html]);

//Get an array of textContent from the elements. | Set a single or an array of textContent.
_("<q>").text([text]);

//Get an array of value from the elements. | Set a single or an array of values.
_("<q>").val([values]);
```

## CSS Styling

```js
//Set CSS styles using a {property:value,} object or as property, value parameters.
_("<q>").css( {key: value} || key, values );

//Add CSS classes. Multiple classes separated by space are supported.
_("<q>").addClass( class_names );

//Remove CSS classes. Multiple classes separated by space are supported.
_("<q>").removeClass( class_names );
```

## Event Handling

```js
//Add an event handler. Multiple event names separated by space are supported.
_("<q>").on( event_names, handler, [options] );

//Remove an event handler. Multiple event names separated by space are supported.
_("<q>").off( event_names, handler, [options] );
```

## Iterating

```js
//Get a new CalDom instance for n-th element.
_("<q>").eq(n);

//Get n-th parent or the first parent to match the CSS Selector.
_("<q>").parent(["<n_or_selector>"]);

//Get all children or children matching the CSS Selector.
_("<q>").children(["<css_selector">]);

//Iterate over elements with a callback(elem, i).
_("<q>").each(callback);

//Access created or found Nodes array directly.
_("<q>").elems;
```

The syntax is mostly compatible with jQuery. The key difference is CalDom's output functions like val() returns an array of all values instead of jQuery's first-element-only return. They also accept arrays as inputs. Refer the [full documentation](./DOCUMENTATION.md).

# Browser Support
This is only tested with the latest versions. However, CalDom is using native, time-tested DOM API under the hood. Thus, it should work just fine with any modern browser. Minimum browser support based on MDN compatibility specs is listed below.

* Firefox 3.6+
* Chrome 1+
* Edge 12+
* IE 8+ (5.5+ without CSS Selector queries)
* Opera 10+
* Safari 3.2+
* Android WebView 1+
* Android Chrome 18+
* Android Firefox 4+
* Android Opera 10.1+
* iOS Safari 3+
* Samsung Internet 1+

Except, 

* .parent(css_selector); and .children(css_selector); uses Node.prototype.matches. (Chrome 33+, Firefox 34+, Edge 15+, IE 9+, Android 4.4+, iOS Safari 8+). Use the [MDN/Polyfill](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches).
* XPath: IE not supported. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate)
* .text(); IE 9+ [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
* .val(); Opera 12.1+, Safari 4+ [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)
* .on(); .off(); IE 9+ [MDN/Polyfill](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) | [MDN/Polyfill](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
* .addClass(); .removeClass(); Chrome 8+, Opera 11.5+, Safari 6.1+, Android Web View 3+, Android Opera 11.5+, iOS Safari 5+ [MDN/Polyfill](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

CalDom is not providing workarounds for legacy browser bugs. Use appropriate polyfills. If you need wider browser support including ancient IE versions, consider using legacy jQuery instead.


# Good God! Another jQuery-like framework?

I know :) Here's what motivated me.

About a few years ago, I was creating animated web stuff. Games, banners, etc. Specially for mobile & wide variety of low-end devices.

* I needed a lightweight jQuery replacement. jQuery is offering so much in one bundle, I didn't need all of them.
* Plus, I needed to stay up to date with DOM/vanilla javascript. (Because jQuery moves you away from the native DOM).

Hence, CalDOM was born. A minimalist library with most of the functionality I need without an overkill.
Kept on improving it over the years as my primary DOM handler. Just decided to put it out thinking someone else might find it useful.

### Similar Projects

* [Zepto.js](https://github.com/madrobby/zepto)
* [UmbrellaJS](https://github.com/franciscop/umbrella)
* [Bliss](https://github.com/leaverou/bliss)
* [Cash](https://github.com/fabiospampinato/cash)
* [microjs: Collection of micro libraries](http://microjs.com)

# What's the best jQuery alternative?

If performance is a critical requirement, the best jQuery alternative is pure/vanilla JavaScript. jQuery was a lifesaver in the IE era. But now, all modern browsers are well standardized. They all support the official DOM API really well.

Check out [http://youmightnotneedjquery.com/](http://youmightnotneedjquery.com/)

On the other hand, using a framework massively reduce code complexity and effort while reducing performance. It's a compromise you need to make based on the nature of your project. Since CalDom is just wrapping the official DOM API, the performance drop is very minimal compared to pure JavaScript.

# Contributing

Your contributions are very welcome and thank you in advance.

## Key Principles

* Performance and Minimalism are #1 priority.
* The richness in short-hand methods and features is secondary.
* Supporting legacy browsers is not a priority.

## To-Do
* Implement tests
* Thorough browser version tests
* Implement benchmarks
