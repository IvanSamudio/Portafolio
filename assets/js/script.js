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

function partialRender(htmlName,domContentName,social = false){
    fetch("assets/html/"+ htmlName)
            .then(response => response.text())
            .then(data => {
                // Insertar el contenido recibido en el contenedor
                document.querySelector("."+domContentName).innerHTML = data;
                if(social){
                    owlCarouselMain();
                }
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    // Todo el DOM ha sido cargado y es seguro manipular los elementos del DOM aquí.
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
    partialRender("portfolio.html","portfolio-section");
    partialRender("social.html","social-section",true);
    $.scrollIt({
        easing: 'linear',
        topOffset: -70
    });
    
}

function owlCarouselMain(){
    $(document).ready(function(){
        $('.owl-carousel').owlCarousel({
            loop:true,
            items: 2,
            margin:30,
            autoplay:true,
            autoplayTimeout: 9000,
            responsive:{
                0:{
                    items:1
                },
                900:{
                    items:2
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

    navigator.clipboard.writeText(text).then(function() {
        // Mostrar la notificación
        notification.classList.add("show");

        // Ocultar la notificación después de 2 segundos
        setTimeout(function() {
            notification.classList.remove("show");
        }, 2000);
    }).catch(function(error) {
        console.error('Error al copiar: ', error);
    });
}
