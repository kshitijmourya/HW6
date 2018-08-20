'use strict';

var Widget = require('../models/Widget/widget.model.server');
var View = require('../models/View/view.model.server');

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    View.find(function (err, applications) {
        if (err) res.send(err);else res.json(applications);
    });
});

router.get('/:vid', function (req, res) {
    View.findById(req.params.wid).populate('widgets').exec().then(function (a) {
        return res.json(a);
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

router.put('/:vid', function (req, res) {
    View.findByIdAndUpdate(req.params.vid, req.body, { 'new': true }).exec().then(function (v) {
        return res.json(v);
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

router.delete('/:vid', function (req, res) {
    View.findByIdAndRemove(req.params.vid).then(function (v) {
        return v.widgets.forEach(function (wid) {
            return Widget.findByIdAndRemove(wid).catch(function (err) {
                return Promise.reject(err);
            });
        });
    }).then(function () {
        return res.status(204).send();
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

// for widget
router.get('/:vid/widget', function (req, res) {
    View.findById(req.params.vid).populate('widgets').exec().then(function (v) {
        return res.json(v.widgets || []);
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

router.post('/:vid/widget', function (req, res) {
    var widget = new Widget(req.body);
    widget.save().then(function (w) {
        return View.findByIdAndUpdate(req.params.vid, { '$push': { widgets: w.id } }, { 'new': true }).exec().then(function () {
            return res.json(w);
        });
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

router.put('/:vid/widget/:wid', function (req, res) {
    Widget.findByIdAndUpdate(req.params.wid, req.body, { 'new': true }).exec().then(function (w) {
        return res.json(w);
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

router.delete('/:vid/widget/:wid', function (req, res) {
    Widget.findByIdAndRemove(req.params.wid).then(function () {
        return res.status(204).send();
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

module.exports = router;
//# sourceMappingURL=view.js.map
