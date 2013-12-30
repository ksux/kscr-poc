'use strict';

describe('Service: Termsservice', function () {

  // load the service's module
  beforeEach(module('kscrPocApp'));

  // instantiate service
  var Termsservice;
  beforeEach(inject(function (_Termsservice_) {
    Termsservice = _Termsservice_;
  }));

  it('should do something', function () {
    expect(!!Termsservice).toBe(true);
  });

});
