const yelp = require('yelp-fusion'),
	client = yelp.client(config.YELP_TOKEN);

let userLocation;
// coffeeShopInfo = [];

// need to listen for the user location....resolved with proper routing...
  if (navigator.geolocation) {
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }
    // on sucess assins the coords to the userCords var
    function success(pos) {
      userLocation = pos.coords;
    }
  // get the user's current position
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert('Geolocation is not supported in your browser');
  }

  $('#chooseZip').submit(function() {
  let zipCode = $('#textZip').val();
  let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
    if (isValidZip) userLocation = zipCode;
    return false; // prevent the form from submitting
  });



// function yelpSearch(location) {
// 	if (typeof location === 'object') {
// 		return client.search({
// 			term: "coffee shop",
// 			latitude: location.latitude,
// 			longitude: location.longtiude,
// 			radius: 8047
// 		});
// 	} else {
// 		return client.search({
// 			term: "coffee shop",
// 			location: location,
// 			radius: 8047
// 		});
// 	}
// }

// // returns promise from Yelp's API depending on whether user provides coords or zipcode
// function locationType(location) {
// 	if (typeof location === 'object') {
// 		return client.search({
// 			term: "coffee shop",
// 			latitude: location.latitude,
// 			longitude: location.longtiude,
// 			radius: 8047
// 		});
// 	} else {
// 		return client.search({
// 			term: "coffee shop",
// 			location: location,
// 			radius: 8047
// 		});
// 	}
// }

// var confirmLocation = new Promise(
//   function(resolve, reject) {
//   if (userLocation) resolve(userLocation);
//   else {
//     var err = new Error('location not set');
//     reject(err);
//   }
//   });

// let coffeeShops =
//   confirmLocation.then(yelpSearch)
//   .then(stores => {
//     stores.jsonBody.businesses.forEach(function(shop) {
//       // add pertinent info into array
//       coffeeShopInfo.push({
//         name: shop.name,
//         url: shop.url,
//         rating: shop.rating,
//         price: shop.price,
//         latitude: shop.latitude,
//         longitude: shop.longtiude,
//         address: shop.display_address
//       })
//       return coffeeShopInfo;
//     })
//   }).catch(console.error);

//   module.exports = coffeeShops;
