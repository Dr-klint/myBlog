"use strict";
let feedbackWrapper = document.querySelector("#feedback-holder");
let feedbackForm = document.querySelector("#feedback-form");
let title = document.querySelector("#title");
let body = document.querySelector("#body");

let feedbackBox = [];

function getFeedBack() {
  fetch("https://jsonplaceholder.typicode.com/posts/?_limit=50") //make a request
    .then((response) => response.json()) //the rest response in json format
    .then((data) => {
      console.log(data); //data is a variable
      feedbackBox = data;
      renderUI(feedbackBox);
    });
  document.querySelector(".feedback__page").style.background =
    " linear-gradient(rgba(0, 0, 0, 0.837), rgba(5, 5, 25, 0.812))";
}

document.querySelector(".get-post").addEventListener("click", function () {
  getFeedBack();
  document.querySelector(".feedback__page").style.background =
    " linear-gradient(rgba(0, 0, 0, 0.837), rgba(5, 5, 25, 0.812))";
});

document.querySelector(".send-post").addEventListener("click", createPost);

function createPost(e) {
  e.preventDefault();
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: title.value,
      body: body.value,
      userId: 2,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      feedbackBox.unshift(data);
      console.log(feedbackBox);
      renderUI(feedbackBox);
      document.querySelector(".feedback__page").style.background =
        " linear-gradient(rgba(0, 0, 0, 0.837), rgba(5, 5, 25, 0.812))";
      document.querySelector(".feedback-body").value = " ";
      document.querySelector(".feedback-input").value = " ";
    });
}

function updatePost(id) {
  console.log(id);
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      title: title.value,
      body: body.value,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let feedbackTitles = document.querySelectorAll(".feedback-title");
      let feedbackBodies = document.querySelectorAll(".feedback-post");
      console.log(feedbackTitles);
      feedbackTitles.forEach((feedbackTitle, index) => {
        if (index + 1 === id) {
          if (data.title !== "") {
            feedbackTitle.innerHTML = data.title;
          }
        }
      });

      feedbackBodies.forEach((feedbackBody, index) => {
        if (index + 1 === id) {
          if (data.body !== "") {
            feedbackBody.innerHTML = data.body;
          }
        }
      });
      document.querySelector(".feedback-body").value = " ";
      document.querySelector(".feedback-input").value = " ";
    });
}

function openSingle(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("viewedPost", JSON.stringify(data));
      window.location.href = `view.html`;
      //   window.location.href = `view.html?id=${id}`;     METHOD 2
    });
}

function deletePost(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      feedbackBox = feedbackBox.filter((post) => post.id !== id);
      renderUI(feedbackBox);
    });
}

function renderUI(arr) {
  let feedbackHolder = "";
  arr.forEach((post) => {
    feedbackHolder += `
       <div class=" col-md-5 col-12 me-md-3 me-0 feedback__card p-3 mb-5 mt-3 ">
      <div class="d-flex flex-column">
              <h4  class='fw-bold feedback-title'>${post.title}</h4>
              <p class="feedback-post">${post.body}</p>
              <div class="d-flex justify-content-between">
                  <button class="btn btn-secondary px-2 py-1 mt-3 update-post me-2"  onclick='updatePost(${post.id})'>Update Post</button>
                  <button class="btn btn-success px-2 py-1 mt-3 me-2" id='view-btn' onclick='openSingle(${post.id})'>View Post <i class='bx bx-message'></i></button>
                  <button class="btn btn-danger px-2 py-1 mt-3"  onclick='deletePost(${post.id})'>Delete Post <i class='bx bx-trash'></i></button>
              </div>  
      </div> 
  </div>  
  `;
  });

  feedbackWrapper.innerHTML = feedbackHolder;
}

getFeedBack();
