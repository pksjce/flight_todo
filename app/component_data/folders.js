'use strict';

define(
		[
			'flight/lib/component',
			'components/mustache/mustache',
			'app/data',
			'app/templates'
		],
		function(defineComponent, Mustache, dataStore, templates){
			return defineComponent(folders);

			function folders(){

				this.defaultAttrs({
					selectedFolder:"all",
					dataStore: dataStore
				});

				this.serveFolders = function(ev, data){
					var selectedFolder =(data && data.selectedFolder) || this.attr.selectedFolder;
					this.trigger('uiFolderServed', {
						markup:Mustache.render(templates.folders, {folders: this.getFolders(selectedFolder)})
					})
				};

				this.getFolders = function(selectedFolder){
					var folders = [];
					this.attr.dataStore.folders.forEach(function(folder, index){
						if(folder.name === selectedFolder){
							folder.class = "selected";
						} else {
							folder.class = "";
						}
						folders.push(folder);
					});
					return folders;
				};

				this.changeFolderSelection = function(ev, data){
					var self = this;
					this.attr.dataStore.folders.forEach(function(folder, index){
						if(folder.name === data.name){
							self.attr.selectedFolder = folder.name;
						}
					});
					this.trigger('dataFolderSelectionDone', {name:this.attr.selectedFolder});
				}

				this.after('initialize', function(){
					this.on('dataFolderRequestServe', this.serveFolders);
					this.on('dataFolderRefresh', this.serveFolders);
					this.on('dataChangeFolderSelection', this.changeFolderSelection);
				});
			}
		}


	)