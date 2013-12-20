'use strict';

describe('Service: Cosearchresults', function () {

  // load the service's module
  beforeEach(module('ksCrPocApp'));

  // instantiate service
  var Cosearchresults;
  beforeEach(inject(function (_Cosearchresults_) {
    Cosearchresults = _Cosearchresults_;
  }));

  it('should do something', function () {
    expect(!!Cosearchresults).toBe(true);
  });

});
