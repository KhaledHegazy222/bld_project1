let data;
const getData = async (passedFunction) => {
    let response = await fetch("http://localhost:3000/courses");
    let json = await response.json();
    data = json;
    render(data);
};

function render(courses) {
    let parentDiv = document.querySelector(".section-two-list");
    parentDiv.innerHTML = "";
    for (let course of courses) {
        let article = document.createElement("artice");
        article.setAttribute("class", "section-two-list-elem");

        let img = document.createElement("img");
        img.setAttribute("class", "section-two-img");
        img.setAttribute("src", course.img);

        let title = document.createElement("h3");
        title.setAttribute("class", "section-two-content-header");
        title.textContent = course.title;

        let desc = document.createElement("div");
        desc.setAttribute("class", "section-two-content-desc");
        desc.textContent = course.instructor;

        let rating = document.createElement("div");
        rating.setAttribute("class", "rating");
        let ratingVal = document.createElement("span");
        ratingVal.setAttribute("class", "rating-value");
        ratingVal.innerHTML = "4.4";
        rating.appendChild(ratingVal);
        let starList = document.createElement("ul");
        starList.setAttribute("class", "rating-list");
        for (let i = 0; i < 5; i++) {
            let star = document.createElement("li");
            if (i === 4) {
                star.setAttribute("class", "fa fa-star-half-full checked");
            } else {
                star.setAttribute("class", "fa fa-star checked");
            }
            starList.appendChild(star);
        }
        rating.appendChild(starList);

        let newPrice = document.createElement("div");
        newPrice.setAttribute("class", "section-two-price");
        newPrice.textContent = course.newPrice;

        let oldPrice = document.createElement("div");
        oldPrice.setAttribute("class", "section-two-old-price");
        oldPrice.textContent = course.oldPrice;

        article.appendChild(img);
        article.appendChild(title);
        article.appendChild(desc);
        article.appendChild(rating);
        article.append(newPrice);
        article.append(oldPrice);

        parentDiv.appendChild(article);
    }
}

function search() {
    let searchBar = document.querySelector(".search-bar").value;
    let matchedCourses = [];
    for (let course of data) {
        let title = course.title;
        if (title.includes(searchBar))
            matchedCourses = [...matchedCourses, course];
    }
    render(matchedCourses);
}

getData(render);

let searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", search);
