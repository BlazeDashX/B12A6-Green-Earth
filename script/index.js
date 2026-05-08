const categoryUrl = "https://openapi.programming-hero.com/api/categories";
const allPlantUrl = "https://openapi.programming-hero.com/api/plants";
const plantByCategoryUrl = (id) =>
    `https://openapi.programming-hero.com/api/category/${id}`;
// const plantDetailsUrl = `https://openapi.programming-hero.com/api/plant/${id}`;

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

    cardContainer.className = "grid grid-cols-3 gap-4";

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
                        class="bg-[#15813c] text-white rounded-3xl border-none hover:bg-white hover:text-black cursor-pointer w-full p-2"
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

loadCategories();
loadPlants();