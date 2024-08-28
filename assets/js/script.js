/**
 * Nombre del archivo: script.js
 * Fecha de creación: 17/08/2024
 * Autor: Ivan Samudio
 * Descripción: Este archivo maneja la lógica de la interfaz de usuario de la aplicación.
 */
//FUNCIONES GENERALES
//LEE EL LENGUAJE ACTUAL
function readLanguage(isSpanish) {
    changeLenguage(isSpanish ? "es" : "en");
    document.getElementById('label-language-toggle').innerHTML = isSpanish ? '<i>EN</i>' : '<i>ES</i>'
    document.getElementById('language-toggle').checked = isSpanish;
}
//REALIZA EL CAMBIO DE IDIOMA
async function changeLenguage(language) {
    const textsToChange = document.querySelectorAll("[data-section]");
    const requestJson = await fetch('assets/lenguages/' + language + '.json');
    const texts = await requestJson.json();
    for (const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        if(typeof texts[section][value] !== "object"){
            textToChange.innerHTML = texts[section][value];
        }else{
            const ul = document.querySelector(".project2list");
            ul.innerHTML ="";
            texts[section][value].forEach(element => {
                const li = document.createElement('li');
                li.textContent = element["description"];
                ul.appendChild(li);
            });
        }
        
    }
    refreshCarousel();
    refreshRol(texts["home"]["rolname"]);   
}
//REALIZA EL PARTIAL RENDER HTMLNAME: NOMBRE HTML, DOMCONTENTNAME: NOMBRE DE LA CLASE DONDE DEBE INSERTARSE EL HTML
function partialRender(htmlName, domContentName) {
    return fetch("assets/html/" + htmlName)
        .then(response => response.text())
        .then(data => {
            // Insertar el contenido recibido en el contenedor
            document.querySelector("." + domContentName).innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}

//INICIA CUANDO CARGA EL DOM
document.addEventListener('DOMContentLoaded', function () {
    // Todo el DOM ha sido cargado y es seguro manipular los elementos del DOM aquí.
    runApp();
    $.scrollIt({
        easing: 'linear',
        topOffset: -70
    });
});
// Esta función inicializa la aplicación
async function runApp() {
    // DETECTA EL LENGUAJE QUE ESTA UTILIZANDO EL USUARIO
    const userLanguage = (navigator.language || navigator.userLanguage).split('-')[0];
    // Realiza el partial render
    const renderPromises = [
        partialRender("navbar.html", "main-header"),
        partialRender("home.html", "home-section"),
        partialRender("about.html", "about-section"),
        partialRender("tools.html", "tools-section"),
        partialRender("skills.html", "skill-section"),
        partialRender("portfolio.html", "portfolio-section"),
        partialRender("social.html", "social-section"),
        partialRender("contact.html", "contact-section"),
    ];
    await Promise.all(renderPromises);
    // Set del lenguaje correspondiente
    const isSpanish = userLanguage.toLowerCase() === "es";
    readLanguage(isSpanish);    
    //Cambio los colores
    detectColorScheme();
    //agrego los addeventlistener
    document.getElementById("language-toggle").addEventListener('change', (e) => readLanguage(e.target.checked));
    document.getElementById("mode-toggle").addEventListener('change', (e) => {changeMode(e.target.checked);});
}

//NAVBAR
window.addEventListener("scroll", function () {
    document.body.classList.toggle('fixed-header', window.scrollY >= 80);
});

//TEMAS
//detecta que tema esta seleccionado
function detectColorScheme() {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    changeMode(darkMode);
}
//detecta si cambia el tema de la plataforma
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {changeMode(e.matches);});
//CAMBIA EL COLOR SELECCIONADO
function changeMode(mode) {
    const theme = mode ? "dark" : "light";
    document.documentElement.setAttribute('data-theme', theme);
    document.getElementById('label-mode-toggle').innerHTML = mode ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";
    document.getElementById('mode-toggle').checked = mode;
}
//SOCIAL
function owlCarouselMain() {
    $(document).ready(function () {
        $('.owl-carousel').owlCarousel({
            loop: true,
            items: 2,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 5000,
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

function refreshCarousel() {
    const $carousel = $('.owl-carousel');
    $carousel.trigger('refresh.owl.carousel');
    owlCarouselMain();
}

//COPIA EL EMAIL AL PORTAPAPELES
function copyEmail() {
    let notification = document.getElementById("notification");
    navigator.clipboard.writeText("ivansamudio07@gmail.com").then(function () {
        notification.classList.add("show");
        setTimeout(function () {
            notification.classList.remove("show");
        }, 2000);
    }).catch(function (error) {
        console.error('Error al copiar: ', error);
    });
}

function refreshRol(rolTexts){
    var typed = new Typed('#rol-changer', {
        strings: rolTexts,
        typeSpeed: 100,
        loop: true,
    });
}