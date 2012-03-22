#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var Zombie = require('zombie');

var rootPath = path.join(__dirname, '../Demo');
var localHost = '127.0.0.1:8080';

var data = {};

var zombie = new Zombie();
var years = fs.readdirSync(rootPath).filter(dot).filter(file('server.js'));
var meetings = years.forEach(function(y) {
    var p = path.join(rootPath, y);
    var months = fs.readdirSync(p).filter(dot);

    // XXX: hack for testing
    var months = [months[0]];

    months.forEach(function(m) {
        var addrPrefix = 'http://' + localHost + '/' + y + '/' + m + '/';
        addrPrefix = addrPrefix.replace(/([ ])/g, '%20');
        var addr = addrPrefix + 'index.htm';
        var front = 'htmtxt0.htm'

        zombie.visit(addr, function(e, b) {
            if (e) throw e;

            var links = b.queryAll('a').map(function(k, i) {
                if(!(i % 2) == 1) return k.getAttribute('href');
            }).filter(id).filter(endsWith('.htm')).
                filter(not(endsWith('kh.htm'))).filter(not(endsWith(front))).
                filter(not(endsWith('frmtxt1.htm')));

            // front
            b.visit(addrPrefix + front, function(e, b2) {
                if (e) throw e;

                var names = b2.queryAll('.KuntaToimistoTeksti > span, .Asiateksti > span').map(function(k, i) {
                    var fontSize = k.style['font-size'];

                    if(fontSize == '11.0pt') {
                    // TODO: parse x + name
                        return k.innerHTML;
                    }
                }).filter(id);

                var otherNames = b2.queryAll('.Xmuutlasnaolijat').map(function(k, i) {
                    // TODO: parse x + name
                    return k.innerHTML;
                });
                //console.log(names);
            });

            // rest
            /*
            links.forEach(function(link) {
                var a = addrPrefix + link.substring(2, link.length);

                b.visit(a, function(e, b2) {
                    if (e) throw e;

                    console.log('inspect now');
                });
            });*/
        });
    })
});

function not(a) {
    return function(v) {
        return !a(v);
    }
}

function dot(v) {
    return v[0] != '.';
}

function file(name) {
    return function(v) {
        return v != name;
    }
}

function id(a) {
    return a;
}

function endsWith(s) {
    return function(v) {
        return v.length >= s.length && v.substr(v.length - s.length) == s;
    }
}

