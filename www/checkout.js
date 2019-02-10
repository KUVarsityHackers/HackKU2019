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

var query = firebase.database().ref('cart/'+id+'/'+hobo);
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      // console.log(key, childData);
      var sq = firebase.database().ref('items/'+childData.item);
      a = {};
      var record = "";
      var cost = 0;
      sq.once("value")
        .then(function(snapshot) {
          var val = snapshot.val();
          // console.log(snapshot.val());
          intprice = parseInt(val.value);
          intquant = parseInt(childData.quantity);
          cost = cost + (intprice*intquant);
          a.price = String(intprice.toFixed(2));
          a.name = val.name;
          // console.log(a.price, a.name);
          console.log("a in the func ", a);
        }).then(function(){
          console.log("a after ", a);
          record = "<tbody><tr><th>" + a.name + "</th><th>" + childData.quantity + "</th><th>$" + a.price + "</th></tr></tbody>";
          $("#checkout-table").append(record);
          $("#total-cost").html('$'+ cost.toFixed(2));
        });
    });
});
