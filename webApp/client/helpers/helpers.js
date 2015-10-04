Template.registerHelper('summarize', function(string) {
  var len = 100;
  return string.length > len ? string.substring(0,len).concat('...') : string;
});

Template.registerHelper('formatdate',function(date){
  if(moment && date){
    return moment(date).format('DD/MM/YYYY, hh:mm a');
  } else{
    return date;
  }
});