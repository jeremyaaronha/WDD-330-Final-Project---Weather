import"./loadHeaderFooter-d7a9e1d1.js";document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("register-form");e.addEventListener("submit",n=>{n.preventDefault();const r=e.querySelector('input[placeholder="Username"]').value,o=e.querySelector('input[placeholder="Email"]').value,a=e.querySelector('input[placeholder="Password"]').value,s=JSON.parse(localStorage.getItem("users"))||[];if(s.some(t=>t.email===o||t.username===r))alert("Username or email is already taken. Please choose another.");else{const t={username:r,email:o,password:a};s.push(t),localStorage.setItem("users",JSON.stringify(s)),alert("Registration successful! You can now log in."),window.location.href="../login/login.html"}})});
