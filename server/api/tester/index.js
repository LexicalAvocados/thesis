const express = require('express');
const db = require('../../../db');
const Option = db.Option;
const router = express.Router();
const base64Img = require('base64-img');
const request = require('request-promise-native');
const imageDataURI = require('image-data-uri');
const path = require('path');


// Option.create({
// 	name: 'Test Video',
// 	description: 'Video used to test users for playing youtube video',
// 	youtubeUrl: 'https://www.youtube.com/watch?v=8A3R_xz7nJQ&list=LL_uyk3EWD4JyUBgDCCfLLTQ&index=26',
// 	thumbnail: 'asdf',
// 	length: 100
// })

router.get('/getVideo', (req, res) => {
	Option.findAll({
		where: {
			id: 1
		}
	})
		.then(data => {
      res.send(data);
    })
})

router.post('/sendFrame', (req, res) => {
  console.log(req.body);
  let idx = 0;
  let BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
  base64Img.img(Object.keys(req.body)[0], 'photos', idx++, function(err, filepath) {
    console.log('testing url', `${BASE_URL}/api/tester/photo/test`);

    // if successfully saved photos then, make api call to azure
    if(!err) {
      request({
        method: 'POST',
        url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
        headers: { 'Ocp-Apim-Subscription-Key': '4fc26d1500d04025a699f1ae74597ab3',
          "Content-Type": "application/json" },
        body: JSON.stringify({
          url: `${BASE_URL}/api/tester/photo/${idx - 1}`,
        })
      })
      .catch(err => console.log(err))
      .then(result => {
        result = JSON.parse(result);
        console.log('RESPONSE: ', result);
        res.send(JSON.stringify({result: result, photoId: (idx - 1)}));
      })
    } else {
      res.send(JSON.stringify({result: 'unable to save image'}));
    }
  });

  // imageDataURI.outputFile(req.body, filePath)

})

router.get('/photo/:id', function(req, res) {
  console.log("sending photooooo")
  res.sendFile(path.resolve('photos/' + req.params.id + '.png'));
})

module.exports = router;