// Generated by CoffeeScript 1.6.3
var api, app, config, express, index, os, route, _i, _len, _ref;

api = require('./api');

index = require('./index');

express = require('express');

os = require('os');

config = {
  host: 'contributor.io',
  port: process.env.PORT || 5000,
  "static": ['css', 'js', 'img']
};

app = express();

app.use(express.vhost("www." + config.host, index.app));

app.use(express.vhost("api." + config.host, api.app));

_ref = config["static"];
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  route = _ref[_i];
  app.use("/" + route, express["static"]("" + __dirname + "/" + route));
}

app.listen(config.port);
