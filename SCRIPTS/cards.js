

fetch("/JSON/banners.json", {})
  .then((response) => response.json())
  .then((data) => {
    const carouselInner = document.querySelector('.carousel-inner');
    let carouselInnerContains = '';
    data.forEach((element, index) => {
      if (index == 0) {
        carouselInnerContains += ` <div class="carousel-item active">
                                      <img class="d-block w-100 min-vh-100" src="/IMG/${element.img}" alt="First slide"/>
                                    <div class="carousel-caption text-center w-50">
                                    <div class="d-none d-md-block text-uppercase">
                                        <h1 class="display-4">${element.nombre}</h1>
                                        <p> ${element.direccion}</p>
                                        <h1 class="h1">${element.text}</h1>
                                    </div>
                                    <div class="d-block d-md-none">
                                      <h1 class="h1">${element.nombre}</h1>
                                    </div>  
                                    <button type="button" class="btn btn-crayola" data-toggle="modal" data-target="#myModal">Descubrir</button>
                                     </div>
                                  </div>`;
      } else {
        carouselInnerContains += ` <div class="carousel-item ">
                                      <img class="d-block w-100 min-vh-100" src="/IMG/${element.img}" alt="First slide"/>
                                    <div class="carousel-caption text-center w-50">
                                    <div class="d-none d-md-block text-uppercase">
                                        <h1 class="display-4">${element.nombre}</h1>
                                        <p> ${element.direccion}</p>
                                        <h1 class="h1">${element.text}</h1>
                                    </div>     
                                    <div class="d-block d-md-none">
                                      <h1 class="h1">${element.nombre}</h1>
                                    </div>  
                                    <button type="button" class="btn btn-crayola" data-toggle="modal" data-target="#myModal">Descubrir</button>
                                     </div>
                                  </div>`;
      }
      

    });
    carouselInner.innerHTML = carouselInnerContains;
  });

fetch("/JSON/cards.json", {})
    .then((response) => response.json())
    .then((data) => {
      debugger
      const imageContainer = document.getElementById("image-container");
      let imageInnerContains = '';
      data.forEach((element, index) => {
        if (index == 0) {
          imageInnerContains += ` <div class="col-12 col-md-6 col-lg-4 mb-4">
            <div class="card">
              <img
                class="card-img-top mx-auto"
                src="/IMG/${element.img}"
                alt="cards"
              />
              <div class="card-body">
                <div class="badges">
                  <span class="badge badge-info">${element.info}</span>
                </div>
                <a href="restaurantes.html">
                  <h5 class="card-title">${element.servicio}</h5>
                </a>
                <p class="card-text">
                  ${element.descripcion}
                </p>
              </div>
            </div>
          </div>`;
        }else
        imageInnerContains += ` <div class="col-12 col-md-6 col-lg-4 mb-4">
            <div class="card">
              <img
                class="card-img-top mx-auto"
                src="/IMG/${element.img}"
                alt="cards"
              />
              <div class="card-body">
                <div class="badges">
                  <span class="badge badge-info">${element.info}</span>
                </div>
                <a href="restaurantes.html">
                  <h5 class="card-title">${element.servicio}</h5>
                </a>
                <p class="card-text">
                  ${element.descripcion}
                </p>
              </div>
            </div>
          </div>`;
      });
      imageContainer.innerHTML = imageInnerContains;
});




     




// window.onload = function () {
//   // Variables
//   // const IMAGENES = [
//   //   "/IMG/banner1.png",
//   //   "/IMG/banner2.png",
//   //   "/IMG/banner3.png",
//   //   "/IMG/banner4.png",
//   //   "/IMG/banner5.png",
//   // ];
//   const TIEMPO_INTERVALO_MILESIMAS_SEG = 5000;
//   let posicionActual = 0;
//   let $botonRetroceder = document.querySelector("#retroceder");
//   let $botonAvanzar = document.querySelector("#avanzar");
//   const $imagen = document.querySelector("#imagen");
//   let intervalo;

//   // Funciones

//   /**
//    * Funcion que cambia la foto en la siguiente posicion
//    */
//   function pasarFoto(img) {
//     if (posicionActual >= img.length - 1) {
//       posicionActual = 0;
//     } else {
//       posicionActual++;
//     }
//     renderizarImagen();
//   }

//   /**
//    * Funcion que cambia la foto en la anterior posicion
//    */
//   function retrocederFoto(img) {
//     if (posicionActual <= 0) {
//       posicionActual = img.length - 1;
//     } else {
//       posicionActual--;
//     }
//     renderizarImagen();
//   }

//   /**
//    * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
//    */
//   function renderizarImagen(img) {
//     img.forEach(img => {
//       $imagen.setAttribute("src", img);
//     });
//   }

//   /**
//    * Activa el autoplay de la imagen
//    */
//   function playIntervalo() {
//     intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
//   }

//   fetch("/JSON/banners.json", {})
//     .then((response) => response.json())
//     .then((data) => {
//       renderizarImagen(data.img);
//     });

//   // Eventos
//   $botonAvanzar.addEventListener("click", pasarFoto);
//   $botonRetroceder.addEventListener("click", retrocederFoto);

//   // Iniciar
//   renderizarImagen();
//   playIntervalo();
// };
