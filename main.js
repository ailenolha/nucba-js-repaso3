// -------------------------------------- EJERCICIO 1 -------------------------------------------

// Definimos la URL base para la llamada a la api
const baseURL = "https://fakestoreapi.com/products";

// Traemos los elementos del DOM que vamos a necesitar:
const btnShowProducts = document.getElementById("btnShowProducts");
const btnHideProducts = document.getElementById("btnHideProducts");
const cardsContainer = document.getElementById("cardsContainer");

// getProducts: Funcion para hacer la llamada a la API.
const getAllProducts = async () => {
  try {
    const response = await fetch(baseURL);
    const data = await response.json();
    renderProducts(data);
  } catch (error) {
    alert("Error: " + error)
  }
};

// renderProduct: Función para renderizar un producto.
// definimos la estructura HTML que determina como se mostrara la card del producto pasado por parámetro.
const renderProduct = (product) => {

  //Usamos destructuring para extraer lo que necesitamos del objeto product:
  const { title, price, category, image } = product;

  // Se crea un string con el html de la card y se retorna.
    return `
    <div class="card">
        <img class="card__img" src="${image}"/>
        <h2 class="card__h2">${title.toUpperCase()}</h2>
        <div class="price-category-container"> 
          <p class="category">${category.toLowerCase()}</p>
          <span class="price">Price: $${price}</span>
        </div>
    </div>
  `;
};

// renderProducts: Función para renderizar los productos.
const renderProducts = (products) => {
  cardsContainer.innerHTML = products.map((product) => renderProduct(product)).join("")
}

// hideProducts: Función para ocultar todos los productos.
const hideProducts = () => {
  cardsContainer.innerHTML = "";
}

// Función Inicializadora
// En esta función colocamos los listener cuando se hace click en los botones.
const init = () => {
  btnShowProducts.addEventListener('click', getAllProducts);
  btnHideProducts.addEventListener("click", hideProducts)
}
init();

// -------------------------------------- EJERCICIO 2 -------------------------------------------

const btnShowProducts2 = document.getElementById("btnShowProducts2");
const btnHideProducts2 = document.getElementById("btnHideProducts2");
const cardsContainer2 = document.getElementById("cardsContainer2");

// igual al ejercicio 1, pero agregamos un query param
const getProducts = async () => {
  try {
    const response = await fetch(baseURL + `?limit=5`);
    const data = await response.json();
    renderProducts2(data);

  } catch (error) {
    alert("Error: " + error)
  }
};

const renderProduct2 = ( { title, price, category, image } ) => {
  return `
  <div class="card">
      <img class="card__img" src="${image}"/>
      <h2 class="card__h2">${title.toUpperCase()}</h2>
      <div class="price-category-container"> 
        <p class="category">${category.toLowerCase()}</p>
        <span class="price">Price: $${price}</span>
      </div>
  </div>
`;
};

const renderProducts2 = (products) => {
  cardsContainer2.innerHTML = products.map((product) => renderProduct2(product)).join("")
}

const hideProducts2 = () => {
  cardsContainer2.innerHTML = "";
}

const init2 = () => {
  btnShowProducts2.addEventListener('click', getProducts);
  btnHideProducts2.addEventListener("click", hideProducts2)
}
init2();

// -------------------------------------- EJERCICIO 3 -------------------------------------------

const cardContainer = document.getElementById("cardContainer");
const form = document.getElementById("form");
const input = document.querySelector(".form__input");

// Buscamos en el array de productos el producto cuyo id coincida con el numero del input.
// Retornará undefined si no existe dicho número
const findProduct = (data, value) => {
  const result = data.find((product) => product.id === value);
  return result;
}

// obtenemos todos los productos:
const getProducts2 = async () => {
  try {
    const response2 = await fetch(baseURL);
    const data = await response2.json();
    return data;
  } catch (error) {
    alert("Error: " + error)
  }
};

// renderizamos el producto que coincide con el id ingresado:
const renderSearchedProduct = ({ title, price, category, image }) => {
  return `
  <div class="card">
      <img class="card__img" src="${image}"/>
      <h2 class="card__h2">${title.toUpperCase()}</h2>
      <div class="price-category-container"> 
        <p class="category">${category.toLowerCase()}</p>
        <span class="price">Price: $${price}</span>
      </div>
  </div>
`;
};

// función para mostrar un error en caso de que no hayamos colocado nada en el input y activemos el evento submit:
const showEmptyError = () => {
  cardContainer.innerHTML = `
      <h2 class="error-title"> Por favor, ingrese un número para que podamos buscar un producto. </h2>
  `;
};

// Función para renderizar el resultado de la busqueda.
// lo que se renderice dependerá de si se encontró un producto con el id dado o no.
const renderResult = (searchedProduct) => {
  if (!searchedProduct) {
    cardContainer.innerHTML = `
    <div class="">
      <h2 class="error-title"> No existe un producto con el número ingresado.</h2>
      <p>Realice una nueva busqueda.</p>
    </div>`;
  } else {
    cardContainer.innerHTML = renderSearchedProduct(searchedProduct);
  }
};

// función que se ejecutará al darse el evento "submit"
const submitSearch = async (e) => {
  e.preventDefault();

  // guardamos el valor del input en una variable
  const searchedValue = input.value;

  if (!searchedValue) {
    showEmptyError();
    return;
  }

  // guardamos el array de productos:
  const allProducts = await getProducts2();

  // guardamos el producto encontrado, o undefined si no encuentra ninguno:
  const searchedProduct = findProduct(allProducts, Number(searchedValue))

  // renderizamos el resultado de la busqueda:
  renderResult(searchedProduct);

  form.reset();
};

// Función Inicializadora. Colocamos el listener para cuando se hace submit.
const init3 = () => {
  form.addEventListener("submit", submitSearch);
}
init3();