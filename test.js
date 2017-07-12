const pdftkapi = require('./index.js');

const context = {
  awsRequestId : "test_I539"
};

pdftkapi.handler({
  httpMethod : "GET",
  queryStringParameters : {
    form_name : "I539"
  }
},context,function(err,msg) {
  console.log(err,msg);
});


pdftkapi.handler({
  httpMethod : "POST",
  body : JSON.stringify({
    form_name : "I539",
    form_data : {
      "form1[0].#subform[1].P4_Line1a_CountryOfIssuance[0]" : "INDIA"
    }
  })
},context,function(err,msg) {
  console.log(err,msg);
});
