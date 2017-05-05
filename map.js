
$(document).ready(function() {

const config = require('./config.js');
const yelp = require('yelp-fusion'),
	client = yelp.client(config.YELP_TOKEN);

	let coffeeShopInfo = [],
		allLatlng = [],
		allMarkers = [],
		infowindow = null,
		pos,
		search,
		userCords,
		tempMarkerHolder = [];

	// Start geolocation - could you use a promise here?
	if (navigator.geolocation) {
		function error(err) {
			console.warn('ERROR(' + err.code + '): ' + err.message);
		}
		// on success assigns the coords to the userCords var
		function success(pos) {
			userCords = pos.coords;
		}
		// get the user's current position
		navigator.geolocation.getCurrentPosition(success, error);
	} else {
		alert('Geolocation is not supported in your browser');
	}
	// end geolcoation

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

	// grab form data
	$('#chooseZip').submit(function() {
		let userZip = $('#textZip').val();
		// check to see if the user entered a zip or not. (MAKE A TERNARY?)
		if (userZip) {
			search = client.search({
			term: "coffee shop",
			location: userZip,
			radius: 8047
		});
		} else {
			search = client.search({
			term: "coffee shop",
			latitude: userCords.latitude,
			longitude: userCords.longtiude,
			radius: 8047
		});
	}
});
	// use Yelp's response
	search.then(response => {
		response.jsonBody.businesses.forEach(function(shop) {
			// add pertinent info into array
			coffeeShopInfo.push({
				name: shop.name,
				url: shop.url,
				rating: shop.rating,
				price: shop.price,
				latitude: shop.latitude,
				longitude: shop.longtiude,
				address: shop.display_address
				})
		})}).then(response => {
			coffeeShopInfo.forEach(function(shop){
				let myLatlng = new google.maps.LatLng(shop.latitude, shop.longitude)
				// sets marker parameters
				allMarkers = new google.maps.Marker({
					position: myLatlng,
					map: map,
					// styling of info window when clicked
					html: "<div class='markerPop'>" + '<h1>' + shop.title +
					'</h1>' + '<h3>' + 'Address: ' + shop.address + '</h3>' + '<p>' + 'Rating: ' + shop.rating + '</p>' + '<p>' + 'Price: ' + shop.price + '</p>' + '</div>'
				});
				// put all lat long in array. Need this to create a viewport
				allLatlng.push(myLatlng);
				// put the markers in an array
				tempMarkerHolder.push(allMarkers);
			});
		})
		.catch(console.log);

		// using parameters set above, adding a click listener to the markers
		google.maps.event.addListener(allMarkers, 'click', function(){
			infowindow.setContent(this.html);
			infowindow.open(map, this);
		});
		// from the allLatlng array, show the markers in a new viewpoint bound
		var bounds = new google.maps.LatLngBounds();
		// go through each...
		for(var i = 0, LtLgLen = allLatlng.length; i < LtLgLen; i++) {
			// increase the bound to take this point
			bounds.extend(allLatlng[i]);
		}
			// fit thes bounds to the map
			map.fitBounds(bounds);
		return false; // prevent the form from submitting

});


