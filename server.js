#!/usr/bin/env node

var path = require('path');

var connect = require('connect');
connect.createServer(connect.static(path.join(__dirname, 'Demo')), {encoding: 'utf-8'}).listen(8080);

