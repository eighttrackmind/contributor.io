// Generated by CoffeeScript 1.6.3
(function() {
  var apis, contributor, promise, _;

  _ = require('lodash');

  promise = require('when');

  apis = {
    gem: require('gem-count'),
    github: require('github-repos'),
    npm: require('npm-packages'),
    cpan: require('cpan-count')
  };

  contributor = function(identities) {
    var counts, deferred, done, have, need;
    if (identities == null) {
      identities = {};
    }
    deferred = promise.defer();
    counts = {};
    have = 0;
    need = 0;
    done = function(platform, count) {
      counts[platform] = count;
      if (++have === need) {
        return deferred.resolve(counts);
      } else {
        return deferred.notify(counts);
      }
    };
    _.each(apis, function(fn, platform) {
      if (platform in identities) {
        ++need;
        return fn(identities[platform]).then(function(count) {
          return done(platform, count);
        }, deferred.reject);
      }
    });
    return deferred.promise;
  };

  module.exports = contributor;

}).call(this);
