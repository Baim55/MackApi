function menuOpen() {
  let menubar = document.getElementById("menubar");

  if (menubar.style.right == "-100%") {
    menubar.style.right = "0";
  } else {
    menubar.style.right = "-100%";
  }
}

let product = document.getElementById("product") || { innerHTML: "" };
let count = document.getElementById("count");
let countMobile = document.getElementById("countMobile");

let categoryList = document.getElementById("categoryList");

fetch("https://69b68ba2583f543fbd9df704.mockapi.io/f142/category")
  .then((res) => res.json())
  .then((cat) => {
    cat.map((c) => {
      categoryList.innerHTML += `<button onclick="filterProduct('${c.name}')" class="bg-amber-500 text-white px-4 py-1 rounded">${c.name}</button>`;
    });
  });

function filterProduct(name) {
  const result =
    name === "all"
      ? allProducts
      : allProducts.filter((f) => f.category === name);
  render(result);
}

function render(data) {
  product.innerHTML = "";
  data.map((item) => {
    product.innerHTML += `
      <div
                id="${item.id}"
                class="relative rounded-2xl overflow-hidden bg-[#222831]"
              >
                <button
                  onclick="event.stopPropagation(); addWishlist(${item.id})"
                  class="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition"
                >
                  <i id="heart-${item.id}" class="fa-regular fa-heart text-red-500"></i>
                </button>

                <div
                  class=" rounded-bl-3xl bg-[#f1f2f3] flex items-center justify-center hov"
                >
                  <img
                    src="${item.image}"
                    alt=""
                    class="w-full h-[280px] object-cover object-center rounded-2xl transition duration-300 hover:scale-105"
                  />
                </div>

                <div class="p-[25px] text-white">
                  <h5 class="mb-[8px] text-[20px] font-bold">${item.name}</h5>
                  <p class="mb-[16px] text-[15px]">${item.category}</p>
                  <p class="mb-[16px] text-[15px]">${item.description}</p>

                  <div class="flex items-center justify-between">
                    <h6 class='text-2xl font-bold'>$${item.price}</h6>
                    <a
                      onclick="event.stopPropagation(); addBasket(${item.id})"
                      class="w-[40px] h-[40px] bg-[#ffbe33] hover:bg-[#dd9700] duration-200 cursor-pointer flex items-center justify-center rounded-full"
                    >
                      <i class="fa-solid fa-cart-shopping "></i>
                    </a>
                  </div>
                </div>
              </div>
    `;
  });
}

function openModalBasket() {
  let modalBasket = document.getElementById("modalBasket");
  modalBasket.style.display === "none"
    ? (modalBasket.style.display = "block")
    : (modalBasket.style.display = "none");
}

let allProducts = [];

function getAllData() {
  fetch("https://69b68ba2583f543fbd9df704.mockapi.io/f142/products")
    .then((data) => data.json())
    .then((data) => {
      allProducts = data;
      data
        .map((item) => {
          product.innerHTML += `
       <div
                id="${item.id}"
                class="relative rounded-2xl overflow-hidden bg-[#222831]"
              >
                <button
                  onclick="event.stopPropagation(); addWishlist(${item.id})"
                  class="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition"
                >
                  <i id="heart-${item.id}" class="fa-regular fa-heart text-red-500"></i>
                </button>

                <div
                  class=" rounded-bl-3xl bg-[#f1f2f3] flex items-center justify-center hov"
                >
                  <img
                    src="${item.image}"
                    alt=""
                    class="w-full h-[280px] object-cover object-center rounded-2xl transition duration-300 hover:scale-105"
                  />
                </div>

                <div class="p-[25px] text-white">
                  <h5 class="mb-[8px] text-[20px] font-bold">${item.name}</h5>
                  <p class="mb-[16px] text-[15px]">${item.category}</p>
                  <p class="mb-[16px] text-[15px]">${item.description}</p>

                  <div class="flex items-center justify-between">
                    <h6 class='text-2xl font-bold'>$${item.price}</h6>
                    <a
                      onclick="event.stopPropagation(); addBasket(${item.id})"
                      class="w-[40px] h-[40px] bg-[#ffbe33] hover:bg-[#dd9700] duration-200 cursor-pointer flex items-center justify-center rounded-full"
                    >
                      <i class="fa-solid fa-cart-shopping "></i>
                    </a>
                  </div>
                </div>
              </div>
        `;
        })
        .join("");
    });
}

function addProduct() {
  let name = document.getElementById("name");
  let desc = document.getElementById("desc");
  let price = document.getElementById("price");
  let category = document.getElementById("category");
  let image = document.getElementById("image");

  const nameValue = name.value;
  const descValue = desc.value;
  const priceValue = price.value;
  const categoryValue = category.value;
  const imageValue = image.value;

  const data = {
    name: nameValue,
    description: descValue,
    price: priceValue,
    category: categoryValue,
    image: imageValue,
  };

  fetch("https://69b68ba2583f543fbd9df704.mockapi.io/f142/products", {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then(() => {
      name.value = "";
      desc.value = "";
      price.value = "";
      category.value = "";
      image.value = "";

      product.innerHTML = "";
      getAllData();
    });
}

let basket = [];
let basketList = document.getElementById("basketList");

function addBasket(id) {
  let foundProduct = basket.find((p) => p.id == id);
  if (foundProduct) {
    foundProduct.count += 1;
  } else {
    basket.unshift({ id: id, count: 1 });
  }
  showBasket();
  let number = totalCount();
  count.innerHTML = number;
  countMobile.innerHTML = number;
}

function totalCount() {
  return basket.reduce((sum, item) => sum + item.count, 0);
}

function showBasket() {
  let total = 0;
  basketList.innerHTML = "";
  basketList.innerHTML = basket
    .map((item, index) => {
      let product = allProducts.find((p) => p.id == item.id);
      total += product.price * item.count;
      return `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 px-4 bg-white shadow-sm rounded-lg mb-3 ">
        <div class="flex items-center gap-4">
          <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg" />
          <div class="flex flex-col">
            <h6 class="font-bold text-gray-900">${product.name}</h6>
            <p class="text-gray-500 text-sm">${product.category}</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg">
            <button onclick="updateCount(${index},'minus')" class="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full font-bold cursor-pointer">-</button>
            <span class="text-sm font-bold w-6 text-center">${item.count}</span>
            <button onclick="updateCount(${index},'plus')" class="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full font-bold cursor-pointer">+</button>
          </div>
          <span class="font-semibold text-yellow-600 text-lg">$${(product.price * item.count).toFixed(2)}</span>
          <button onclick="removeBasket(${index})" class="text-red-500 hover:text-red-700">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
    })
    .join("");
  priceTotal.innerHTML = `
      <li class="flex flex-wrap gap-4 text-sm py-3 font-bold text-blue-600">
      Total <span class="ml-auto">${total} $</span>
    </li>
   `;
}

function removeBasket(index) {
  let modalBasket = document.getElementById("modalBasket");
  basket.splice(index, 1);
  basket.length == 0
    ? (modalBasket.style.display = "none")
    : (modalBasket.style.display = "block");
  showBasket();
  let number = totalCount();
  count.innerHTML = number;
  countMobile.innerHTML = number;
}

function updateCount(index, action) {
  if (action === "plus") {
    basket[index].count += 1;
  } else if (action === "minus") {
    if (basket[index].count > 1) {
      basket[index].count -= 1;
    }
  } else {
    basket.splice(item, 1);
  }
  showBasket();
  let number = totalCount();
  count.innerHTML = number;
  countMobile.innerHTML = number;
}

getAllData();

let links = document.querySelectorAll(".nav-link");

links.forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add("text-[#ffbe33]");
  }
});
