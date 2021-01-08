const con = require('../database/dbConnection')
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: 'YourKey',
  }),
  serviceUrl: 'YourURL',
});

function getComments(req, res) {
    con.query('SELECT * FROM Comentario', (err, row, field)=>{
        if(!err){
            res.status(200).send(row);
        }
        else
            res.status(400).send('Failed!');
    });
}

function postComments(req, res) {
    var comentario = req.body.text;
    var sql = 'INSERT INTO Comentario(text) values(?)'

    con.query(sql, comentario, (err, row, field)=>{
        if(!err){
            res.status(200).send(row);
        }
        else
            res.status(401).send('Failed!');
    });
}

function postAudio(req, res) {
    var id = req.body.id;
    var text = req.body.text;

    var synthesizeParams = {
        text: text,
        accept: 'audio/wav',
        voice: 'pt-BR_IsabelaV3Voice',
    };

    textToSpeech.synthesize(synthesizeParams)
    .then(response => {
        return textToSpeech.repairWavHeaderStream(response.result);
    })
    .then(buffer => {
        fs.writeFileSync('audio/audio' + id + '.wav', buffer);
        res.status(200).send('/audio/audio' + id + '.wav');
    })
    .catch(err => {
        console.log('error:', err);
        res.status(400).send('Failed!');
    });
}

module.exports = {
    getComments,
    postComments,
    postAudio
}