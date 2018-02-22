angular.module('mainMap', ['serviceEvent', 'serviceMarker'])
.controller('MapCtrl', function($event, $marker, $document) {

     // --- MAP ---
     // map object
     const mapObj = $document[0].querySelector('#map')
     const map = new google.maps.Map(mapObj, {})

     // set map for marker reference
     $marker.setMap(map)


     // --- MAP ITEMS ---
     // get all events and create markers
     $marker.updateMarkers($event.getAll())
})