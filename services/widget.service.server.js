'use strict';

var Widget = require('../models/Widget/widget.model.server');

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    Widget.find(function (err, widgets) {
        if (err) res.send(err);else res.json(widgets);
    });
});

router.get('/:wid', function (req, res) {
    Widget.findById(req.params.wid, function (err, widget) {
        if (err) res.send(err);else res.json(widget);
    });
});

router.post('/', function (req, res) {
    var d = new Widget({ username: req.body.username });
    d.save(function (err, widget) {
        if (err) res.send(err);else res.json(widget);
    });
});

router.put('/:wid', function (req, res) {
    console.log('call wid');
    console.log(req.params, req.body);
    Widget.findByIdAndUpdate(req.params.wid, req.body, { 'new': true }).then(function (w) {
        return res.json(w);
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

router.delete('/:wid', function (req, res) {
    Widget.findByIdAndRemove(req.params.wid).then(function () {
        return res.status(204).send();
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

module.exports = router;
//# sourceMappingURL=widget.js.map
