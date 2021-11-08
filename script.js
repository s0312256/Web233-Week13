// Add your code here
//s0312256
//Ariana Foley
//Fall 2021


//v 4.0 read cookie on load and display
window.onload = function() {
  populateshoppinglistonload();
   displayShoppinglists();
};

//read cookie and return
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

//v. 4.0remove and format cookie
function remove_unwanted(str) {  
    
  if ((str===null) || (str===''))  
       return false;  
 else  
   str = str.toString();  
   str = str.replace(/%20/g, "");
   str = str.replace(/%24/g, "$"); 
   str = str.replace(/%7C/g, " | ");
  return str.replace(/[^\x20-\x7E]/g, '');  
}  


//v 4.0 save cookie
function savecookie()
{
  delete_cookie('konkollist');
   var date = new Date();
   //keeps for a year
    date.setTime(date.getTime() + Number(365) * 3600 * 1000);
   document.cookie = 'konkollist' + "=" + escape(shoppinglist.join(',')) + "; path=/;expires = " + date.toGMTString();
}


//v 4.0 delete cookie
function delete_cookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function populateshoppinglistonload()
{
  shoppinglist = [];
  addtocart = [];
  //load cookie into array
  var y = readCookie('konkollist');
  //remove unwanted chars and format
  y = remove_unwanted(y); 
  //spit array by comma %2C
  y = y.split('%2C');
  if (y) {
    shoppinglist = y;
   }
}


var MyItems = {
  name:"",
  price:""
};

var shoppinglist = [];

//v 3.1 addtocart empty array
var addtocart = [];

//v3.1
function changeShoppinglist(position) {
  //document.getElementById("MyList").innerHTML = shoppinglist[position];
  var arrays = shoppinglist[position];
  arrays = arrays.split(",");
    var e1 = arrays[0];
   var e2 = arrays[1];
 var ReplacedAmount = e2.replace(/\$/g,'');
  var eitem = prompt("Please enter new item", e1);
  var ecost = prompt("Please enter your name", ReplacedAmount);
  shoppinglist[position] = eitem + "," + '$' + ecost;
  displayShoppinglists();
  displayShoppingCart();
  //v 4.0 save cookie
  savecookie();
}

//v3.1
function changeShoppingCart(position) {
  document.getElementById("MyCart").innerHTML = shoppinglist[position];
  var arrays = addtocart[position];
  arrays = arrays.split(",");
    var e1 = arrays[0];
   var e2 = arrays[1];
 var ReplacedAmount = e2.replace(/\$/g,'');
  var eitem = prompt("Please enter new item", e1);
  var ecost = prompt("Please enter your name", ReplacedAmount);
  addtocart[position] = eitem + "," + '$' + ecost;
  displayShoppinglists();
  displayShoppingCart();
  //v 4.0 save cookie
   savecookie();
}

//v3.1 
function addbacktoshoppinglist(item,num) {
  //push to deleteShoppingCar
   deleteShoppingCart(num);
  shoppinglist.push(item);
  //display shoppinglist
  displayShoppinglists();
//v3.1 display displayShoppingCart() 
  displayShoppingCart(); 
  clearFocus();
  //v 4.0 save cookie
   savecookie();
}

//v 3.1 Update function addShoppinglist by adding objects
function addtoshopcart(item, num) {
    deleteShoppinglists(num);
    addtocart.push(item);
  //display shoppinglist
  displayShoppinglists();
//v3.1 display displayShoppingCart() 
  displayShoppingCart(); 
  //Clear
  clearFocus();
  //v 4.0 save cookie
   savecookie();
}

//v 3.1 Update function addShoppinglist by adding objects
function addShoppinglist(item,cost) {
  //v 3.0 declare variable for groc string
  var groc="";
  //v 3.0 v 3.0 declare variable for loop count
  var count=0;
  //v 3.0 edit value for MyItems.name
  MyItems.name=item;
  //v 3.0 edit value for MyItems.cost
  MyItems.price=cost;
  //v 3.0 for loop through object propterties and 
  for (var x in MyItems){
    if (count===1){
      groc += "$";
    }
    //add to groc string from object array item
    groc += MyItems[x];
    if (count===0){
      groc += " | ";
    }
    //increment count by 1
   count++;
  }
  //push to shoppinglist
  shoppinglist.push(groc);
  //display shoppinglist
  displayShoppinglists();
//v3.1 display displayShoppingCart() 
  displayShoppingCart(); 
  clearFocus();
  //v 4.0 save cookie
  savecookie();
}

function clearFocus()
{
  document.getElementById("item").value = "";
   document.getElementById("cost").value = "";
  document.getElementById("item").focus();
}


//v 3.1: update function displayShoppinglists() to add to cart 
function displayShoppinglists() {
var TheList = "";
var TheRow = "";
var arrayLength = shoppinglist.length;
for (var i = 0; i < shoppinglist.length; i++) {
  //v 3.1 change button name to btndelete
var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove Item" onclick="deleteShoppinglists(' + i + ')" />';
var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppinglist(' + i + ')" />';
//v 3.1 add edit button using below i index & name it btnpdate
var arrays = shoppinglist[i];
arrays = "'"+arrays+"'";
var btnaddcart =  '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping Cart" onclick="addtoshopcart('+arrays+','+ i +')" />Add</label>';
TheRow = '<li>' + shoppinglist[i] + btndelete + ' '  + btnaddcart + '</li>';
TheList += TheRow;
}
//v3.1 add Title
if (arrayLength > 0)
{
  document.getElementById("MyList").innerHTML = '<ul>' + TheList + '</ul>';
}else
{
  document.getElementById("MyList").innerHTML = '';
}
}

//v3.1
function displayShoppingCart() {
var TheList = "";
var TheRow = "";
var arrayLength = addtocart.length;
for (var i = 0; i < arrayLength; i++) {
  //v 3.1 change button name to btndelete
var btndelete =  ' <input class="button" id="remove" name="delete" type="button" value="Remove Item" onclick="deleteShoppingCart(' + i + ')" />';
//v 3.1 add edit button using below i index & name it btnpdate
var btnupdate =  ' <input class="button" name="edit" type="button" value="Edit Item" onclick="changeShoppingCart(' + i + ')" />';
var arrays = addtocart[i];
arrays = "'"+arrays+"'";
//v 3.1 add edit button using below i index & name it btnpdate
var btnaddlist =  '<label><input name="add" type="checkbox" id="adds" value="Add to Shopping List" onclick="addbacktoshoppinglist('+arrays+',' + i + ')" checked="checked"/>Add</label>';
TheRow =  "<li>" + addtocart[i] + btndelete + ' ' +  ' ' + btnaddlist + '<br></li>';
TheList += TheRow;
}
if (arrayLength > 0)
{
  document.getElementById("MyCart").innerHTML = 'Shopping Cart ' + '<br><ul>' + TheList + '</ul>';
}else{
  document.getElementById("MyCart").innerHTML = '';
}
}

//v3.1
function deleteShoppinglists(position) {
  shoppinglist.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
   //v 4.0 save cookie
  savecookie();
}
//v3.1
function deleteShoppingCart(position) {
  addtocart.splice(position, 1);
  displayShoppinglists();
  displayShoppingCart();
}




// //v 3.0 Create Objects for Shoppinglist
// // var MyItems = {
// //   name:"",
// //   price:""
// // };

// // //v 2.1: change shoppinglist array empty array
// // var shoppinglist = [];

// // //v 2.1 Update function addShoppinglist
// // //v 3.0 Update function addShoppinglist by adding objects
// // function addShoppinglist(item,cost) {
// //   //v 3.0 declare variable for groc string
// //   var groc="";
// //   //v 3.0 v 3.0 declare variable for loop count
// //   var count=0;
// //   //v 3.0 edit value for MyItems.name
// //   MyItems.name=item;
// //   //v 3.0 edit value for MyItems.cost
// //   MyItems.price=cost;
// //   //v 3.0 for loop through object propterties and 
// //   for (var x in MyItems){
// //     if (count===1){
// //       groc += "$";
// //     }
// //     //add to groc string from object array item
// //     groc += MyItems[x];
// //     if (count===0){
// //       groc += ", ";
// //     }
// //     //increment count by 1
// //    count++;
// //   }
// //   //push to shoppinglist
// //   shoppinglist.push(groc);
// //   //display shoppinglist
// //   displayShoppinglists();
// // //v 2.1: call function 'clearFocus'
  
// //   clearFocus();
// // }

// // //v 2.1 add function 'clearFocus'
// // function clearFocus()
// // {
// //   //v 2.1: clear inputbox value out by id
// // //v 2.1: http://stackoverflow.com/questions/4135818/how-to-clear-a-textbox-using-javascript
// //   document.getElementById("item").value = "";
// // //v 3.0 clear cost field
// //    document.getElementById("cost").value = "";
// // //v 2.1: set focus on inputbox after text is cleared
// // //v 2.1: http://stackoverflow.com/questions/17500704/javascript-set-focus-to-html-form-element
// //   document.getElementById("item").focus();
// // }

// // //v 2.1: update function displayShoppinglists() to display shoppinglists
// // //v 3.0: update function displayShoppinglists() to display shoppinglists & add remove button
// // function displayShoppinglists() {
// // //v 2.1: add and initialize variable 'TheList' with empty string 
// // var TheList = "";
// // //v 2.1: add and intitialize variable 'arrayLength' with shoppinglist.length
// // var arrayLength = shoppinglist.length;
// // //v 2.1: declare a for loop 
// // //v 2.1: (var i = 0; i < arrayLength; i++) 
// // //v 2.1: Concatentate TheList with each array item plus <br> tag

// // //v 3.0 add remove button using below i index
// // //var button =  ' <input class="button" name="delete" //type="button" value="Remove Item" onclick="deleteShoppinglists(' + i + ')" />';
// // var button = "";
// // for (var i = 0; i < arrayLength; i++) {
// //   button =  ' <input class="button" name="delete" type="button" value="Remove Item" onclick="deleteShoppinglists(' + i + ')" />';
// //   //v 3.0 adding remove button to end of item
//   TheList = TheList + shoppinglist[i] + button + '<br>';
// }
// //v 2.1: Display 'TheList" to document ID 'MyList'
// document.getElementById("MyList").innerHTML = TheList;
// }

// function deleteShoppinglists(position) {
//   shoppinglist.splice(position, 1);
//   displayShoppinglists();
// }

// function changeShoppinglist(position, newValue) {
//   shoppinglist[position] = newValue;
//   displayShoppinglists();
// }

//*********************************************
//comment out unused functions and functions calls used Version 2.0 & 2.1
//and move to bottom of page
//*********************************************

//v 2.0: call shoppinglists();
//displayShoppinglists();

//v 2.0: add function addShoppinglistitem() 
//v 2.0: adding a shopping list item without argument

//function addShoppinglistitem() {
//  shoppinglist.push('add new item 4');
//}

//v 2.0: add function addShoppinglist(item) 
//v 2.0: for adding a shopping list item with argument


//v 2.0: call addShoppinglistitem();
//addShoppinglistitem();

//call displayShoppinglists();
//displayShoppinglists();

//v 2.0: call addShoppinglist('add new item 5');
//addShoppinglist('add new item 5');

//v 2.0: v 2.0: add function changeShoppinglist(position, newValue)
//v 2.0: function for changing a Shoppinglists given position

//v 2.0: Call changeShoppinglist(0, 'changed item 1');
//changeShoppinglist(0, 'changed item 1');

//v 2.0: add function deleteShoppinglists(position) 
//v 2.0: function for deleting a Shoppinglists item

//v 2.0: Call: addShoppinglist('add new item 6');
//addShoppinglist('add new item 6');
//v 2.0: v 2.0: Call: changeShoppinglist(5, 'changed item 6');
//changeShoppinglist(5, 'changed item 6');
//v 2.0: Call: deleteShoppinglists(5);
//deleteShoppinglists(5);