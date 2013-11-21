// Generated by CoffeeScript 1.6.3
var api, app, config, express, index, route, _i, _len, _ref;

api = require('./api');

index = require('./index');

express = require('express');

config = {
  port: process.env.PORT || 5000,
  "static": ['css', 'js', 'img']
};

app = express();

app.use(express.logger());

app.use(index.app);

app.use(api.app);

_ref = config["static"];
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  route = _ref[_i];
  app.use("/" + route, express["static"]("" + __dirname + "/" + route));
}

app.listen(config.port);
