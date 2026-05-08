const categoryUrl = "https://openapi.programming-hero.com/api/categories";
const allPlantUrl = "https://openapi.programming-hero.com/api/plants";
const plantByCategoryUrl = (id) =>
    `https://openapi.programming-hero.com/api/category/${id}`;
const plantDetailsUrl = (id) =>
    `https://openapi.programming-hero.com/api/plant/${id}`;

let cart = [];

const loadCategories = () => {
    fetch(categoryUrl)
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories));
};

const displayCategories = (categories) => {
    const categoryList = document.getElementById("category-list");

    categoryList.innerHTML = "";

    const allCategory = document.createElement("li");
    allCategory.innerHTML = `
        <a href="#" class="active">All</a>
    `;

    const allCategoryBtn = allCategory.querySelector("a");

    allCategoryBtn.addEventListener("click", function (e) {
        e.preventDefault();
        setActive(this);
        loadPlants();
    });

    categoryList.append(allCategory);

    categories.forEach((category) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <a href="#">
                ${category.category_name}
            </a>
        `;

        const catBtn = li.querySelector("a");

        catBtn.addEventListener("click", function (e) {
            e.preventDefault();
            setActive(this);
            loadPlantsByCategory(category.id);
        });

        categoryList.append(li);
    });
};

const setActive = (clickedBtn) => {
    const buttons = document.querySelectorAll("#category-list a");

    buttons.forEach((btn) => {
        btn.classList.remove("active");
    });

    clickedBtn.classList.add("active");
};

const loadPlants = () => {
    fetch(allPlantUrl)
        .then((res) => res.json())
        .then((data) => displayPlants(data.plants));
};

const loadPlantsByCategory = (id) => {
    fetch(plantByCategoryUrl(id))
        .then((res) => res.json())
        .then((data) => displayPlants(data.plants));
};

const displayPlants = (plants) => {
    const plantCards = document.getElementById("plant-cards");

    plantCards.innerHTML = "";

    const cardContainer = document.createElement("div");

    cardContainer.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";
    
    plants.forEach((plant) => {
        const card = document.createElement("div");

        card.innerHTML = `
            <div class="card bg-base-100 shadow-sm w-full">
                <figure>
                    <img
                        class="w-full h-[220px] object-cover pt-5 px-5"
                        src="${plant.image}"
                        alt="${plant.name}"
                    />
                </figure>

                <div class="p-4 space-y-3">
                    <h2 class="card-title font-semibold text-sm">
                        ${plant.name}
                    </h2>

                    <p class="text-xs text-[#1F2937] text-justify">
                        ${plant.description.slice(0, 100)}...
                    </p>

                    <div class="card-actions justify-between">
                        <div
                            class="bg-[#ddfde7] text-green-700 rounded-3xl border-none"
                        >
                            <p class="py-1 px-3">
                                ${plant.category}
                            </p>
                        </div>

                        <div class="font-semibold text-base">
                            <p>৳${plant.price}</p>
                        </div>
                    </div>

                    <button
                        onclick="handleAddToCart(${plant.id})"
                        class="bg-[#15813c] text-white rounded-3xl border-none cursor-pointer w-full p-2 hover:bg-[#0f6b30] transition-colors duration-200"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        `;

        cardContainer.append(card);
    });

    plantCards.append(cardContainer);
};

const handleAddToCart = (id) => {
    fetch(plantDetailsUrl(id))
        .then((res) => res.json())
        .then((data) => {
            addToCart(data.plants);
        });
};

const addToCart = (plant) => {
    const existingItem = cart.find(item => item.id === plant.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...plant,
            quantity: 1
        });
    }

    renderCart();
};

const renderCart = () => {
    const cartContainer = document.querySelector("#cart");

    cartContainer.innerHTML = `
        <h2 class="font-bold text-xl">Your Cart</h2>
    `;

    if (cart.length === 0) {
        cartContainer.innerHTML += `
            <div class="text-center py-10 text-gray-500">
                <p class="text-lg font-semibold">Your cart is empty</p>
                <p class="text-sm mt-2">Add plants to see them here</p>
            </div>
        `;
        return;
    }

    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;

        const div = document.createElement("div");

        div.className =
            "flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 rounded-2xl bg-[#f1fcf4] px-4 py-3 sm:px-5 sm:py-4";

        div.innerHTML = `
            <div class="w-full sm:w-auto">
                <h3 class="text-base sm:text-lg font-semibold text-gray-800">
                    ${item.name}
                </h3>

                <p class="mt-1 sm:mt-2 text-sm sm:text-lg text-gray-500">
                    ৳${item.price} × ${item.quantity}
                </p>
            </div>

            <button onclick="removeFromCart(${item.id})"
                class="self-end sm:self-auto text-2xl sm:text-3xl text-gray-500 hover:text-red-500 transition">
                ×
            </button>
        `;

        cartContainer.appendChild(div);
    });

    const totalDiv = document.createElement("div");

    totalDiv.innerHTML = `
        <div class="border-t border-gray-300 mt-3"></div>

        <div class="flex items-center justify-between mt-4">
            <h2 class="text-base sm:text-lg font-semibold text-gray-800">
                Total:
            </h2>

            <p class="text-base sm:text-lg font-semibold text-gray-800">
                ৳${total}
            </p>
        </div>
    `;

    cartContainer.appendChild(totalDiv);
};

const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    renderCart();
};

loadCategories();
loadPlants();
renderCart();