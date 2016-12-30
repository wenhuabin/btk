require('../scss/home/mindex.scss');
var template = require('../template.js');


var data = {
    hello: "hello world!"
};

window.onload = function(){
    //render();
};

function render(){
    var html = template('tpl', data);
    document.getElementById('content').innerHTML = html;
}
