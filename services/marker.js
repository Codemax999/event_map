angular.module('serviceMarker', [])
.service('$marker', function() {

     // --- MAP ---
     // mapObj
     let map

     // set map and clear map
     this.setMap = mapObj => map = mapObj
     this.clearMap = () => markers.map(x => x.setMap(null))


     // --- MAP MARKERS ---
     // all markers and map bounds
     const markers = []
     const bounds = new google.maps.LatLngBounds()

     // get bounds to display map in area
     this.setBounds = () => setTimeout(() => map.fitBounds(bounds), 500)

     // add map marker for all events
     this.createMarker = (lat, lng, id) => {

          return new Promise((resolve, reject) => {

               // marker
               const markerPos = new google.maps.LatLng(lat, lng);
               const marker = new google.maps.Marker({
                    animation: google.maps.Animation.DROP,
                    position: markerPos,
                    map: map,
                    icon: 'img/place-icon.svg'
               })

               // add to bounds and markers and resolve
               bounds.extend(marker.position)
               markers[id] = marker
               resolve(marker)
          })
     }


     // --- MARKER INFO WINDOW ---
     // currently selected info window
     let selectedInfo = null

     // open marker info window
     this.openInfoWindow = index => google.maps.event.trigger(markers[index], 'click')
     
     // create info window
     this.createInfoWindow = title => {
          return new Promise((resolve, reject) => {
               const infowindow = new google.maps.InfoWindow({
                    content: title
               })
               resolve(infowindow)
          })
     }


     // --- MARKER LISTENER ---
     // marker click listener: pan map and zoom in
     this.addMarkerListener = (marker, info) => {
          google.maps.event.addListener(marker, 'click', () => {
               map.panTo(marker.getPosition())
               map.setZoom(14)
               if (selectedInfo) selectedInfo.close()
               selectedInfo = info
               info.open(map, marker)
          })
     }


     // --- UPDATE MARKERS ---
     // on load and sort update markers
     this.updateMarkers = events => { 

          // clear previous markers
          this.clearMap()

          // set and reset bounds
          this.setBounds()

          // add new
          events.map(x => {

               // marker
               this.createMarker(x.lat, x.lng, x.id)
               .then(marker => {

                    // info window and click listener
                    this.createInfoWindow(x.name)
                    .then(info => this.addMarkerListener(marker, info))
               })
          })
     }
})