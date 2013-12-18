'use strict';

define(
	[
		'flight/lib/component',
		'components/mustache/mustache',
		'app/data',
		'app/templates'
	],

	function(defineComponent, Mustache, dataStore, templates){
		return defineComponent(todoInput);

		function todoInput(){
			this.defaultAttrs({
        		dataStore: dataStore,				
			});

			this.serveInputBox = function(){
				this.trigger('dataTodoInputServed', {
					markup:Mustache.render(templates.todoInput)
				})
			};

			this.send = function(ev,data){
				var todos = this.attr.dataStore.todos
				var nextid = (todos.length > 0)? todos[todos.length -1].id + 1 : 1;
				var todo = {
					id:nextid,
					text:data.text,
					selected:false,
					bucket:['all', 'active']
				}
				this.attr.dataStore.todos.push(todo);
				this.attr.dataStore.currentItems++;
				this.trigger('dataTodosRefreshRequested');
			};

			this.after('initialize', function(){
				this.on('dataTodoInputRequest', this.serveInputBox);
				this.on('dataSendRequested', this.send);
			});
		}
	}
);