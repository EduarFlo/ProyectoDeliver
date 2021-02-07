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


        const cadena = producto.contenido
        const Contenido = cadena.toString().replace(/["]+/g,'');
        //const Contenido = JSON.stringify(cadena, replace(/[ '"]+/g, ' '))
        templateCards.querySelector('#qContenido').textContent = Contenido
        templateCards.querySelector('#qMarca').textContent = producto.marca
        templateCards.querySelector('#qContenido2').textContent = producto.contenido2
        templateCards.querySelector('#qContenido3').textContent = producto.contenido3

        templateCards.querySelector('img').setAttribute('src', producto.imagen)
        templateCards.querySelector('.btn-dark').dataset.id = producto.id

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

const expresNumero = new RegExp(/^\d{1,3}(?:,\d{3})*(?:\.\d{0,2})?$/)

function validacionVacio() {
    try
    {
        const numero = document.getElementById("Numero").value

        if (numero === '' || numero === null ){
            //alert(" campos esta vacio")
            document.getElementById("demo").innerHTML =" El Campo esta vacio ";
            document.getElementById("demo2").innerHTML ="";
        }else{

            if (!expresNumero.exec(numero)){
                
                document.getElementById("demo").innerHTML = "El numero " +  numero + " Es Invalido";
                document.getElementById("demo2").innerHTML = "" ;
                return false;
            } else{
            
                document.getElementById("demo2").innerHTML = "El numero " +  numero + " Es valido con la expresion "  ;
                document.getElementById("demo").innerHTML = "" ;

                localStorage["numero"]= numero;

                return true;
            }
        }

    }catch(error)
    {
        console.error(error);
    }
}


/*
var dato = localStorage["numeros"];
var p = document.getElementById("textMilesField");
    p.innerHTML= dato;
*/

    // Inicio
    renderItems();
}*/

