const categoryUrl = "https://openapi.programming-hero.com/api/categories";
const allPlantUrl = "https://openapi.programming-hero.com/api/plants";
// const plantByCategoryUrl = `https://openapi.programming-hero.com/api/category/${id}`;
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

loadCategories();