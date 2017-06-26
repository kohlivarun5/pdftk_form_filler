'use strict';

const pdfFiller   = require( 'node-pdffiller' );
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  accessKeyId: 'AKIAIK3KOW5ILAEFVSIQ',
  secretAccessKey: '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' 
});
var s3 = new AWS.S3();

const SOURCE_FILE_OF_NAME = {
  "I539" : {
    "path" : "forms/i539.pdf"
  }
};

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (event.httpMethod) {
        case 'GET':
          var sourcePDF = SOURCE_FILE_OF_NAME[event.queryStringParameters.form_name].path;
          pdfFiller.generateFDFTemplate(sourcePDF, function(err,fdfData) {
            console.log(err,fdfData);
            done(err,fdfData);
          });
          break;

        case 'POST':
          var body = JSON.parse(event.body);
          console.log(body);
          var sourcePDF = SOURCE_FILE_OF_NAME[body.form_name].path;
          var id = context.requestId;
          var destinationPDF = "/tmp/${id}.pdf";
          pdfFiller.fillForm(
            sourcePDF, destinationPDF, body.form_data, function(err) { 
              fs.readFile(destinationPDF, function (err, data) {
                if (err) { return done(err,"Failed to read!"); }
              
                var base64data = new Buffer(data, 'binary');
              
                var params = {Bucket: 'pdftkapi-output', Key: id, Body:base64data};
                s3.upload(params, done);
              });
          });
          break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};

