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

  $('.collapsible').collapsible({
    onOpen: console.log("Im open")
  });



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

  // $(window).on("scroll", dropMarker);

  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();


});


// function dropMarker(argument) {
//   if ($(window).scrollTop()  > $(window).height() + 10)
//     {
//         console.log("you've reached the map section");
//         vampMarker(myPosition); 
//         // unbind the scroll event if the execution of this code is only desired once:
//         //$(this).unbind('scroll');
//     }
// }

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
          // isOpen = results[i].opening_hours.open_now
          //firstPhoto = results[i].photos[0].html_attributions[0]  
          // console.log(results[i]);
          // console.log(name);
          // console.log(address);
          // console.log(isOpen);
          
          $("#bank-list").append(

              `<p class="blood-name red-text"> 
                <strong> ${bloodName} </strong> 
              </p>

              <p class="blood-address">       
                ${bloodAddress}
              </p>`
          );  
      } // => for loop
    } // => if loop
} // => createBanks



function createHavens(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
          
          havenMarker(results[i].geometry.location);  

          havenName = results[i].name
          havenAddress = results[i].formatted_address
          havenId = results[i].place_id
        

          console.log(results[i]);
          console.log(results[i].place_id);
          console.log(results[i].name);
          console.log(results[i].formatted_address);
  

      haven-open

      $("#haven-list").append(

          `<p class="haven-name red-text"> 
            <strong> ${havenName} </strong> 
          </p>

          <p class="haven-address">       
            ${havenAddress}
          </p>`
        );
      } // => for loop
    } // => if loop
} // => createCemeteries






function showHello (event) {
  console.log('map finished loading!');
  Materialize.fadeInImage('#hello-fade');

}


// regular marker
function createMarker(position) {
   marker = new google.maps.Marker({
   position: position,
   animation: google.maps.Animation.DROP,
   map: map
 });

}


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



