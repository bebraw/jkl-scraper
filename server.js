#!/usr/bin/env node

var path = require('path');

var connect = require('connect');
connect.createServer(connect.static(
            path.join(__dirname, 'Demo'),
            {maxAge: 0},
            function(req, res) {
                res.setHeader('Content-Type', 'text/html');
                res.setHeader('Accept-Charset', 'iso-8859-1');
            }
            )).listen(8080);

