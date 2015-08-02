function initialize () {
}

function sendRequest () {
//AJAX asynchronous javascript and xml - execute 
   var xhr = new XMLHttpRequest();
 // XMLHttpRequest() object helps exchange data with server behind the scenes after page has loaded without reloading the page
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);//open(method,url,true/false) true=async
   //asynchronous specifies to execute function on onreadystatechange event
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () { //async=true specifies function() to execute when onreadystatechange event occurs    
//onreadystatechange stores a function to be automatically called each time readystate property changes.
	  if (this.readyState == 4) {
	 /* Holds the status of the XMLHttpRequest. Changes from 0 to 4: 
0: request not initialized 
1: server connection established
2: request received 
3: processing request 
4: request finished and response is ready*/
          var json = JSON.parse(this.responseText); 
		  //this.responseText gets response data as string.responseXML gets response text as xml.
		  //converts json text to java script object
          var str = JSON.stringify(json,undefined,2); 
		  // converts java script object(json here) to JSON with space=2
         // document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
		 listview(json);
		 nuller();
       }
   };
   xhr.send(null); // sends request to server.if post request then xhr.send(string)
}
function listview(json)
{
document.getElementById("list").innerHTML="";
for(var i=0 ; i < json.results.length ; i++)
{
var movieis = document.createElement("li");
//var k = i+1;
movieis.innerHTML= ">"+json.results[i].title+"<br>"+json.results[i].release_date;
movieis.setAttribute("id",json.results[i].id);//setattribute sets specified attribute to element with a value
movieis.style.cursor="pointer";//cursor is a pointer and indicates a link
document.getElementById("list").appendChild(movieis);
}
}
function movieclick(id){
var xhr = new XMLHttpRequest();;
   xhr.open("GET", "proxy.php?method=/3/movie/"+id);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          //document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
		  
		  click(json);
       }
   };
   xhr.send(null);
}

function click(json)
{
for (var i=0 ; i< json.genres.length; i++)
{
document.getElementById("summary").innerHTML= "Summary:"+json.overview;
document.getElementById("genres").innerHTML= "Genres:"+json.genres[i].name;
document.getElementById("poster").src= "http://image.tmdb.org/t/p/w500"+json.poster_path;
}
}
function castinfo(id){
var xhr = new XMLHttpRequest();;
   xhr.open("GET", "proxy.php?method=/3/movie/"+id+"/credits");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          //document.getElementById("output").src = "<pre>" + str + "</pre>";
		  imp(json);
       }
   };
   xhr.send(null);
}
function imp(json)
{
//for (var i=0; i<5; i++)
//{
document.getElementById("castes1").innerHTML= ">caste name:"+json.cast[0].name+'<br>'+"caste character:"+json.cast[0].character+"<br>";
document.getElementById("castes2").innerHTML= ">caste name:"+json.cast[1].name+'<br>'+"caste character:"+json.cast[1].character+"<br>";
document.getElementById("castes3").innerHTML= ">caste name:"+json.cast[2].name+'<br>'+"caste character:"+json.cast[2].character+"<br>";
document.getElementById("castes4").innerHTML= ">caste name:"+json.cast[3].name+'<br>'+"caste character:"+json.cast[3].character+"<br>";
document.getElementById("castes5").innerHTML= ">caste name:"+json.cast[4].name+'<br>'+"caste character:"+json.cast[4].character+"<br>";
//}
}
function nuller()
{
document.getElementById("castes1").innerHTML="";
document.getElementById("castes2").innerHTML="";
document.getElementById("castes3").innerHTML="";
document.getElementById("castes4").innerHTML="";
document.getElementById("castes5").innerHTML="";
document.getElementById("summary").innerHTML="";
document.getElementById("genres").innerHTML="";
document.getElementById("poster").src="";

}

