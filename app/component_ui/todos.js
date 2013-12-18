'use strict';

define(

  [
    'flight/lib/component'
  ],

  function(defineComponent) {

    return defineComponent(todos);

    function todos() {

      this.defaultAttrs({
        selectedClass: 'selected',
        allowMultiSelect: true,
        selectionChangedEvent: 'uiTodoSelectionChanged',
        selectedTodo: [],
        selectedFolder: 'all',
        //selectors
        itemSelector: '.todo',
        selectedItemSelector: '.todos.selected',
        destroySelector:'.destroy',
        completedItemsSelector:'#clear-completed'
      });

      this.renderItems = function(ev, data) {
        $('#todoList').html(data.markup);
        var itemStr = data.currentItems == 1 ?"item" : "items";
        $('#todo-count').html(data.currentItems + " " + itemStr + " left");
        $('#clear-completed').html("Clear completed items (" + data.completedItems + ")");
        //new items, so no selections
        this.trigger('uiTodoSelectionChanged', {selectedIds: []});
      };

      this.todoClicked = function(ev, data){
        if(ev.srcElement.id.indexOf('todo') >=0){
          var id = ev.srcElement.id.slice(4);
          this.trigger('uiToggle', {id: id});
        }
      },

      this.requestDeletion = function(ev, data) {
        var todoid = ev.srcElement.parentElement.parentElement.id;
        this.trigger('dataTodoDeleteRequested', {
          deleteTodo: todoid.slice(4)
        });
      };

      this.deletComplete = function(){
        this.trigger('dataTodosRefreshRequested');
      };

      this.refreshTodos = function(ev, data){
        if(data && data.name){
          this.attr.selectedFolder = data.name;
        };
        this.trigger('dataTodosRefreshRequested', {selectedFolder : this.attr.selectedFolder});
      };

      this.clearCompletedItems = function(ev, data){
        this.trigger('clearCompletedItems');
      }

      this.after('initialize', function() {
        this.on(document, 'dataTodosServed', this.renderItems);
        this.on(document, 'uiDeleteTodo', this.requestDeletion);
        this.on(document, 'dataTodoDeletionComplete', this.deletComplete);
        this.on(document, 'click', {
                        'destroySelector': this.requestDeletion, 
                        'itemSelector': this.todoClicked,
                        'completedItemsSelector': this.clearCompletedItems
                      });
        this.on(document, 'dataTodoSelectionChanged', this.refreshTodos);
        this.on(document, 'dataFolderSelectionDone', this.refreshTodos)
        //this.on('uiTodoSelectionChanged', this.updateTodoSelections);
        //this.on(document, 'uiFolderSelectionChanged', this.updateFolderSelections);
        this.trigger('uiTodosRequested');
      });
    }
  }
);
