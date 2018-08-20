var Widget = require('../../models/Widget/widget.model.server');
var View = require('../../models/View/view.model.server');

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    View.find((err, applications) => {
        if (err) res.send(err);
        else res.json(applications)
    });
});

router.get('/:vid', (req, res) => {
    View.findById(req.params.wid)
        .populate('widgets')
        .exec()
        .then(a => res.json(a))
        .catch(err => res.status(503).send(err))
});

router.put('/:vid', (req, res) => {
    View.findByIdAndUpdate(req.params.vid,
        req.body,
        {'new': true})
        .exec()
        .then(v => res.json(v))
        .catch(err => res.status(503).send(err));
});

router.delete('/:vid', (req, res) => {
    View.findByIdAndRemove(req.params.vid)
        .then(v => v.widgets.forEach(
            wid => Widget.findByIdAndRemove(wid)
                .catch(err => Promise.reject(err))
        ))
        .then(() => res.status(204).send())
        .catch(err => res.status(503).send(err));
});

// for widget
router.get('/:vid/widget', (req, res) => {
    View.findById(req.params.vid)
        .populate('widgets')
        .exec()
        .then(v => res.json(v.widgets || []))
        .catch(err => res.status(503).send(err));
});

router.post('/:vid/widget', (req, res) => {
    const widget = new Widget(req.body);
    widget.save()
        .then(w => View.findByIdAndUpdate(
            req.params.vid,
            {'$push': {widgets: w.id}},
            {'new': true})
            .exec()
            .then(() => res.json(w)))
        .catch(err => res.status(503).send(err));
});

router.put('/:vid/widget/:wid', (req, res) => {
    Widget.findByIdAndUpdate(
        req.params.wid,
        req.body,
        {'new': true})
        .exec()
        .then(w => res.json(w))
        .catch(err => res.status(503).send(err));
});

router.delete('/:vid/widget/:wid', (req, res) => {
    Widget.findByIdAndRemove(req.params.wid)
        .then(() => res.status(204).send())
        .catch(err => res.status(503).send(err));
});

module.exports = router;
