'use strict';

var Application = require('../models/application/application.model.server');
var Component = require('../models/component/component.model.server');

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    Application.find(function (err, applications) {
        if (err) res.send(err);else res.json(applications);
    });
});

router.get('/:aid', function (req, res) {
    Application.findById(req.params.aid).populate('components').exec().then(function (a) {
        return res.json(a);
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

router.put('/:aid', function (req, res) {
    Application.findByIdAndUpdate(req.params.aid, { name: req.body.name }, { 'new': true }).exec().then(function (a) {
        return res.json(a);
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

router.delete('/:aid', function (req, res) {
    Application.findByIdAndRemove(req.params.aid).then(function (a) {
        return a.components.forEach(function (cid) {
            return Component.findByIdAndRemove(cid).catch(function (err) {
                return Promise.reject(err);
            });
        });
    }).then(function () {
        return res.status(204).send();
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

// for component
router.get('/:aid/component', function (req, res) {
    Application.findById(req.params.aid).populate('components').exec().then(function (a) {
        return res.json(a.components);
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

router.post('/:aid/component', function (req, res) {
    var component = new Component({ name: req.body.name });
    component.save().then(function (c) {
        return Application.findByIdAndUpdate(req.params.aid, { '$push': { components: c.id } }, { 'new': true }).exec().then(function () {
            return res.json(c);
        });
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

router.put('/:aid/component/:cid', function (req, res) {
    Component.findByIdAndUpdate(req.params.cid, req.body, { 'new': true }).exec().then(function (c) {
        return res.json(c);
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

router.delete('/:aid/component/:cid', function (req, res) {
    Component.findByIdAndRemove(req.params.cid).then(function () {
        return res.status(204).send();
    }).catch(function (err) {
        return res.status(503).send(err);
    });
});

module.exports = router;
