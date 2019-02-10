var config = {
    apiKey: "AIzaSyARS9LFtCcuxdKxgvoejWKJMU1DauaDwOM",
    authDomain: "homelesshelper.firebaseapp.com",
    databaseURL: "https://homelesshelper.firebaseio.com",
    projectId: "homelesshelper"
  };
firebase.initializeApp(config);
console.log("js loaded");

var hobo = getCookie("hobo");
var id = getCookie("id");

// var hobo = "HOBO7";
// var id = "-LYLYJs6Ou_ZadX_DApv";

$("#pay").click(function(){
  var numstr = String($("#phone_number").val());
  if(numstr.length > 10){
    numstr = numstr.slice(0,10);
  }
  else if(numstr.length < 10){
    numstr = "0000000000";
  }
  var query = firebase.database().ref('cart/'+id+'/'+hobo);
  query.once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        childData.phone = numstr;
        console.log(childData);
        var myRef = firebase.database().ref('users/'+hobo);
        myRef.push(childData);
      })
  }).then(function(){
    console.log("hello");
    window.location.replace('./mappingPage.html');  
  });
})
