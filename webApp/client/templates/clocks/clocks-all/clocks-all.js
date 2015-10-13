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
			skipEmptyLines: true,
			complete: function(results) {
				clocksArray = results.data;
				console.log(clocksArray);
				_.each(clocksArray,function(c) {
					console.log(c);
					var obj = {
						firstname: c[0],
						lastname: c[1],
						hydroMeter: c[2],
						address: c[3],
						topiki: c[4],
						tel: c[5],
						timologio: c[6],	
						pathcode: c[7],
						barcode: c[8]	
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