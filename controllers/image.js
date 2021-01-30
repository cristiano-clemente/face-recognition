const app = new Clarifai.App({
    apiKey: '0e72977a1219407384717c72f1741830'
});

const handleApiCall = clarifai => (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json("unable to work with api"))
}

const handleImage = knex => (req, res) => {
    const { id } = req.body;
    knex('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleApiCall: handleApiCall,
    handleImage: handleImage
}