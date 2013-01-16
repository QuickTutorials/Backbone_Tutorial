var createInsertQuery4Poll = function(id){
	var fields=[];
	var cols=[];
	var rows=[];

	if(id) {
		id = "#" + id + " ";
	}	else {
		id = "";
	}

	var fields = $(id + "table th").map(function(index, value){
		return value.html();
	}).toArray();

	var tds = $(id + "table td").map(function(index, value){
		return value.html();
	});

	for(i=0,j=fields.length; i<fields.length; i++,j+=fields.length){ 
		cols[i] = tds.filter(function(index,e){
			return((index % fields.length)==i);
		}).toArray(); 
		rows[i] = tds.filter(function(index,e){
			return(index<j && index>=(i*fields.length));
		}).toArray(); 
	}

	var queryString = "insert into Polls ('"+fields.join("','")+"') values "+ rows.map(function(e){return "('"+e.join("','")+"')";}).join(",") ;
	return queryString;
}
