'use strict';

define(

  [
    'app/component_data/folders',
    'app/component_data/todos',
    'app/component_data/todoInput',
    'app/component_ui/todos',
    'app/component_ui/folders',
    'app/component_ui/todoInput',
    'app/component_ui/todo_controls'
  ],

  function(
    FolderData,
    TodosData,
    TodoInputData,
    TodosUI,
    FoldersUI,
    TodoInputUI,
    TodoControlsUI) {

    function initialize() {
      FolderData.attachTo(document);
      TodosData.attachTo(document, {
        selectedFolders: ['all']
      });
      TodoInputData.attachTo(document);
      TodosUI.attachTo('#todoList', {
        itemContainerSelector: '#todoList',
        selectedFolders: ['all']
      });
      FoldersUI.attachTo('#filters',{
        itemContainerSelector: '#filters',
        selectedFolders: ['all']
      });
      TodoInputUI.attachTo('#header');
      TodoControlsUI.attachTo(document);
    }

    return initialize;
  }
);
