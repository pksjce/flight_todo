'use strict';

define(

  [
    'flight/lib/component'
  ],

  function(defineComponent) {

    return defineComponent(folders);

    function folders() {

      this.defaultAttrs({
        selectedClass: 'selected',
        selectionChangedEvent: 'uiFolderSelectionChanged',

        //selectors
        itemSelector: 'li.folder-item',
        selectedItemSelector: 'li.folder-item.selected'
      });

      this.fetchMailItems = function(ev, data) {
          this.trigger('uiMailItemsRequested', {folder: data.selectedIds[0]});
      };

      this.renderFolders = function(ev, data){
          $('#filters').html(data.markup);
      };

      this.changeSelection = function(ev, data){
        var name = ev.srcElement.id;
        this.trigger('dataChangeFolderSelection', {name:name});
      };

      this.refreshFolders = function(ev, data){
        this.trigger('dataFolderRefresh');
      }

      this.after('initialize', function() {
        this.on(document, 'uiFolderServed', this.renderFolders);
        this.on('#filters', 'click', this.changeSelection);
        this.on(document, 'dataFolderSelectionDone', this.refreshFolders);
        this.trigger('dataFolderRequestServe');
      });
    }
  }
);
