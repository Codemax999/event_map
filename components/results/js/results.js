angular.module('mapResults', ['filterTruncate', 'serviceEvent', 'serviceMarker'])
.controller('ResultsCtrl', function($scope, $event, $marker) {
     
     // --- DEFAULT RESULTS DATA ---
     // add event data to cards
     $scope.events = $event.getAll()

     // display default sort
     $scope.sortSelect = 'all (newest)'


     // --- CARD HANDLERS ---
     // open info window
     $scope.openInfoWindow = index => $marker.openInfoWindow(index)

     
     // --- SORTING ---
     $scope.sort = val => {

          // determine sort type
          let sortType 
          sortType = val === 'all (newest)' ? $event.getAll() : sortType
          sortType = val === 'all (reverse)' ? $event.getAllReverse() : sortType
          sortType = val === 'upcoming' ? $event.getUpcoming() : sortType
          sortType = val === 'past' ? $event.getPast() : sortType

          // update events and markers
          $scope.sortSelect = val 
          $scope.events = sortType
          $marker.updateMarkers(sortType)
     }
})