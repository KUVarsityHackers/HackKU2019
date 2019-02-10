var config = {
    apiKey: "AIzaSyARS9LFtCcuxdKxgvoejWKJMU1DauaDwOM",
    authDomain: "homelesshelper.firebaseapp.com",
    databaseURL: "https://homelesshelper.firebaseio.com",
    projectId: "homelesshelper"
  };
firebase.initializeApp(config);

console.log("js loaded");

var group = $('.form-group').attr('id');
console.log(group);

var query = firebase.database().ref("items").orderByChild("category").equalTo(group);
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      // console.log(key, childData);
      // console.log(childData.name);
      var o = new Option();
      $(o).html(childData.name);
      $(o).val(key);
      $("#item-list").append(o)
    });
});

for(i=1; i<=10; i++){
  var o = new Option();
  $(o).html(''+i);
  $(o).val(i);
  $("#item-quantity").append(o)
}

$("#checkout").click(function() {
  console.log("checkout button");
  console.log($("#item-list").val());
});

$("#add").click(function(){
  var item = $("#item-list").val();
  var quantity = $("#item-quantity").val();

  console.log(item);
  var hobo = getCookie("hobo");
  var id = getCookie("id");
  // console.log(id);
  // console.log(hobo);
  // console.log(item);
  // console.log(quantity);
  var myRef = firebase.database().ref('cart/' + id +'/'+hobo);
  var newData={
      item: item,
      quantity: quantity
   }
  myRef.push(newData);

})
