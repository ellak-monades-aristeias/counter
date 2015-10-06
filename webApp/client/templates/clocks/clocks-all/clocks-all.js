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

		var clocksArray;

		Papa.parse(file, {
			// header: true,
			// dynamicTyping: true,
			skipEmptyLines: true,
			complete: function(results) {
				clocksArray = results.data;
				console.log(clocksArray);
				_.each(clocksArray,function(c) {
					console.log(c);
					var obj = {
						hydroMeter: c[0],
						name: c[1],
						address: c[2],
						topiki:c[3],
						pathcode: c[4],
						timologio: c[5],	
						barcode: c[6]	
					}
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