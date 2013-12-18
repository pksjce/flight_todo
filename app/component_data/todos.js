'use strict';

define(
	[
		'flight/lib/component',
		'components/mustache/mustache',
		'app/data',
		'app/templates'
	],

	function(defineComponent, Mustache, dataStore, templates){
		return defineComponent(todos);

		function todos(){
			this.defaultAttrs({
				selectedFolder:'all',
				dataStore:dataStore
			});

			this.serveTodos = function(ev, data){
				if(data && data.selectedFolder){
					this.attr.selectedFolder = data.selectedFolder;
				}
				var folder = this.attr.selectedFolder;
				this.trigger('dataTodosServed', {
					markup:this.renderTodos(this.getTodos(folder)), 
					currentItems: this.attr.dataStore.currentItems,
					completedItems: this.attr.dataStore.completedItems
				});
			};

			this.renderTodos = function(todos){
				return Mustache.render(templates.todos, {todos:todos});
			};

			this.getTodos = function(folder){
				var todos = [];
				var self = this;
				this.attr.dataStore.todos.forEach(function(todo, index){
					if(todo.bucket.indexOf(folder) >= 0){
						todos.push(self.getTodoForView(todo));
					}
				});
				return todos;				
			};

			this.getTodoForView = function(todo){
				todo.domId = "todo" + todo.id;
				todo.class = todo.selected? "completed":"";
				todo.checked = todo.selected?"checked":"";
				return todo;
			};

			this.deleteTodos = function(ev, data){
				var id = data.deleteTodo;
				var deletedTodo = null;
				this.attr.dataStore.todos.forEach(function(todo, index){
					if(parseInt(todo.id) === parseInt(id)){
						deletedTodo = todo;
					}
				});
				(!deletedTodo.selected)? this.attr.dataStore.currentItems-- : this.attr.dataStore.completedItems--;
				var index = this.attr.dataStore.todos.indexOf(deletedTodo);
				this.attr.dataStore.todos.splice(index, 1);
				this.trigger('dataTodoDeletionComplete');
			};

			this.toggleTodoData = function(ev, data){
				var selectedTodo = null;
				var dataStore = this.attr.dataStore;
				dataStore.todos.forEach(function(todo, index){
					if(parseInt(todo.id) === parseInt(data.id)){
						todo.selected = !todo.selected;
						selectedTodo = todo;
						if(todo.selected){
							todo.bucket.splice(todo.bucket.indexOf('active'), 1);
							todo.bucket.push('inactive');
							dataStore.currentItems--;
							dataStore.completedItems++;
							todo.class="completed";
							todo.checked = "checked";
						} else {
							todo.bucket.splice(todo.bucket.indexOf('inactive'), 1);
							todo.bucket.push('active');
							dataStore.currentItems++;
							dataStore.completedItems--;
							todo.class = "";
							todo.checked = "";
						}
					};
					
				});
				this.trigger('dataTodoSelectionChanged', {todo:selectedTodo});
			};

			this.clearCompleted = function(){
				var inactiveList = [];
				var todos = this.attr.dataStore.todos;
				todos.forEach(function(todo){
					if(todo.bucket.indexOf('inactive') >=0){
						inactiveList.push(todo);
					}
				});
				var self = this;
				inactiveList.forEach(function(todo){
					todos.splice(todos.indexOf(todo), 1);
					self.attr.dataStore.completedItems--;
				});
				this.trigger('dataTodoDeletionComplete');
			}


			this.after("initialize", function() {
        		this.on("uiTodosRequested", this.serveTodos);
        		this.on("dataTodosRefreshRequested", this.serveTodos);
        		this.on("dataTodoDeleteRequested", this.deleteTodos);
        		this.on(document, 'clearCompletedItems', this.clearCompleted);
        		this.on(document,'uiToggle', this.toggleTodoData)        		
      		});
		}
	}
);