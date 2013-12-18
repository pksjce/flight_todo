'use strict';

define(
  function() {
    var todoInput = '<input id="new-todo" placeholder="What needs to be done?" autofocus="">';
    var todos ='{{#todos}}\
          <li class="{{class}}" id="{{domId}}">\
              <div class="view">\
                <input class="toggle" type="checkbox" {{checked}}>\
                <label>{{text}}</label>\
                <button class="destroy"></button>\
              </div>\
          </li>\
        {{/todos}}';

    var folders =
      '{{#folders}}\
        <li><a class="{{class}}" id="{{name}}" href="#">{{text}}</a></li>\
        {{/folders}}';

    return {
      todos: todos,
      folders: folders,
      todoInput:todoInput
    }
  }

);
