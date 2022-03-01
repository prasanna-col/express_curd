var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  return res.json({
    message: "User not available",
    response: null
});
  // res.send('respond with a resource');
});

module.exports = router;
