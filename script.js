const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const heroSec = document.querySelector(".hero-sec");
if (screenHeight > screenWidth && screenWidth > 600) {
    heroSec.style.aspectRatio = "16/10";
    heroSec.style.height = "auto";
}

// ========== menubar ==========

const navbar = document.querySelector(".navbar");
const navlist = document.querySelector(".navbar ul");
const menuIcon = document.querySelector(".menu-icon");
const links = document.querySelectorAll(".link");

const prevHeight = navbar.offsetHeight;
const prevWidth = navbar.offsetWidth;
console.log("");

if (screenWidth <= 600) {
    navbar.style.maxHeight = "56px";
    navbar.style.maxWidth = "56px";
    navlist.style.opacity = "0";
    menuIcon.style.opacity = "1";

    const menuOpen = () => {
        navbar.style.maxHeight = prevHeight + "px";
        navbar.style.maxWidth = prevWidth + "px";
        setTimeout(() => {
            navlist.style.opacity = "1";
        }, 300);
        menuIcon.style.opacity = "0";
    };

    const menuClose = () => {
        navbar.style.maxHeight = "56px";
        navbar.style.maxWidth = "56px";
        navlist.style.opacity = "0";
        setTimeout(() => {
            menuIcon.style.opacity = "1";
        }, 300);
    };

    menuIcon.addEventListener("click", () => {
        menuOpen();
    });

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.stopPropagation();
            menuClose();
        });
    });

    document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target)) {
            e.stopPropagation();
            menuClose();
        }
    });
}

// ========== projects ==========

import {projects} from './elements.js';

const extract = fnBody => {
    const fnString = fnBody.toString();
    return fnString
    .slice(fnString.indexOf("{") + 1, fnString.lastIndexOf("}"));
}

const proSec = document.querySelector(".pro-sec");

const domCss = document.querySelector(".domCss");
const domJs = document.querySelector(".domJs");
const domain = document.querySelector(".domain");

const container = document.querySelector(".container");
const body = document.querySelector("body");

const swipe = document.querySelector(".swipe");
const swipeIn = document.querySelector(".swipe-in");

const renderProjects = () => {
    projects.forEach((proObj) => {
        const proj = document.createElement("div");
        proj.classList.add("pro-card", proObj.spClass);

        proj.innerHTML = `
            <div class="blank"></div>
            <div class="pro-title">
                <h2 class="pro-h">${proObj.heading}</h2> 
                <p class="pro-des">${proObj.UI}</p> 
            </div>
        `;

        proj.addEventListener("click", () => {
            
            
            domain.innerHTML = proObj.HTML;
            domCss.innerHTML = proObj.CSS;
            
            proObj.JS();

            const newScript = document.createElement("script");
            newScript.classList.add("dynScript");
            newScript.textContent = extract(proObj.JS);
            body.appendChild(newScript);
            
            domain.style.opacity = "1";
            
            swipe.style.pointerEvents = "auto";
            swipeIn.style.opacity = "1";
            swipeIn.style.width = "100%";
            
            console.log(body);
        });

        proSec.appendChild(proj);
    });
};

function onSwipeRight() {
    console.log("Swipe right detected 🔥");
    
    domain.style.opacity = "0";
    
    setTimeout(() => {
        domain.innerHTML = "";
        domCss.innerHTML = "";
    }, 650);
    document.querySelectorAll("script.dynScript").forEach(s => s.remove());
    
    swipe.style.pointerEvents = "none";
    swipeIn.style.opacity = "0";
    swipeIn.style.width = "0";
    
    console.log(body);
}

let startX = 0;

swipeIn.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

swipeIn.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    const threshold = 80; // tweak if needed
    
    if (diffX > threshold) {
        onSwipeRight();
    }
});

renderProjects();

// ========== Contacts ==========

import {contacts} from './elements.js';

const contactRow = document.getElementById("contactRow");

contacts.forEach(contact => {
    const cont = document.createElement("div");
    cont.classList.add("con-col");
    cont.innerHTML = `
    <div class="con-col-in">
        <div class="cont-h">
            <img src="${contact.icon}" class="gm">
            <h3>${contact.name}</h3>
        </div>
        <div class="cont-btn-div">
            <div class="cont-stat-div ${contact.disabled ? "stat-li-div" : ""}">
                <p class="cont-stat ${contact.disabled ? "stat-li" : ""}">
                    ${contact.value}
                </p>
            </div>
            ${contact.disabled
                ? `
                <button class="cont-btn btn-li">in Progress</button>
                <button class="cont-btn btn-li">in Progress</button>
                `
                : 
                `
                <button class="cont-btn" onclick="window.location.href='${contact.primaryBtn.link}'">
                    ${contact.primaryBtn.text}
                </button>
                <button class="cont-btn">${contact.secondaryBtn}</button>
                `}
        </div> 
    </div>
    `;
    
    contactRow.appendChild(cont);
});

// ==========  milestones ==========

import {milestones} from './elements.js';

const milGrid = document.querySelector(".mil-grid");

milestones.forEach(item => {
    const div = document.createElement("div");
    
    div.classList.add("mil-col");
    if (item.type === "done" || item.type === "going" || item.type === "undone") {
        div.classList.add(item.type);
    } else if (item.type === "arrow-small") {
        div.classList.add("mil-s", "mb-show");
    } else {
        div.classList.add("ds-show");
    }
    
    div.style.gridArea = item.grid;
    div.innerHTML = `<img src="${item.img}" alt="">`;
    
    milGrid.appendChild(div);
});

import {milestoneInfo} from './elements.js';

const milInfo = document.getElementById("milInfo");

milestoneInfo.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("mil-in");

    div.innerHTML = `
        <div class="st-clr ${item.colorClass}"></div>
        <div class="st-des">${item.text}</div>
    `;

    milInfo.appendChild(div);
});

// ========== credits ==========

import {credits} from './elements.js';

const credit = document.querySelector(".credits");

credits.forEach((cred) => {
    const cre = document.createElement("p");
    cre.innerHTML = `
    <span class="sp-tx">${cred.name}</span> &rarr; attributed for the "${cred.attribute}";
    `;
    credit.appendChild(cre);
});

const creBtn = document.querySelector('.fo-btn');
const creditCont = document.querySelector(".creditCont");
const inCreditCont = document.querySelector(".inCreditCont");

creBtn.addEventListener("click", () => {
    creditCont.style.opacity = "1";
    creditCont.style.pointerEvents = "auto";
    inCreditCont.style.background = "rgba(255, 255, 255, 0.2)";
    inCreditCont.style.backdropFilter = "blur(20px)";
});

document.addEventListener("click", (e) => {
    if (!inCreditCont.contains(e.target) && !creBtn.contains(e.target)) {
        creditCont.style.opacity = "0";
        creditCont.style.pointerEvents = "none";
        inCreditCont.style.background = "rgba(255, 255, 255, 0)";
        inCreditCont.style.backdropFilter = "blur(0px)";
    }
});