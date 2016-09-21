Parse.Cloud.run("personalDonations").then(function(temp) {
  var node = document.createElement("p");
  var textnode = document.createTextNode("youve contributed $" + (temp || "0"));
  node.appendChild(textnode);
  document.getElementById("summary").appendChild(node);
})

Parse.Cloud.run("totalDonations").then(function(total) {
  var node = document.createElement("p");
  var textnode = document.createTextNode("we have raised $" + (total || "0"));
  node.appendChild(textnode);
  document.getElementById("summary").appendChild(node);
})
