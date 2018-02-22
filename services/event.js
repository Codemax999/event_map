angular.module('serviceEvent', [])
.service('$event', function($http) {

     // --- EVENT DATA ---
     // all events 
     const events = []

     // get all events and add to array
     $http.get('data/events.json').then(res => res.data.events.map(x => events.push(x)))


     // --- GET EVENTS ---
     // get all events sorted by date
     this.getAll = () => events.sort((a, b) => a.date - b.date)

     // get all last to first
     this.getAllReverse = () => events.sort((a, b) => b.date - a.date)

     // get events that are upcoming
     this.getUpcoming = () => events.filter(a => a.date >= new Date())

     // get events that are past 
     this.getPast = () => events.filter(a => a.date < new Date())
})