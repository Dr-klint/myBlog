"use strict";

function renderSingle() {
  let newObject = localStorage.getItem("viewedPost");
  let post = JSON.parse(newObject);
  console.log(post.title);
  document.getElementById("feedback-title").innerHTML = post.title;
  document.getElementById("feedback-post").innerHTML = post.body;
}

renderSingle();
