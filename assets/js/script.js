/**
 * Nombre del archivo: script.js
 * Fecha de creación: 17/08/2024
 * Autor: Ivan Samudio
 * Descripción: Este archivo maneja la lógica de la interfaz de usuario de la aplicación.
 */


window.addEventListener("scroll", function () {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop >= 80) {
        document.body.classList.add('fixed-header');
    } else {
        document.body.classList.remove('fixed-header');
    }
});

function partialRender(htmlName, domContentName, section = "home") {
    fetch("assets/html/" + htmlName)
        .then(response => response.text())
        .then(data => {
            // Insertar el contenido recibido en el contenedor
            document.querySelector("." + domContentName).innerHTML = data;
            if (section == "navbar") {
                document.getElementById("language-toggle").addEventListener('change', (e) => readLanguage(e));
                document.getElementById("mode-toggle").addEventListener('change', (e) => changeMode(e));
                detectColorScheme();
            } else if (section == "carousel") {
                owlCarouselMain();
            }
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    // Todo el DOM ha sido cargado y es seguro manipular los elementos del DOM aquí.
    runApp();
});



// Esta función inicializa la aplicación
function runApp() {
    // Realiza el partial render de la NavBar
    partialRender("navbar.html", "main-header", "navbar");
    partialRender("home.html", "home-section");
    partialRender("about.html", "about-section");
    partialRender("tools.html", "tools-section");
    partialRender("skills.html", "skill-section");
    partialRender("portfolio.html", "portfolio-section");
    partialRender("portfolio.html", "portfolio-section");
    partialRender("social.html", "social-section", "carousel");
    partialRender("contact.html", "contact-section");
    $.scrollIt({
        easing: 'linear',
        topOffset: -70
    });
}

function detectColorScheme(){
    var theme="light";    //default to light

    //local storage is used to override OS theme settings
    if(localStorage.getItem("theme")){
        if(localStorage.getItem("theme") == "dark"){
            
            var theme = "dark";
        }
    } else if(!window.matchMedia) {
        //matchMedia method not supported
        return false;
    } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //OS theme setting detected as dark
        var theme = "dark";
    }

    //dark theme preferred, set document with a `data-theme` attribute
    if (theme=="dark") {
        document.getElementById('label-mode-toggle').innerHTML = "<i class='bx bx-sun'></i>";
        document.documentElement.setAttribute("data-theme", "dark");
        document.getElementById('mode-toggle').checked = true;
    }
}

function owlCarouselMain() {
    $(document).ready(function () {
        $('.owl-carousel').owlCarousel({
            loop: true,
            items: 2,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 9000,
            responsive: {
                0: {
                    items: 1
                },
                900: {
                    items: 2
                },

            }
        });
    });
    document.querySelector(".copyEmail").addEventListener("click", copyEmail);
}


function copyEmail() {
    // Obtener el valor del campo de texto
    let text = "ivansamudio07@gmail.com";
    let notification = document.getElementById("notification");

    navigator.clipboard.writeText(text).then(function () {
        // Mostrar la notificación
        notification.classList.add("show");

        // Ocultar la notificación después de 2 segundos
        setTimeout(function () {
            notification.classList.remove("show");
        }, 2000);
    }).catch(function (error) {
        console.error('Error al copiar: ', error);
    });
}


function readLanguage(e) {
    let checked = e.target.checked;
    let label_toggle = document.getElementById('label-language-toggle');
    if (checked) {
        changeLenguage("en");
        label_toggle.innerHTML = '<i>ES</i>';
    } else {
        changeLenguage("es");
        label_toggle.innerHTML = '<i>EN</i>';
    }
}

function changeMode(e) {
    let checked = e.target.checked;
    let label_toggle = document.getElementById('label-mode-toggle');
    if (checked) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        label_toggle.innerHTML = "<i class='bx bx-sun' ></i>";
        checked = true;
    } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
        label_toggle.innerHTML = "<i class='bx bx-moon' ></i>";
        checked = false;
    }
}

async function changeLenguage(language) {
    const textsToChange = document.querySelectorAll("[data-section]");
    const requestJson = await fetch('assets/lenguages/' + language + '.json');
    const texts = await requestJson.json()
    for (const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        textToChange.innerHTML = texts[section][value];
    }
} 