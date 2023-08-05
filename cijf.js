////////////////////////////////////////////
var urlfetchcsv = "data.csv";
var IMAGEPATH = "media/";
var images = [];

////////////////////////////////////////////
var tagskeys = {
	"C":["comida","pie-chart.lemon-o.shopping-basket.calculator",0],
};
////////////////////////////////////////////
// var addNewPoint = function(text) {
// 	text = text.replace(/,/g, "");
// 	var tgs = text.match(/^[A-Z]* /g);
// };
////////////////////////////////////////////
// var toggleTag = function(tagelem) {
// 	var on = tagelem.hasClass("on");
// 	$(".on").removeClass("on");
// 	$(".row").show();
// };

////////////////////////////////////////////
var buidList = function(s) {
	for (var i = 0 ; i < images.length; i++) {
		var d = images[i];
		var text = [d.count+" "+d.size,d.where,d.what,d.how,d.comment].join(" / ");
		//console.log(d);
		if(!s || (s && text.includes(s)) ) { // only display if pass test
			var st = 'style="background-image: url('+d.url+');"';
			var img = $('<div class="img" title="'+text+'" '+st+'></div>');
			//<img src="'+d.url+'"/>
			
			img.on("click", function(e) {
				//console.log(e);
				$(this).toggleClass("full");
				e.stopPropagation();
			});

			$("#gallery").append(img);
		}
	}
};

////////////////////////////////////////////
var instantiateTodo = function() {
	
	// MAKE TAGS BAR
	// $.map(tagskeys, function(v,k){
	// 	var ic = v[1].split(".")[0];
	// 	var tag = $('<div tag="'+k+'" class="tag hint--bottom" data-hint="'+v[0]+'"><i class="fa fa-fw fa-'+ic+'"></i></div>');
	// 	tag.on('click', function() {
	// 		toggleTag($(this));
	// 	});
	// 	$('.tags').append(tag);
	// });
	data.forEach(function(d,i) {
		//console.log("adding:",d,i);
		if(i<20000) {	
        if(d.count) { // more than one image
			for (var l = 1 ; l <= d.count; l++) {
				var dd = structuredClone(d);
				dd.url = IMAGEPATH+d.root+"-"+l+".jpg";
				images.push(dd);
			}
        } else {
        	d.url = IMAGEPATH+d.root+".jpg";
        	images.push(d);
        }
    	}
	});
	//console.log(images);
	buidList();

	/////////////////////// EVENTs
	// search filtering
	$('#search').on('change', function() {
		var s = $(this).val();
		console.log("searched:"+s);
		$(".img").remove();
		buidList(s);
	});
	
	console.log("BRAVO ! TODO EN CALMA.")
}

////////////////////////////////////////////
window.addEventListener('load', function() { 

	console.log("welcome home.");

	$.ajax({
		url: urlfetchcsv,
		async: false,
		success: function(csvd) {
			data = $.csv.toObjects(csvd);
		},
		dataType: "text",
		complete: instantiateTodo
	});

}, false);
