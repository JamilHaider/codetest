var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
 
  if(!req.body['payload']){
  	res.status(400);
  	var out = {"error": "Could not decode request: JSON parsing failed"}
  	res.send(out)
  	return
  }
  
  filtered = req.body['payload'].filter(x => {
  		return (x['workflow'] === 'completed') && (x['type'] === 'htv');
  })

  mapped = filtered.map(x => {
  	var out = {};
  	var address = x['address']
  	out['concataddress'] = `${address['buildingNumber']} ${address['street']} ${address['suburb']} ${address['state']} ${address['postcode']}`
  	out['type'] = x['type']
  	out['workflow'] = x['workflow']
  	return out;
  })

  var response = {}
  response['response'] = mapped
  
  res.send(JSON.stringify(response))

});


module.exports = router;
