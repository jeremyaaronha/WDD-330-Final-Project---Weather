(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{fetch("../partials/header.html").then(o=>o.text()).then(o=>{document.querySelector("header").innerHTML=o;const r=JSON.parse(localStorage.getItem("loggedInUser"));r&&i(r.username)}),fetch("../partials/footer.html").then(o=>o.text()).then(o=>{document.querySelector("footer").innerHTML=o})});const i=o=>{const r=document.querySelector(".login-register");r.innerHTML=`Welcome, ${o}! <a href="#" id="logout">Log Out</a>`,document.getElementById("logout").addEventListener("click",s=>{s.preventDefault();const e=JSON.parse(localStorage.getItem("loggedInUser")),t=document.body.classList.contains("dark-mode")?"dark-mode":"light-mode",n=localStorage.getItem(`${e.username}-unit`)==="metric"?"metric":"imperial";localStorage.setItem(`${e.username}-theme`,t),localStorage.setItem(`${e.username}-unit`,n),localStorage.removeItem("loggedInUser"),location.reload()})};
