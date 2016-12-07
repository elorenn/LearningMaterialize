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

  $('.scrollspy').scrollSpy();
 	$('.parallax').parallax();
  $(".button-collapse").sideNav({
      //menuWidth: 200, // Default is 240
      // edge: 'right',
      closeOnClick: true,
    });

  $('.collapsible').collapsible();
  $('.slider').slider({full_width: true});
  $('select').material_select();

  $("#human").on("click", intoHuman);
	$("#vampire").on("click", intoVampire);

  $(window).on("scroll", changeNavbar);

  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();


});


function intoHuman (event) {
	event.preventDefault();
	console.log("User is a human");
	
  $("#bank-text-human").toggle();
  $("#bank-text-vampire").toggle();

	$(".hello-vampire").toggle();
	$(".hello-human").toggle();

	$(".vampire-form").toggle();
	$(".human-form").toggle();

}

function intoVampire (event) {
	event.preventDefault();
	console.log("User is a vampire");
	
  $("#bank-text-human").toggle();
  $("#bank-text-vampire").toggle();

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
    zoom: 13,
    mapTypeId: 'hybrid', // displays a mixture of normal and satellite views
    scrollwheel: false, // so that the map doesn't zoom while you're scrolling down the page
    gestureHandling: 'cooperative' 
      // sets the gesture handling mode to 'cooperative',
      // which means that on a mobile device, the user must swipe with one
      // finger to scroll the page and two fingers to pan the map.
  };

  map = new google.maps.Map($('#map-canvas')[0], mapOptions);
  createMarker(position);
  createMarker({lat: 25.8068102, lng: -80.201181});


  google.maps.event.addListenerOnce(map, 'tilesloaded', showHello);

  marker.addListener('click', function() {
          map.setZoom(8);
          map.setCenter(marker.getPosition());
        });

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
          
          createMarker(results[i].geometry.location);  

          name = results[i].name
          address = results[i].formatted_address
          // isOpen = results[i].opening_hours.open_now
          //firstPhoto = results[i].photos[0].html_attributions[0]
          //var website = 
          // var phone =     
          console.log(results[i]);
          console.log(name);
          console.log(address);
          // console.log(isOpen);
          //console.log(firstPhoto);
        
        // $(".js-blood-name").text(name);
        // $(".js-blood-address").text(address);


          // $(".js-bank-header").text('Blood Banks:');
          // $(".js-bank-text").text('Blah blah blah');
          $(".js-card-row").append(

                  `<div class="col s12 m6 l4">
                    <div class="card horizontal">
                        <div class="card-image">
                          <a href="#">
                          <img src="assets/donate.png">
                          </a>                
                        </div>
                        <div class="card-stacked">
                          <div class="card-content">
                            <strong><p class="js-blood-name">${name}</p></strong>
                            <div class="divider"></div>
                            <p class="js-blood-address">${address}</p>
                          </div>
                         </div> <!-- stacked -->                  
                      </div> <!-- card -->
                  </div> <!-- col -->`
          );

      }
    }
}


function showHello (event) {
  console.log('map finished loading!');
  Materialize.fadeInImage('#hello-fade');

}


function createMarker(position) {
   marker = new google.maps.Marker({
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

