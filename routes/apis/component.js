var Application = require('../../models/application/application.model.server');
var Component = require('../../models/component/component.model.server');

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    Component.find((err, components) => {
        if (err) res.send(err);
        else res.json(components)
    });
});

router.get('/:cid', (req, res) => {
    Component.findById(req.params.cid)
        .populate({
            path: 'view',
            populate: {path: 'widgets'}
        })
        .populate('controller')
        .then(c => res.json(c))
        .catch(err => res.status(503).send(err))
});

router.put('/:cid', (req, res) => {
    Component.findByIdAndUpdate(req.params.cid,
        {name: req.body.name},
        {'new': true})
        .exec()
        .then(a => res.json(a))
        .catch(err => res.status(503).send(err));
});

router.delete('/:cid', (req, res) => {
    Component.findByIdAndRemove(req.params.cid)
        .exec()
        .then(() => res.status(204).send())
        .catch(err => res.status(503).send(err));
});

// for view
router
    .get('/:cid/view', (req, res) => {
        Component.findById(req.params.cid)
            .populate({
                path:'view',
                populate:{path:'widgets'
                }})
            .exec()
            .then(c => res.json(c.view))
            .catch(err => res.status(503).send(err));
    })
    .post('/:cid/view', (req, res) => {
        const view = new View(req.body);
        view.save()
            .then(v => Component.findByIdAndUpdate(
                req.params.cid,
                {'$set': {view: v.id}},
                {'new': true})
                .exec()
                .then(() => res.json(v)))
            .catch(err => res.status(503).send(err));
    });

module.exports = router;
