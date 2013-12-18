'use strict';

define(
	[
		'flight/lib/component'
	],
	function(defineComponent){
		return defineComponent(inputTodo);
		function inputTodo(){
			this.defaultAttrs({
				'dataEnterSelector': '#header'
			});

			this.enterTodoData = function(ev, data){
				if(ev.charCode === 13){
					var text = ev.srcElement.value;
					ev.srcElement.value = "";
					this.trigger('dataSendRequested',{
						text:text
					});
				}
				
			};

			this.renderInputBox = function(ev, data){
				$(this.attr.dataEnterSelector).append(data.markup);
			};

			this.after('initialize', function(){
				this.on(document, 'keypress', {
					'dataEnterSelector': this.enterTodoData
				});
				this.on(document, 'dataTodoInputServed', this.renderInputBox);
				this.trigger('dataTodoInputRequest');
			})
		}
	}
);