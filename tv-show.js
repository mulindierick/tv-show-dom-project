function addScriptToDOM() {
  let script1 = document.createElement("script");
  script1.src = "shows.js";
  let script2 = document.createElement("script");
  script2.src = "script.js";
  let script3 = document.createElement("script");
  script3.src = "dom-pages.js";

  document.getElementById("body").appendChild(script1);
  document.getElementById("body").appendChild(script2);
  document.getElementById("body").appendChild(script3);

  // refresh page on click to go back to the tv shows list
  document.getElementById("show-page").addEventListener("click", function () {
    window.parent.location = window.parent.location.href;
  });
}
window.onload = addScriptToDOM;
