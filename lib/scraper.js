#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var io = require('node.io');

var rootPath = path.join(__dirname, '../Demo');
var localHost = '127.0.0.1:8080';

var data = {};

var years = fs.readdirSync(rootPath).filter(dot).filter(file('server.js'));
var meetings = years.forEach(function(y) {
    var p = path.join(rootPath, y);
    var months = fs.readdirSync(p).filter(dot);

    // XXX: hack for testing
    var months = [months[0]];

    months.forEach(function(m) {
        io.scrape(function() {
            var addr = 'http://' + localHost + '/' + y + '/' + m + '/index.htm';
            addr = addr.replace(/([ ])/g, '%20');

            this.getHtml(addr, function(err, $) {
                if (err) throw err;
                console.log('worky worky');
                //var $a = $('a').forEach(function(k) {console.log(k)});

                this.emit('ok'); //$a);
            });
        });
    })
});

function dot(v) {
    return v[0] != '.';
}

function file(name) {
    return function(v) {
        return v != name;
    }
}

