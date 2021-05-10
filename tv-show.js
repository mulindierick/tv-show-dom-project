function addScriptToDOM() {
  let script1 = document.createElement("script");
  script1.src = "shows.js";
  let script2 = document.createElement("script");
  script2.src = "script.js";
  let script3 = document.createElement("script");
  script3.src = "dom-pages.js";
  
  document.getElementById("body").appendChild(script3);
  document.getElementById("body").appendChild(script1);
  document.getElementById("body").appendChild(script2);
 
  
}
window.onload = addScriptToDOM;
