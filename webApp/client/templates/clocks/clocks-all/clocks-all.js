Template.ClocksAll.onCreated(function () {
	this.showInput = new ReactiveVar(false);
});


Template.ClocksAll.events({
	'click [data-action="showInput"]': function(evt, tmpl) {
		evt.preventDefault();
		if ( tmpl.showInput.get() ) {
			tmpl.showInput.set(false);	
		} else {
			tmpl.showInput.set(true);
		}
	},	
	'change #csv-file': function (evt,tmpl) {
		console.log("file input fired");
		var file = evt.target.files[0];

		var clocksArray; //array of obj 

		Papa.parse(file, {
			header: true,
			// dynamicTyping: true,
			skipEmptyLines: true,
			complete: function(results) {
				clocksArray = results.data;
				console.log(clocksArray);
				_.each(clocksArray,function(c) {
					console.log('c');
					console.log(c);
					var obj = {
						hydroMeter: c.hydro,
						name: c.name,
						address: c.address,
						topiki:c.tp,
						pathcode: c.pathcode,
						barcode: c.barcode	
					}
					console.log('obj');
					console.log(obj);
					Clocks.insert(obj);
				});
			}	
		});


	}
});

Template.ClocksAll.helpers({
	showInput: function () {
		return Template.instance().showInput.get();
	}
});