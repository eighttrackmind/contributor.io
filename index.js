// Generated by CoffeeScript 1.6.3
var app, contributor, descriptions, ejs, express, fs, highlight, _,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ = require('lodash');

contributor = require('./contributor');

express = require('express');

ejs = require('ejs');

fs = require('fs');

highlight = (require('highlight')).Highlight;

app = express();

descriptions = {
  cpan: 'CPAN username',
  gem: 'Rubygems username',
  github: 'Github username',
  npm: 'NPM username'
};

app.get('/', function(req, res) {
  return fs.readFile('package.json', function(err, pkg) {
    pkg = JSON.parse(pkg);
    return fs.readFile('templates/index.html', function(err, template) {
      var html;
      if (err) {
        throw new Error(err);
      }
      html = _.template(template.toString(), {
        name: pkg.name,
        description: pkg.description,
        support: _.pick(descriptions, function(value, key) {
          return __indexOf.call(contributor.support, key) >= 0;
        })
      });
      return res.send(html);
    });
  });
});

exports.app = app;
