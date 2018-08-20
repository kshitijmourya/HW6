var Application = require('../../models/application/application.model.server');
var Component = require('../../models/component/component.model.server');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    Application.find((err, applications) => {
        if (err) res.send(err);
        else res.json(applications)
    });
});

router.get('/:aid', (req, res) => {
    Application.findById(req.params.aid)
        .populate('components')
        .exec()
        .then(a => res.json(a))
        .catch(err => res.status(503).send(err))
});

router.put('/:aid', (req, res) => {
    Application.findByIdAndUpdate(req.params.aid,
        {name: req.body.name},
        {'new': true})
        .exec()
        .then(a => res.json(a))
        .catch(err => res.status(503).send(err));
});

router.delete('/:aid', (req, res) => {
    Application.findByIdAndRemove(req.params.aid)
        .then(a => a.components.forEach(
            cid =>
                Component.findByIdAndRemove(cid)
                    .catch(err =>  Promise.reject(err))
        ))
        .then(() => res.status(204).send())
        .catch(err => res.status(503).send(err));
});

// for component
router.get('/:aid/component', (req, res) => {
    Application.findById(req.params.aid)
        .populate('components')
        .exec()
        .then(a => res.json(a.components))
        .catch(err => res.status(503).send(err));
});

router.post('/:aid/component', (req, res) => {
    const component = new Component({name: req.body.name});
    component.save()
        .then(c => Application.findByIdAndUpdate(
            req.params.aid,
            {'$push': {components: c.id}},
            {'new': true})
            .exec()
            .then(() => res.json(c)))
        .catch(err => res.status(503).send(err));
});

router.put('/:aid/component/:cid', (req, res) => {
    Component.findByIdAndUpdate(req.params.cid,
        req.body,
        {'new': true})
        .exec()
        .then(c => res.json(c))
        .catch(err => res.status(503).send(err));
});

router.delete('/:aid/component/:cid', (req, res) => {
    Component.findByIdAndRemove(req.params.cid)
        .then(() => res.status(204).send())
        .catch(err => res.status(503).send(err));
});

module.exports = router;
