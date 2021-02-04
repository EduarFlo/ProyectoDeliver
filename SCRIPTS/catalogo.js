const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footerCarrito = document.getElementById('footerCarrito')

const templateCards = document.getElementById('template-card').content
const templatefooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content

const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})
cards.addEventListener('click', e =>{
    addCarrito(e)
})

items.addEventListener('click', e => {
    btnAccion(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('/JSON/catalogo.json')
        const data = await res.json()
        //console.log(data)
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}

const pintarCards = data => {
    //console.log(data)
    data.forEach(producto => {
        templateCards.querySelector('#h5Titulo').textContent = producto.nombre
        templateCards.querySelector('#pPrecio').textContent = producto.precio

        templateCards.querySelector('#qContenido').textContent = producto.contenido
        templateCards.querySelector('#qMarca').textContent = producto.marca
        templateCards.querySelector('#qContenido2').textContent = producto.contenido2
        templateCards.querySelector('#qContenido3').textContent = producto.contenido3
/*
        templateCards.querySelector('#h6Contenido').textContent = producto.contenido
        templateCards.querySelector('#h6Marca').textContent = producto.marca
        templateCards.querySelector('#h6Contenido2').textContent = producto.contenido2
*/
        templateCards.querySelector('img').setAttribute('src', producto.imagen)
        templateCards.querySelector('.btn-dark').dataset.id = producto.id
/*27.35 */

        const clone = templateCards.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addCarrito = e =>{
    /*console.log(e.target)
    console.log(e.target.classList.contains('btn-dark'))
    */
    if (e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    //console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        nombre: objeto.querySelector('#h5Titulo').textContent,
        precio: objeto.querySelector('#pPrecio').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    pintarCarrito()
    //console.log(producto)
}

const pintarCarrito = () => {
    //console.log(carrito)
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('#thTemplateCarrito').textContent = producto.id
        templateCarrito.querySelector('#tdNombreTemCar').textContent = producto.nombre
        templateCarrito.querySelector('#tdPrecioTemCar').textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        const Precio = producto.cantidad * producto.precio
        const totalDosDecimales = Precio.toFixed(2);
        templateCarrito.querySelector('#sPrecio').textContent = totalDosDecimales
        
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooterCarrito()

    localStorage.setItem('carrito',JSON.stringify(carrito))
}

const pintarFooterCarrito = () => {
    footerCarrito.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
        footerCarrito.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return 
    }
    const nCantidad = Object.values(carrito).reduce((acc,{cantidad}) => acc + cantidad ,0)
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad, precio}) => acc + cantidad * precio ,0)
    const totalDosDecimales = nPrecio.toFixed(2);

    templatefooter.querySelector('#tdFooterCantidad').textContent = nCantidad
    templatefooter.querySelector('#spanFooterPrecio').textContent = totalDosDecimales

    const clone = templatefooter.cloneNode(true)
    fragment.appendChild(clone)
    footerCarrito.appendChild(fragment)

    const btnVaciar = document.getElementById('btnvaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
}

const btnAccion = e =>{
    if (e.target.classList.contains('btn-info')){

        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }
    if (e.target.classList.contains('btn-danger')){

        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }
    e.stopPropagation()

}
/*
<!-- Carrito --> 
        <div class="container-fluid">
            <div class="row">
                <div class="col text-center text-uppercase">
                    <h5>Precios de nuestros</h5>
                    <h2>PRODUCTOS </h2>
                </div>
            </div>

            <div class="row">
                <!-- Elementos generados a partir del JSON -->
                <main id="items" class="col-sm-8 row mb-4"></main>
                <!-- Carrito -->
                <aside class="col-sm-4">
                    <h2>Carrito</h2>
                    <!-- Elementos del carrito -->
                    <ul id="carrito" class="list-group"></ul>
                    <hr>
                    <!-- Precio total -->
                    <p class="text-right">Total: $<span id="total">00.0</span>;</p>
                    <button id="boton-vaciar" class="btn btn-danger">Vaciar</button>
                </aside>
            </div>
        </div>
    <!-- /Carrito -->

window.onload = function () {
    // Variables
    
    let baseDeDatos = [
        {
            id: 1,
            nombre: 'Cafe en grano',
            precio: 89.99,
            imagen: "/IMG/Catalogo/grano.jpg"
        },
        {
            id: 2,
            nombre: 'Café',
            precio: 39.99,
            imagen: "/IMG/Catalogo/cafe.jpg"
        },
        {
            id: 3,
            nombre: 'Frappe',
            precio: 59.99,
            imagen: "/IMG/Catalogo/frappe.jpg"
        },
        {
            id: 4,
            nombre: 'Frappuchino',
            precio: 69.99,
            imagen: "/IMG/Catalogo/frappuchino.jpg"
        },
        {
            id: 5,
            nombre: 'Pan',
            precio: 29.99,
            imagen: "/IMG/Catalogo/pan.jpg"
        },
        {
            id: 6,
            nombre: 'Té',
            precio: 34.99,
            imagen: "/IMG/Catalogo/tejpg.jpg"
        }

    ];
    
    let $items = document.querySelector('#items');
    let carrito = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
    let $botonVaciar = document.querySelector('#boton-vaciar');

    // Funciones
    function renderItems() {
        for (let info of baseDeDatos) {
            // Estructura
            let miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info['nombre'];
            // Imagen
            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info['imagen']);
            // Precio
            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent =  '$'+ info['precio'];
            // Boton 
            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info['id']);
            miNodoBoton.addEventListener('click', anyadirCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            $items.appendChild(miNodo);
        }
    }

    function anyadirCarrito () {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(this.getAttribute('marcador'))
        // Calculo el total
        calcularTotal();
        // Renderizamos el carrito 
        renderizarCarrito();
    }

    function renderizarCarrito() {
        // Vaciamos todo el html
        $carrito.textContent = '';
        // Quitamos los duplicados
        let carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach(function (item, indice) {
            // Obtenemos el item que necesitamos de la variable base de datos
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            // Cuenta el número de veces que se repite el producto
            let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - $${miItem[0]['precio']}`;
            // Boton de borrar
            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.setAttribute('item', item);
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        });
    }

    function borrarItemCarrito() {
        // Obtenemos el producto ID que hay en el boton pulsado
        let id = this.getAttribute('item');
        // Borramos todos los productos
        carrito = carrito.filter(function (carritoId) {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
        calcularTotal();
    }

    function calcularTotal() {
        // Limpiamos precio anterior
        total = 0;
        // Recorremos el array del carrito
        for (let item of carrito) {
            // De cada elemento obtenemos su precio
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];
        }
        // Formateamos el total para que solo tenga dos decimales
        let totalDosDecimales = total.toFixed(2);
        // Renderizamos el precio en el HTML
        $total.textContent = totalDosDecimales;
    }

    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        calcularTotal();
    }

    // Eventos
    $botonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    renderItems();
}*/