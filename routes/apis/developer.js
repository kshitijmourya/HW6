
var Application = require('../../models/application/application.model.server');
var Developer = require('../../models/developer/developer.model.server');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    Developer.find((err, developers) => {
        if (err) res.send(err);
        else res.json(developers)
    });
});

router.get('/:did', (req, res) => {
    Developer.findById(req.params.did,
        (err, developer) =>{
        if (err) res.send(err);
        else res.json(developer);
        });
});

router.get('/:did/application', (req, res) => {
    Developer.findById(req.params.did)
        .populate('applications')
        .exec()
        .then(developer => res.json(developer.applications))
        .catch(err => res.status(503).send(err))
});


router.post('/', (req, res) => {
    const d = new Developer({username: req.body.username});
    d.save((err, developer) => {
        if (err) res.send(err);
        else res.json(developer)
    });
});

router.post('/:did/application', (req, res) => {
    const application = new Application({name: req.body.name});
    application.save()
        .then(a => Developer.findByIdAndUpdate(
            req.params.did,
            {'$push': {applications: a.id}},
            {'new': true})
            .exec()
            .then(() => res.json(a)))
        .catch(err => res.status(503).send(err));
});

router.put('/:did', (req, res) => {
    Developer.findByIdAndUpdate(req.params.did, (err, developer) => {
        if (err) res.send(err);
        else {
            developer.username = req.body.username;
            developer.save((err, d) => {
                if (err) res.send(err);
                else res.json(d);
            })
        }
    })
});

router.delete('/:did', (req, res) => {
    Developer.remove({_id: req.params.did}, (err, developer) => {
        if (err) res.send(err);
        else res.status(204).send();
    })
});

module.exports = router;
