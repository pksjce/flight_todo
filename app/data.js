'use strict';

define(
  function() {
    return {
      folders: [
        {
          "name" :"all",
          "text" : "All",
          "number":1
        },{
          "text":"Active",
          "name":"active",
          "number":1
        },{
          "name":"inactive",
          "text":"Completed",
          "number":0
        }
      ],
      todos: [
        {
          "id": "1",
          "text": "Default",
          "bucket": ['all', 'active'],
          "selected":false,
        }
      ],
      currentItems:1,
      completedItems:0,
    };
    return data;
  }
);

