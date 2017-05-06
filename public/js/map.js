const yelp = require('./yelp.js')

$(document).ready(function() {

	let allLatlng = [],
		allMarkers = [],
		infowindow = null,
		tempMarkerHolder = [];

	//Google map options
	let mapOptions = {
		zoom: 5,
		center: new google.maps.LatLng(37.09024, -100.712891),
		panControl: false,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		scaleControl: false
	};

	// adding infowindow option
	infowindow = new google.maps.InfoWindow({
		content: "holding..."
	});

	// Fire up Google maps and place inside the map-canvas div
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

		// use ajax ?
// $.ajax({
// 			type: 'GET',
// 			url: ''localhost/3000',
// 			dataType: 'html' })
// .done(function(data) {
//   $('#container').html(data);
// })
// .fail(function() {
//   console.log("Something went wrong!");
// });

//	return Yelp's response here
		// yelp.then(array => {
		// 	array.forEach(function(shop){
		// 		let myLatlng = new google.maps.LatLng(shop.latitude, shop.longitude)
		// 		// sets marker parameters
		// 		allMarkers = new google.maps.Marker({
		// 			position: myLatlng,
		// 			map: map,
		// 			// styling of info window when clicked
		// 			html: "<div class='markerPop'>" + '<h1>' + shop.title +
		// 			'</h1>' + '<h3>' + 'Address: ' + shop.address + '</h3>' + '<p>' + 'Rating: ' + shop.rating + '</p>' + '<p>' + 'Price: ' + shop.price + '</p>' + '</div>'
		// 		});
		// 		// put all lat long in array. Need this to create a viewport
		// 		allLatlng.push(myLatlng);
		// 		// put the markers in an array
		// 		tempMarkerHolder.push(allMarkers);
		// 	});
		// })
		// .catch(console.log);

		// // using parameters set above, adding a click listener to the markers
		// google.maps.event.addListener(allMarkers, 'click', function(){
		// 	infowindow.setContent(this.html);
		// 	infowindow.open(map, this);
		// });
		// // from the allLatlng array, show the markers in a new viewpoint bound
		// var bounds = new google.maps.LatLngBounds();
		// // go through each...
		// for (var i = 0, LtLgLen = allLatlng.length; i < LtLgLen; i++) {
		// 	// increase the bound to take this point
		// 	bounds.extend(allLatlng[i]);
		// }
		// 	// fit thes bounds to the map
		// 	map.fitBounds(bounds);

// });


});

