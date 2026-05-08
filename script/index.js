const categoryUrl = "https://openapi.programming-hero.com/api/categories";
const allPlantUrl = "https://openapi.programming-hero.com/api/plants";
const plantByCategoryUrl = "https://openapi.programming-hero.com/api/category/${id}";
const plantDetailsUrl = "https://openapi.programming-hero.com/api/plant/${id}";

const loadCategories = () => {
    fetch(categoryUrl)
        .then((res) => res.json())
        .then((json) => displayCategories(json.categories));
};

const displayCategories = (categories) => {
    const categoryList = document.getElementById("category-list");

    categoryList.innerHTML = "";

    const allCategory = document.createElement("li");
    allCategory.innerHTML = `
        <a href="#" class="active">All</a>
    `;
    categoryList.append(allCategory);

    categories.forEach((category) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <a href="#">
                ${category.category_name}
            </a>
        `;

        categoryList.append(li);
    });
};

loadCategories();