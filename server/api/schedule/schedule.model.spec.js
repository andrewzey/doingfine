'use strict';

var should = require('should');
var app = require('../../app');
var Schedule = require('./schedule.model');

var schedule = new Schedule({
  days: [1, 2, 3],
  times: ['06:20'],
  active: true,
  phone: '5555555555'
});

describe('Schedule Model', function() {
  before(function(done) {
    // Clear schedules before testing
    Schedule.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Schedule.remove().exec().then(function() {
      done();
    });
    schedule = new Schedule({
      days: [1, 2, 3],
      times: ['06:20'],
      active: true,
      phone: '5555555555'
    });
  });

  it('should begin with no schedules', function(done) {
    Schedule.find({}, function(err, schedules) {
      schedules.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate schedule', function(done) {
    schedule.save(function() {
      var scheduleDup = new Schedule(schedule);
      scheduleDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without days', function(done) {
    schedule.days = [];
    schedule.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving a phone number thats too short', function(done) {
    schedule.phone = '+5555555';
    schedule.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving a phone number thats too long', function(done) {
    schedule.phone = '+3838438483483848345555555';
    schedule.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving a phone number that doesnt start with +', function(done) {
    schedule.phone = '122345678901';
    schedule.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving a phone number with second char 1', function(done) {
    schedule.phone = '+22345678901';
    schedule.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without times', function(done) {
    schedule.times = [];
    schedule.save(function(err) {
      should.exist(err);
      done();
    });
  });
});