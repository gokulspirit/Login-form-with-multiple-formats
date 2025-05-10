function showRegister() {
  document.getElementById("register").style.display = "block";
  document.getElementById("login").style.display = "none";
  document.getElementById("dashboard").style.display = "none";
}

function showLogin() {
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
}

function showDashboard() {
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}

function register() {
  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;

  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.find(u => u.username === username);

  if (userExists) {
    alert("Username already taken.");
    return;
  }

  const newUser = {
    id: Date.now(),
    username,
    email,
    password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered successfully!");
  showLogin();
}

function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    loadDashboard();
  } else {
    alert("Invalid credentials.");
  }
}

function loadDashboard() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    showLogin();
    return;
  }

  showDashboard();
  document.getElementById("welcomeUser").textContent = loggedInUser.username;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const tableBody = document.getElementById("userTable");
  tableBody.innerHTML = "";

  users.forEach(user => {
    const row = `<tr>
      <td>${user.id}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

function logout() {
  localStorage.removeItem("loggedInUser");
  showRegister();
}

// Auto-show dashboard if already logged in
window.onload = function() {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    loadDashboard();
  } else {
    showRegister();
  }
};
