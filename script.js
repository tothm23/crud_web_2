"use strict";

let tbody = document.getElementById("tbody");

// tbody.append(td_fun());

//fetch function
fetch("http://localhost:3000/user")
  .then((res) => res.json())
  .then((json) => {
    json.map((data) => {
      console.log(data);
      // console.log(data.name);
      tbody.append(td_fun(data.name, data.email, data.status, data.role, data.id));
    });
  });

//create td 1st: beégetett adatokkal
// function td_fun(){
//     let td = document.createElement('tr');
//     td.innerHTML =
//     `
//     <td>
//         <div class="name">
//             Tóth Gyula
//         </div>
//         <div class="email">
//             tothgyula22@gmail.com
//         </div>
//     </td>
//         <td class="status active">Active</td>
//         <td class="role">Admin</td>
//     `
//     return td;
// }

// create td 2nd: miután megcsináltuk a fetchet
function td_fun(name, email, status, role, id) {
  let td = document.createElement("tr");
  td.innerHTML = `
    <td class="id">${id}</td>
    <td>
        <div class="name">
            ${name}
        </div>
        <div class="email">
            ${email}
        </div>
    </td>
        <td class="status active">${status}</td>
        <td class="role">${role}</td>
    `;
  return td;
}

function createAndUpdateUser() {
  var inputId = document.getElementById("inputId").value;
  var inputName = document.getElementById("inputName").value;
  var inputEmail = document.getElementById("inputEmail").value;
  var status = document.getElementById("inputStatus");
  var inputStatus = status.options[status.selectedIndex].text;
  var role = document.getElementById("inputRole");
  var inputRole = role.options[role.selectedIndex].text;

  // console.log(inputId);

  let dataToSend = {
    name: inputName,
    email: inputEmail,
    status: inputStatus,
    role: inputRole,
  };

  if (inputId == "") {
    fetch("http://localhost:3000/user", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
  } else {
    fetch(`http://localhost:3000/user/${inputId}`, {
      method: "PUT",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
  }
}

function deleteUser() {
  var inputId = document.getElementById("inputId").value;

  fetch(`http://localhost:3000/user/${inputId}`, {
    method: "DELETE",
  });
}

const submitBtn = document.getElementById("submitBtn");
const deleteBtn = document.getElementById("deleteBtn");

submitBtn.addEventListener("click", function (event) {
  // event.preventDefault();
  createAndUpdateUser();
});
deleteBtn.addEventListener("click", function (event) {
  // event.preventDefault();
  deleteUser();
});
