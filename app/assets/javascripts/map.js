// var map;


// $(document).ready(function (argument) {
	

// 	if ("geolocation" in navigator){
// 	  navigator.geolocation.getCurrentPosition(onLocation, onError);
// 	}	
	
// });


// function onLocation(position){

//   var myPosition = {
//     lat: position.coords.latitude,
//     lng: position.coords.longitude
//   };

//   createMap(myPosition);
// }

// function onError(err){
//   console.log("Error locating your position. Please update your browser.", err);
// }

// function createMap(position){
//   var mapOptions = {
//     center: position,
//     zoom: 12
//   };
//   map = new google.maps.Map($('#map')[0], mapOptions);
//   createMarker(position);
//   createMarker({lat: 25.8068102, lng: -80.201181}); 
// }

// function createMarker(position) {
//   var marker = new google.maps.Marker({
//    position: position,
//    map: map
//  });
// }

// function createMarker(position) {
//   var marker = new google.maps.Marker({
//    position: position,
//    map: map
//  });
// }
