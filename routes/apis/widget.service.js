var Widget = require('../../models/Widget/widget.model.server');

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    Widget.find((err, widgets) => {
        if (err) res.send(err);
        else res.json(widgets)
    });
});

router.get('/:wid', (req, res) => {
    Widget.findById(req.params.wid,
        (err, widget) =>{
            if (err) res.send(err);
            else res.json(widget);
        });
});


router.post('/', (req, res) => {
    const d = new Widget({username: req.body.username});
    d.save((err, widget) => {
        if (err) res.send(err);
        else res.json(widget)
    });
});

router.put('/:wid', (req, res) => {
    Widget.findByIdAndUpdate(
        req.params.wid,
        req.body,
        {'new': true})
        .then(w => res.json(w))
        .catch(err => res.status(503).send(err));
});

router.delete('/:wid', (req, res) => {
    Widget.findByIdAndRemove(req.params.wid)
        .then(() => res.status(204).send())
        .catch(err => res.status(503).send(err));
});

module.exports = router;
