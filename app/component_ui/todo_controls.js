'use strict';

define(
	[
		'flight/lib/component'
	],
	function(defineComponent){
		return defineComponent(todoControls);

		function todoControls(){

			this.defaultAttrs({
				'todoSelector': '.toggle'
			});

			this.toggleSelection = function(ev, data){
				var id = ev.srcElement.parentElement.parentElement.id.slice(4);
				this.trigger('uiToggle', {id: id})
			};	

			this.after('initialize', function(){
				this.on(document, 'click', {'todoSelector': this.toggleSelection});
			});
		}
	}
);