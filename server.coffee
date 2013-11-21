
# deps
api = require './api'
index = require './index'
express = require 'express'
os = require 'os'

# configuration
config =
	host: 'contributor.io'
	port: process.env.PORT or 5000
	static: ['css', 'js', 'img']

# configure server
app = do express
#app.use do express.logger

# (sub)domains
app.use express.vhost "www.#{config.host}", index.app
app.use express.vhost "api.#{config.host}", api.app

# static resources
for route in config.static
	app.use "/#{route}", express.static "#{__dirname}/#{route}"

# start server
app.listen config.port
