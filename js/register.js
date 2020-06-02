let eye_show = document.querySelector("#eye_show");
let eye_hide = document.querySelector("#eye_hide");
let pswdBox = document.querySelector("#pswdBox");

let div1 = document.querySelector("#div1");
let div2 = document.querySelector("#div2");
let nextBtn = document.querySelector("#nextBtn");

let eye_show_2 = document.querySelector("#eye_show_2");
let eye_hide_2 = document.querySelector("#eye_hide_2");
let pswdBox2 = document.querySelector("#pswdBox2");

let user = "customer";

eye_show.addEventListener("click", () => {
    eye_show.style.display = "none";
    eye_hide.style.display = "table-cell";
    pswdBox.setAttribute("type", "text");
});

eye_hide.addEventListener("click", () => {
    eye_show.style.display = "table-cell";
    eye_hide.style.display = "none";
    pswdBox.setAttribute("type", "password");
});

eye_show_2.addEventListener("click", () => {
    eye_show_2.style.display = "none";
    eye_hide_2.style.display = "table-cell";
    pswdBox2.setAttribute("type", "text");
});

eye_hide_2.addEventListener("click", () => {
    eye_show_2.style.display = "table-cell";
    eye_hide_2.style.display = "none";
    pswdBox2.setAttribute("type", "password");
});

nextBtn.addEventListener("click", () => {
    div1.setAttribute("class", "div_hide");
    wait(800)
        .then(() => {
            div1.style.display = "none";
            div2.style.display = "block";
        })
        .then(() => wait(100).then(() => div2.setAttribute("class", "div_show")));
});

function wait(t) {
    return new Promise(function (resolve) {
        window.setTimeout(resolve, t)
    });
}

function userAdmin() {
    user = "admin";
    document.querySelector("header h1").textContent = "Welcome Administrator";
    document.querySelector("#customer-signup").style.display = "none";
    document.querySelector("#admin-login").style.display = "block";
}

function userCustomer() {
    user = "customer";
    document.querySelector("header h1").textContent = "Registration";
    document.querySelector("#customer-signup").style.display = "block";
    document.querySelector("#admin-login").style.display = "none";
}