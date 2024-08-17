/**
 * Nombre del archivo: script.js
 * Fecha de creación: 17/08/2024
 * Autor: Ivan Samudio
 * Descripción: Este archivo maneja la lógica de la interfaz de usuario de la aplicación.
 */

window.addEventListener("scroll", function() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop >= 80) {
        document.body.classList.add('fixed-header');
    } else {
        document.body.classList.remove('fixed-header');
    }
});

function partialRender(htmlName,domContentName){
    fetch("/assets/html/"+ htmlName)
            .then(response => response.text())
            .then(data => {
                // Insertar el contenido recibido en el contenedor
                document.querySelector("."+domContentName).innerHTML = data;
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    // Todo el DOM ha sido cargado y es seguro manipular los elementos del DOM aquí.
    var base = document.createElement('base');
    base.href = window.location.origin + '';
    base.target = '_self';
    document.head.appendChild(base);
    runApp();
});



// Esta función inicializa la aplicación
function runApp() {
    // Realiza el partial render de la NavBar
    partialRender("navbar.html","main-header");
    partialRender("home.html","home-section");
    partialRender("about.html","about-section");
    partialRender("experience.html","experience-section");
    partialRender("skills.html","skill-section");

}


