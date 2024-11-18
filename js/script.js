/*navbar*/

window.addEventListener("scroll", function(){
  var header = document.querySelector("header");
  header.classList.toggle("abajo",window.scrollY>0);
})

/*carrito*/

let cart = [];
const cartCountElement = document.getElementById('cart-count');
const cartItemsElement = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const productName = productElement.getAttribute('data-name');
        const productPrice = parseFloat(productElement.getAttribute('data-price'));

        cart.push({ name: productName, price: productPrice });
        updateCart();
    });
});

function updateCart() {
    cartCountElement.textContent = cart.length;
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItemsElement.appendChild(li);
        total += item.price;
    });

    totalPriceElement.textContent = `Total: $${total}`;
}

let currentIndex = 0; 

const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showSlide(index) {

  if (index >= totalSlides) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = totalSlides - 1;
  } else {
    currentIndex = index;
  }

  const carousel = document.querySelector('.carousel-slides');
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}


function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

showSlide(currentIndex);

setInterval(nextSlide, 3000);

// Formulario

// Obtener el formulario y el elemento donde se muestra la respuesta
const formulario = document.getElementById('formulario');
const respuesta = document.getElementById('respuesta');

// Función para manejar el envío del formulario
formulario.addEventListener('submit', function(e) {
    e.preventDefault();  // Prevenir el comportamiento por defecto (recargar la página)

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const puesto = document.getElementById('puesto').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre === '' || apellido === '' || email === '' || telefono === '' || puesto === '' || mensaje === '') {
      // Si falta algún campo requerido
      respuesta.textContent = 'Por favor, completa todos los campos obligatorios.';
      respuesta.style.color = '#e74c3c';  // Rojo para error
  } else if (!validateEmail(email)) {
      // Validación extra para el correo electrónico
      respuesta.textContent = 'Por favor, ingresa un correo electrónico válido.';
      respuesta.style.color = '#e74c3c';  // Rojo para error
  } else {
      // Si todo es válido
      respuesta.textContent = '¡Gracias por tu postulación, ' + nombre + '! Hemos recibido tu mensaje.';
      respuesta.style.color = '#2ecc71';  // Verde para éxito

      // Limpiar el formulario después de la respuesta
      formulario.reset();
  }
});
