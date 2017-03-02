var yelp = require("node-yelp");
 
var client = yelp.createClient({
  consumer_key: 'r4398R0p_QsYtAAGGKbtCQ',
  consumer_secret: '42LcpXrFyul5tsnDATsX4d3hKV0',
  token: 'OFSdJ8SDrc1wqoruhiXnKiFDH-iLKOh6',
  token_secret: '3czB4yWh_u3OvJ60kMoC7MkV4Yc',
})

 
// See http://www.yelp.com/developers/documentation/v2/search_api 
 


module.exports = function(app) {
  app.post('/api/yelp', function(req, res) {
      var loc = req.body.address;
      console.log(loc);
      client.search({
        terms: "golf course",
        location: loc
      }).then(function(data) {
        console.log(data)
      })
  })
}