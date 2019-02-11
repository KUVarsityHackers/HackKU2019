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

var query = firebase.database().ref('users/'+hobo);
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      // console.log(key, childData);
      var sq = firebase.database().ref('items/'+childData.item);
      a = {};
      var record = "";
      sq.once("value")
        .then(function(snapshot) {
          var val = snapshot.val();
          // console.log(snapshot.val());
          intprice = parseInt(val.value);
          intquant = parseInt(childData.quantity);
          a.price = String(intprice.toFixed(2));
          a.name = val.name;
          // console.log(a.price, a.name);
          console.log("a in the func ", a);
        }).then(function(){
          console.log("a after ", a);
          var cbox = '<tr><input type="checkbox" name="vehicle"> I have a bike<br></br></tr>';
          record = "<tbody><tr><th>" + a.name + "</th><th>" + childData.quantity + "</th><th>$" + a.price + "</th></tr>" + cbox+ "</tbody>";
          console.log(record)
          // var cbox = '<tr><input type="checkbox" name="vehicle" value="Bike"> I have a bike<br></br></tr>';
          $("#redeem-table").append(record);
          // $("#redeem-table").append(cbox);

          
          
        });
    });
    
})

// $("#pay").click(function(){
//   query.remove();
//   window.location.href = "./donorPayment.html";
// })

