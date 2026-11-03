"use strict";

/* =================================
   TESLASTOCKLLC - MAIN JAVASCRIPT
================================= */

/* THEME COLOURS */
const RED = "#e82127";
const SUCCESS = "#36c98b";
const DANGER = "#ff6262";

/* MOBILE NAVIGATION */
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {

    function closeMenu() {
        navigation.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", function () {
        navigation.classList.toggle("active");

        const isOpen = navigation.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
        const clickedInsideMenu = navigation.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}

/* FOOTER YEAR */
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* FORM MESSAGE HELPER */
function showMessage(element, message, colour = RED) {
    if (!element) return;

    element.textContent = message;
    element.style.color = colour;
}

/* SMARTSUPP CUSTOMER SUPPORT */
window.openSupport = function (message) {

    if (typeof window.smartsupp === "function") {

        if (message) {
            window.smartsupp("chat:message", message);
        }

        window.smartsupp("chat:open");

    } else {

        alert(
            "Customer support is loading. Please wait a moment and try again."
        );

    }
};

/* REGISTRATION FORM */
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const message = document.getElementById("registerMessage");

        if (!password || !confirmPassword || !message) return;

        if (password.value.length < 8) {
            showMessage(
                message,
                "Password must contain at least 8 characters.",
                DANGER
            );
            return;
        }

        if (password.value !== confirmPassword.value) {
            showMessage(
                message,
                "Passwords do not match.",
                DANGER
            );
            return;
        }

        showMessage(
            message,
            "Your details passed the form checks. Secure account creation is awaiting backend connection.",
            RED
        );

    });
}

/* LOGIN FORM */
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const message = document.getElementById("loginMessage");

        showMessage(
            message,
            "Secure login will become available after authentication is connected.",
            RED
        );

    });
}

/* DASHBOARD SIDEBAR */
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");

if (sidebarToggle && sidebar) {

    sidebarToggle.addEventListener("click", function () {

        sidebar.classList.toggle("open");

        const isOpen = sidebar.classList.contains("open");

        sidebarToggle.setAttribute("aria-expanded", isOpen);

    });
}

/* WITHDRAWAL FORM */
const withdrawForm = document.getElementById("withdrawForm");

if (withdrawForm) {

    withdrawForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const message = document.getElementById("withdrawMessage");

        showMessage(
            message,
            "Secure withdrawal submission requires backend connection. No transaction has been processed.",
            RED
        );

    });
}

/* PROFILE FORM */
const profileForm = document.getElementById("profileForm");

if (profileForm) {

    profileForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const message = document.getElementById("profileMessage");

        showMessage(
            message,
            "Profile changes will be saved after secure account integration.",
            RED
        );

    });
}

/* SUPPORT FORM */
const supportForm = document.getElementById("supportForm");

if (supportForm) {

    supportForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const subject = document.getElementById("supportSubject");
        const message = document.getElementById("supportMessage");
        const response = document.getElementById("supportResponse");

        if (!subject || !message) return;

        const subjectText = subject.value.trim();
        const messageText = message.value.trim();

        if (!subjectText || !messageText) {
            showMessage(
                response,
                "Please complete both fields.",
                DANGER
            );
            return;
        }

        showMessage(
            response,
            "Your enquiry is ready. Please send it through the live chat.",
            SUCCESS
        );

        window.openSupport(
            "Subject: " + subjectText +
            "\nMessage: " + messageText
        );

    });
}

/* PREVENT EMPTY PLACEHOLDER LINKS */
document.querySelectorAll('a[href="#"]').forEach(function (link) {

    if (!link.hasAttribute("onclick")) {

        link.addEventListener("click", function (event) {
            event.preventDefault();
        });

    }

});

/* =================================
   BACKEND CONNECTION STATUS

   Login, registration, deposits,
   withdrawals and profile updates
   are not live until securely
   connected to a backend.
================================= */