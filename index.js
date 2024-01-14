// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);

// const axios = require("axios");
//Axios Global

// In Axios, the term "global" typically refers to configurations or settings that apply universally to all Axios requests. These configurations can be set globally using the axios.defaults object, ensuring that they are applied to every request made with Axios.

axios.defaults.headers.common["X-Auth-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// GET REQUEST
function getTodos() {
  // axios({
  //   method: "get",
  //   url: "https://jsonplaceholder.typicode.com/todos",
  //   params:{
  //     _limit:5
  //   }
  // })

  // there is a shortcut to write this request
  //we can also remove get because axios by default make get request but it is okay to right it removes any confusions

  axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then((res) => showOutput(res))
    .catch((error) => console.error(error));
  console.log("GET Request");
}

// POST REQUEST
// we are using shortcut to post can also use the above way
// inside the curly braces we are sending data which we want to add or post
function addTodo() {
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title: "New Data",
      compeleted: "false",
    })
    .then((res) => showOutput(res))
    .catch((error) => console.error(error));

  console.log("POST Request");
}

// PUT/PATCH REQUEST

//use to update the data what is the main difference is
// put-- update the resource entirely or create if resource not exist;
//patch--- only change the part of the resource
//one important thing is that we have to specifiy which data we want to change here 1 after todo/ is denoting that object at 1 should be updated

function updateTodo() {
  axios
    .patch("https://jsonplaceholder.typicode.com/todos/1", {
      title: "xyz",
      compeleted: "true",
    })
    .then((res) => showOutput(res))
    .catch((error) => console.error(error));

  console.log("PUT/PATCH Request");
}

// DELETE REQUEST

//this will clear whole object and with this also you have to specify which data you want to delete
function removeTodo() {
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1", {
      title: "xyz",
      compeleted: "true",
    })
    .then((res) => showOutput(res))
    .catch((error) => console.error(error));

  console.log("DELETE Request");
}

// SIMULTANEOUS DATA

// what we can od which this we can make multiple request at the same time using an array and than use .all method as we use in promise.All it will resolve multiple promise at the same time
//here we are requesting data from todos and from post and when we get both after that response will get printed
function getData() {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
    ])
    // so here instead of using index we can use axios.spread with the help of which we can give the variable name
    .then(axios.spread((todos, post) => showOutput(post)))
    //     console.log(res[0])
    //     console.log(res[1])
    //    showOutput(res[1])
    .catch((error) => console.error(error));
  console.log("Simultaneous Request");
}

// CUSTOM HEADERS

// Custom headers convey additional information in HTTP requests/responses. Use them for authentication, customization, or conveying application-specific details.

function customHeaders() {
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: "some token",
    },
  };
  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New Data",
        compeleted: "false",
      },
      config
    )
    .then((res) => showOutput(res))
    .catch((error) => console.error(error));
  console.log("Custom Headers");
}

// TRANSFORMING REQUESTS & RESPONSES

// Transforming request/response in Axios means changing data or headers before sending requests or after receiving responses for customization.

function transformResponse() {
  let options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: { title: "hello World" },
    transformResponse: axios.defaults.transformResponse.concat(
      (data) => (data.title = data.title.toUpperCase())
    ),
  };
  axios(options).then((res) => showOutput(res));
  console.log("Transform Response");
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get("https://jsonplaceholder.typicode.com/todosgg")
    .then((res) => showOutput(res))
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.header);

        if (error.response.status === 404) {
          alert("page not found");
        } else if (error.request) {
          console.error(error.request);
        } else error.message;
        console.error(error.message);
      }
    });
  console.log("Error Handling");
}

// // CANCEL TOKEN
// function cancelToken() {
//   let source = axios.CancelToken.source();

//   axios
//     .get("https://jsonplaceholder.typicode.com", {
//       cancelToken: source.token,
//     })
//     .then((res) => {
//       showOutput(res);
//     })
//     .catch((thrown) => {
//       if (axios.isCancel(thrown)) {
//         console.log("Request canceled", thrown.message);
//       } else {
//         // Handle other errors
//         console.error(thrown);
//       }
//     });

//   const shouldCancel = true;

//   if (shouldCancel) {
//     // Delay the cancellation to ensure the request is sent
//     setTimeout(() => {
//       source.cancel("Request canceled");
//     }, 100);
//   }
// }

// INTERCEPTING REQUESTS & RESPONSES

// Axios, interceptors are functions that can be used to intercept and modify HTTP

// Request interceptors are functions that are invoked before an HTTP request is sent. They allow you to modify the request configuration or headers, attach authentication tokens, or perform any other custom logic before the request is dispatched.

// Response interceptors are functions that are invoked when a response is received. They allow you to modify the response data, handle errors, or perform any custom logic before the response is passed to the application.

axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date()}`
    );
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES

let axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
axiosInstance.get("/comments").then((res) => showOutput(res));
// Show output in browser
function showOutput(res) {
  const outputElement = document.getElementById("res");

  if (!axios.isCancel(res)) {
    outputElement.innerHTML = `
      <div class="card card-body mb-4">
        <h5>Status: ${res.status}</h5>
      </div>

      <div class="card mt-3">
        <div class="card-header">
          Headers
        </div>
        <div class="card-body">
          <pre>${JSON.stringify(res.headers, null, 2)}</pre>
        </div>
      </div>

      <div class="card mt-3">
        <div class="card-header">
          Data
        </div>
        <div class="card-body">
          <pre>${JSON.stringify(res.data, null, 2)}</pre>
        </div>
      </div>

      <div class="card mt-3">
        <div class="card-header">
          Config
        </div>
        <div class="card-body">
          <pre>${JSON.stringify(res.config, null, 2)}</pre>
        </div>
      </div>
    `;
  }
}
