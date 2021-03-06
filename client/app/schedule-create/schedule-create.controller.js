'use strict';

angular.module('doingFineApp')

  .controller('ScheduleCreateCtrl', function ($scope, Schedule, $state) {
    //verify that data from '/publisher-create' state persists through Schedule factory
    console.log(Schedule.schedule);

    $scope.schedule = Schedule.schedule;

    //TIME PICKER

    $scope.schedule.times = new Date();

    $scope.hstep = 1;
    $scope.mstep = 1;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.schedule.times = d;
    };

    $scope.clear = function() {
      $scope.schedule.times = null;
    };

    //DAY PICKER

    $scope.days = [
      {name: 'Monday', value: 1},
      {name: 'Tuesday', value: 2},
      {name: 'Wednesday', value: 3},
      {name: 'Thursday', value: 4},
      {name: 'Friday', value: 5},
      {name: 'Saturday', value: 6},
      {name: 'Sunday', value: 0}
    ];

    $scope.schedule.days = [0,1,2,3,4,5,6];

    // toggle selection for a given day by name
    $scope.toggleDay = function toggleDays(day) {
      var index = $scope.schedule.days.indexOf(day.value);

      // is currently selected
      if (index > -1) {
        $scope.schedule.days.splice(index, 1);
      }

      // is newly selected
      else {
        $scope.schedule.days.push(day.value);
      }
    };

    //FORM SUBMISSIONS

    //boolean used to toggle schedule setup and confirmation screens
    $scope.submitted = false;

    $scope.submit = function(form){
      if(form.$valid){
        var minutes = ($scope.schedule.times.getMinutes() < 10 ? '0' : '') + $scope.schedule.times.getMinutes();


        Schedule.schedule.times = [$scope.schedule.times.getHours() + ':' + minutes];

        Schedule.submit($scope.schedule);
        $state.go('followers');
        //Do AJAX request that sends object in the following format (coming from schedule Schema):
        //{
        //   days: [Number], //0 = Sunday, 1 = Monday, etc...
        //   times: [String], //24-hour format eg. 20:17
        //   publisherPhone: String,
        //   publisherName: String,
        //   subscriberPhone: String,
        //   subscriberName: String,
        //   subscriberID: String
        // }

        // console.log(Schedule.schedule);


      }
    };

  });
