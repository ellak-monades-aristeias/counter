var downloadCSV = function(csv) {
	var blob = new Blob([csv]);
	var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
    a.download = "measurements.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


Template.MeasurementsAll.events({
	'click [data-action="exportCSV"]': function (evt,tmpl) {
		evt.preventDefault();

		var measurements = Measurements.find().fetch();
		var data = []
		_.each(measurements, function(m) {
			data.push([
				moment.utc(m.createdAt).format("DD/MM/YYYY, hh:mm a"),
				m.hydroMeter,
				m.value,
				m.failure
			]);
		});		

		var fields = [
			"Ημερομηνία",
			"Υδρόμετρο",
			"Τιμή",
			"Αποτυχία"			
		];

		var dataplusfields = {fields: fields, data: data};
		var csv = Papa.unparse(dataplusfields);

		downloadCSV(csv);		

		return false;
	}
});