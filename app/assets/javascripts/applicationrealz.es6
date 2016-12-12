
console.log("APP ONLINE");

var map;
var infowindow;
var myPosition;
var directionsDisplay;



$(document).ready(function(){

  if ("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(onLocation, onError);
  } 

  $('.scrollspy').scrollSpy();
  // $('.parallax').parallax();
  $(".button-collapse").sideNav({     
      //menuWidth: 200, // Default is 240
      // edge: 'right',
      //closeOnClick: true,
      draggable: true
    });


  $('.js-side-collapsible').collapsible({

    // onOpen: function(el) { 
    //   console.log("OPEN", el.attr("id")); 
    // },

  });


  // $('#blood-open').one("click", dropBloodMarker);
  // $('#haven-open').one("click", dropHavenMarker);
  



  $('.slider').slider({full_width: true});
  $('select').material_select();

  $("#human").on("click", intoHuman);
  $("#vampire").on("click", intoVampire);

  $(".menu").on("click", function(event){
     $('body').css({
      overflow: '',
      width: ''
    });
  });


  $(window).on("scroll", changeNavbar);

  // $(window).one("scroll", dropMarker)
  

  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();


}); //document-ready 



// function dropBloodMarker(argument) {

//   console.log("dropping blood marker");
//   vampMarker(myPosition);
 
// };

// function dropHavenMarker(argument) {

//   console.log("dropping haven marker");
//   vampMarker(myPosition);
 
// };



// function dropMarker(argument) {
//   if ($(window).scrollTop()  > $(window).height() + 10)
//     {
//         console.log("you've reached the map section");
//         vampMarker(myPosition); 
//         // unbind the scroll event if the execution of this code is only desired once:
//         //$(this).unbind('scroll');
//     }
// }


function fetchDirections (event) {
  // event.preventDefault();

  console.log("getting directions");

  // console.log($(this).data("lat"));
  // console.log($(this).data("lng"));
  // console.log(myPosition);

  var thisLat = $(this).data("lat");
  var thisLng = $(this).data("lng");


    var tripDescription = {
      origin: myPosition,
      destination: `${thisLat},${thisLng}`,
      travelMode: "DRIVING",
    };

  var directionsService = new google.maps.DirectionsService();
  directionsService.route(tripDescription, showDirections);

} // => fetchDirections


function showDirections (result, status) {
  if (status == 'OK') {
    console.log("showing the directions");
    //console.log(result);
    var departureNum = Date.now(); // (1481502971194) Dates written as numbers, specifies the number of milliseconds since January 1, 1970, 00:00:00.
    var departureString = new Date(); // A JavaScript date can be written as a string: Sun Dec 11 2016 19:36:11 GMT-0500 (EST)

    //console.log(departureNum); // (1481502971194) Dates written as numbers, specifies the number of milliseconds since January 1, 1970, 00:00:00.
    console.log(departureString); // * departure - A JavaScript date can be written as a string: Sun Dec 11 2016 19:36:11 GMT-0500 (EST)

    var durationString = result.routes[0].legs[0].duration.text
    var durationNum = result.routes[0].legs[0].duration.value

    console.log(durationString);
    //console.log(durationNum);

    var durationStringArray = durationString.split(" ");
    var justTheNumber = durationStringArray[0]
    console.log(justTheNumber);
    var justTheNumberInteger = parseInt(justTheNumber);
    console.log(justTheNumberInteger); 

    var arrivalNum = departureString.setMinutes(departureString.getMinutes() + justTheNumberInteger);
    //console.log(arrivalNum);
    
    var arrivalString = new Date(arrivalNum)
    console.log(arrivalString);


    directionsDisplay.setDirections(result);
  }
  else {
    console.log("OMG Y U NO OK?");
    console.log(result);
    console.log(status);
  }
}


function handleError (error) {
  console.log("Could not fetch directions");
  console.log(error.responseText);
}






function changeNavbar(){
  if($(window).scrollTop() > 60) {
            $("nav").addClass("active");
        } else {
           $("nav").removeClass("active");
        }
}

function intoHuman (event) {
  event.preventDefault();
  console.log("User is a human");
  
  $(".hello-vampire").toggle();
  $(".hello-human").toggle();

  $(".vampire-form").toggle();
  $(".human-form").toggle();

}

function intoVampire (event) {
  event.preventDefault();
  console.log("User is a vampire");

  $(".hello-vampire").toggle();
  $(".hello-human").toggle();

  $(".vampire-form").toggle();
  $(".human-form").toggle();

  $(".adjective").text("indecisive");

}

function onLocation(position){

  console.log("Getting location");

  myPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  createMap(myPosition);
  
}

function onError(err){
  console.log("Error locating your position. Please update your browser.", err);
}

function createMap(position){
  var mapOptions = {
    center: position,
    zoom: 13,
    mapTypeId: 'hybrid', // displays a mixture of normal and satellite views
    scrollwheel: false, // so that the map doesn't zoom while you're scrolling down the page
    gestureHandling: 'cooperative' 
      // sets the gesture handling mode to 'cooperative',
      // which means that on a mobile device, the user must swipe with one
      // finger to scroll the page and two fingers to pan the map.
  };


  map = new google.maps.Map($('#map-canvas')[0], mapOptions);
  vampMarker(position);

  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
  });
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directionsPanel'));

  google.maps.event.addListenerOnce(map, 'tilesloaded', showHello);

  // marker.addListener('click', function() {
  //         map.setZoom(8);
  //         map.setCenter(marker.getPosition());
  //       });

  infowindow = new google.maps.InfoWindow();
  var banks = new google.maps.places.PlacesService(map);

        banks.textSearch({
          location: {lat: position.lat, lng: position.lng},
          radius: 1000,
          query: ['blood' + 'bank']
        }, createBanks);

  var dracula = new google.maps.places.PlacesService(map);      

        dracula.textSearch({
          location: {lat: position.lat, lng: position.lng},
          radius: 1000,
          query: ['dracula']
        }, createHavens);          

  var vampire = new google.maps.places.PlacesService(map);      

        vampire.textSearch({
          location: {lat: position.lat, lng: position.lng},
          radius: 1000,
          query: ['vampire']
        }, createHavens);          

  var cemeteries = new google.maps.places.PlacesService(map);      

        cemeteries.textSearch({
          location: {lat: position.lat, lng: position.lng},
          radius: 500,
          query: ['cemetery']
        }, createHavens);

  $('#recenter-vamp').on("click", reCenterMap);      

} //createMap


function reCenterMap (event) {
  event.preventDefault();
  console.log("recentering");
  map.setCenter(myPosition); 
}




function createBanks(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
          
          bloodMarker(results[i].geometry.location);  

          var bloodName = results[i].name
          var bloodAddress = results[i].formatted_address
          var bloodId = results[i].place_id
          var bloodLat = results[i].geometry.location.lat()
          var bloodLng = results[i].geometry.location.lng()
          // isOpen = results[i].opening_hours.open_now
          //firstPhoto = results[i].photos[0].html_attributions[0]  
          // console.log(results[i]);
          // console.log(name);
          // console.log(address);
          // console.log(isOpen);

          
          $("#bank-list").append(

              `<p class="blood-name red-text" data-lat="${bloodLat}" data-lng="${bloodLng}"> 
                <strong> ${bloodName} </strong> 
              </p>
              <p class="blood-address" data-lat="${bloodLat}" data-lng="${bloodLng}">       
                ${bloodAddress}
              </p>`
          );  
      } // => for loop

      $('.blood-name').on("click", moveCenter);
      $('.blood-address').on("click", fetchDirections);

    } // => if 
}; // => createBanks






function moveCenter (event) {
  event.preventDefault();
  console.log("moving the center");
  console.log($(this).data("lat"));
  console.log($(this).data("lng"));
  var thisLat = $(this).data("lat");
  var thisLng = $(this).data("lng");
  map.setCenter({lat: thisLat, lng: thisLng}); 
};



function createHavens(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
          
          havenMarker(results[i].geometry.location);  

          var havenName = results[i].name
          var havenAddress = results[i].formatted_address
          var havenId = results[i].place_id
          var havenLat = results[i].geometry.location.lat()
          var havenLng = results[i].geometry.location.lng()
        
        
          // console.log(results[i].name);
          // console.log(results[i].geometry.location.lat());
          // console.log(results[i].geometry.location.lng());
          // console.log(results[i].place_id);
          // console.log(results[i].formatted_address);
  

      haven-open

      $("#haven-list").append(

          `<p class="haven-name red-text" data-lat="${havenLat}" data-lng="${havenLng}"> 
            <strong> ${havenName} </strong> 
          </p>
          <p class="haven-address" data-lat="${havenLat}" data-lng="${havenLng}">       
            ${havenAddress}
          </p>`
        );  
      } // => for loop

      $('.haven-name').on("click", moveCenter);
      $('.haven-address').on("click", fetchDirections);

    } // => if 
}; // => createCemeteries






function showHello (event) {
  console.log('map finished loading!');
  Materialize.fadeInImage('#hello-fade');

};


// regular marker
function createMarker(position) {
   var marker = new google.maps.Marker({
   position: position,
   animation: google.maps.Animation.DROP,
   map: map
 });

};


// vampire marker
var vamp = "/assets/vampire-icon-2.png"
function vampMarker(position) {
  var marker = new google.maps.Marker({
   position: position,
   animation: google.maps.Animation.DROP,
   map: map,
   icon: vamp
 });
}


// haven marker
var haven = {
  url: "/assets/coffin-icon-4.png",
};
function havenMarker(position) {
   var marker = new google.maps.Marker({
   position: position,
   animation: google.maps.Animation.DROP,
   map: map,
   icon: haven
 });

}

// blood marker
var blood = {
  url: "/assets/blood-icon-7.png",
};
function bloodMarker(position) {
  var marker = new google.maps.Marker({
   position: position,
   animation: google.maps.Animation.DROP,
   map: map,
   icon: blood
 });

}



