var $ = require('jquery');
var table_html = require('./table.html');
require('./index.css');
$("body").html(table_html);

var math = require('./math');
console.log(math);
var result = math.add(1, 2);
console.log(result);
