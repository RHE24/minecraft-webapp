
var map = new Map(json.points);
var toolbar = new Toolbar;
var chat = new Chat;

$('body').append(map.$el);
$('body').append(toolbar.$el);
$('body').append(chat.$el);

window.ip = 'no-ip';
function getip(json){
  window.ip = json.ip // alerts the ip address
}
