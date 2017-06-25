'use strict';

const pdfFiller   = require( 'node-pdffiller' );

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
          pdfFiller.fillForm(
            sourcePDF, "complete.pdf", body.form_data, function(err) { 
              done(err,"In callback (we're done)."); 
          });
          break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};

