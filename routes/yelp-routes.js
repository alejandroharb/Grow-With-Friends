// Request API access: http://www.yelp.com/developers/getting_started/api_access 
var merge = require('merge');
var yelp = require('node-yelp-api');
 
var options = {
  consumer_key: 'r4398R0p_QsYtAAGGKbtCQ',
  consumer_secret: '42LcpXrFyul5tsnDATsX4d3hKV0',
  token: 'OFSdJ8SDrc1wqoruhiXnKiFDH-iLKOh6',
  token_secret: '3czB4yWh_u3OvJ60kMoC7MkV4Yc',
};
 
// See http://www.yelp.com/developers/documentation/v2/search_api 
var parameters = {
  term: 'golf',
  location: 'Houston',
};


yelp.search(merge(options, parameters), (data) => {
  console.log(data);
}, (err) => {
  console.error(err);
});