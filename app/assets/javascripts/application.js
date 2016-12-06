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

$(document).ready(function(){

	if ("geolocation" in navigator){
	  navigator.geolocation.getCurrentPosition(onLocation, onError);
	}	


 	$('.parallax').parallax();
  $(".button-collapse").sideNav();
  $('.slider').slider({full_width: true});
  $('select').material_select();

  $("#human").on("click", intoHuman);
	$("#vampire").on("click", intoVampire);

  $(window).on("scroll", changeNavbar);

  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();

  $('.collapsible').collapsible();
});


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

  var myPosition = {
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
    zoom: 16,
    mapTypeId: 'hybrid',
    // displays a mixture of normal and satellite views
    scrollwheel: false, 
    // so that the map doesn't zoom while you're scrolling down the page
    gestureHandling: 'cooperative' 
    // sets the gesture handling mode to 'cooperative',
    // which means that on a mobile device, the user must swipe with one
    // finger to scroll the page and two fingers to pan the map.
  };

  map = new google.maps.Map($('#map-canvas')[0], mapOptions);
  createMarker(position);
  createMarker({lat: 25.8068102, lng: -80.201181});


  google.maps.event.addListenerOnce(map, 'tilesloaded', showHello);
 

  infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.textSearch({
          location: {lat: position.lat, lng: position.lng},
          radius: 1000,
          query: ['blood' + 'bank']
        }, callback);

}



function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
          console.log(results[i]);
          createMarker(results[i].geometry.location);
      }
    }
}


function showHello (event) {
  console.log('map finished loading!');
  Materialize.fadeInImage('#hello-fade');
}


function createMarker(position) {
  var marker = new google.maps.Marker({
   position: position,
   map: map
 });
}


function changeNavbar(){
  if($(window).scrollTop() > 60) {
            $("nav").addClass("active");
        } else {
           $("nav").removeClass("active");
        }
}



