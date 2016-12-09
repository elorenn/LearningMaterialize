// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require materialize-sprockets
//= require materialize/extras/nouislider

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


function fetchDirections () {

  console.log("getting directions");

      // $.ajax({
      //   type: "GET",
      //   // url of API:
      //   url: "https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood4&key=AIzaSyAHWZanoBZQrmKa3QV88EqNfbGnT0GMzSQ",
      //   // first callback (for success):
      //   success: showDirections,  
      //   // second callback (for error):
      //   error: handleError,
      // });

// origin: "{oklahoma city, ok}",
// destination: "{amarillo, tx}",
//origin: "{lat:35.467560, lng:-97.516428}",
//destination: "{lat: 35.221997, lng: -101.831297}",


console.log($(this).data("lat"));
console.log($(this).data("lng"));
var thisLat = $(this).data("lat");
var thisLng = $(this).data("lng");
console.log(myPosition);
//destination: `${thisLat},${thisLng}`,

  var tripDescription = {
    origin: myPosition,
    destination: `${thisLat},${thisLng}`,
    travelMode: "WALKING"
  };

  var directionsService = new google.maps.DirectionsService();
  directionsService.route(tripDescription, showDirections);

} // => fetchDirections


function showDirections (result, status) {
  if (status == 'OK') {
    console.log("showing the directions");
    console.log(result);

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

  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

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
  

} //createMap





function createBanks(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
          
          bloodMarker(results[i].geometry.location);  

          bloodName = results[i].name
          bloodAddress = results[i].formatted_address
          bloodId = results[i].place_id
          bloodLat = results[i].geometry.location.lat()
          bloodLng = results[i].geometry.location.lng()
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

function moveCenter () {
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

          havenName = results[i].name
          havenAddress = results[i].formatted_address
          havenId = results[i].place_id
          havenLat = results[i].geometry.location.lat()
          havenLng = results[i].geometry.location.lng()
        
        
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

          <p class="haven-address" data-lat="${havenLat}" data-lng="${havenLng}"">       
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
   marker = new google.maps.Marker({
   position: position,
   animation: google.maps.Animation.DROP,
   map: map
 });

};


// vampire marker
var vamp = "/assets/vampire-icon-2.png"
function vampMarker(position) {
   marker = new google.maps.Marker({
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
   marker = new google.maps.Marker({
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
   marker = new google.maps.Marker({
   position: position,
   animation: google.maps.Animation.DROP,
   map: map,
   icon: blood
 });

}



