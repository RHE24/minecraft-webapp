window.map = new Map(json.points);
window.toolbar = new Toolbar;
window.chat = new Chat;
$('body').append(map.$el);
$('body').append(toolbar.$el);
$('body').append(chat.$el);
Poll.getInstance().start()








// Get Data
// var myDataRef = new Firebase('https://incandescent-fire-4522.firebaseio.com');

// myDataRef.once('value', function (snapshot) {
//     window.map = new Map(snapshot.val().points);
//     window.toolbar = new Toolbar;
//     window.chat = new Chat;
//     $('body').append(map.$el);
//     $('body').append(toolbar.$el);
//     $('body').append(chat.$el);
//     window.poll.start()
// });

// var something = snapshot.val();

window.ip = 'no-ip';
function getip(json){
  window.ip = json.ip // alerts the ip address
}




// jsonapi.call('broadcastWithName', ['hi','seth'], function (data) {
//     console.log(data);
// });





// var exampleSocket = new WebSocket("");

// var source = new EventSource('http://67.222.234.99:20060/api/subscribe?source=chat&key=abcf219028cde834228888e01d014ae5e5abb12a36c904e78749972cdf17fdca');

// exampleSocket.onmessage = function (event) {
//   console.log(event);
// }


// source.addEventListener('message', function(e) {
//   console.log(e);
// }, false);

// source.addEventListener('open', function(e) {
//   // Connection was opened.
// }, false);

// source.addEventListener('error', function(e) {
//   if (e.readyState == EventSource.CLOSED) {
//     // Connection was closed.
//   }
// }, false);



