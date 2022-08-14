let data;
let courseIdx = 0;
const getData = async (url) => {
    let response = await fetch(url);
    let json = await response.json();
    data = json;
    let topicsNav = document.querySelector(".topic-list");
    for (let i = 0; i < data.length; i++) {
        let topic = document.createElement("li");
        topic.setAttribute("class", "topic-elem nav-item");
        topic.setAttribute("role", "presentation");

        let topicLink = document.createElement("a");
        if (i == 0) {
            topicLink.setAttribute("class", "nav-link active");
            topicLink.setAttribute("aria-selected", "true");
        } else {
            topicLink.setAttribute("class", "nav-link");
            topicLink.setAttribute("aria-selected", "false");
        }

        topicLink.setAttribute("id", "tab-link" + data[i].id);
        topicLink.setAttribute("data-bs-toggle", "tab");
        topicLink.setAttribute("href", "#tab-content-" + data[i].id);
        topicLink.setAttribute("role", "tab");
        topicLink.setAttribute("aria-controls", "tab-" + data[i].id);

        topicLink.textContent = data[i].name;
        topic.appendChild(topicLink);
        topicsNav.appendChild(topic);
    }
    let topicContent = document.querySelector(".section-two-content");
    for (let i = 0; i < data.length; i++) {
        let topicContentTab = document.createElement("div");
        if (i == 0) {
            topicContentTab.setAttribute("class", "tab-pane fade show active");
        } else {
            topicContentTab.setAttribute("class", "tab-pane fade");
        }
        topicContentTab.setAttribute("id", "tab-content-" + data[i].id);
        topicContentTab.setAttribute("role", "tabpanel");
        topicContentTab.setAttribute(
            "aria-labelledby",
            "tab-link" + data[i].id
        );

        let topic = document.createElement("div");
        topic.setAttribute("class", "section-two-topic");

        let subHeader = document.createElement("h2");
        subHeader.setAttribute("class", "section-two-sub-header");
        subHeader.textContent = data[i].content.header;
        topic.appendChild(subHeader);

        let subParagraph = document.createElement("p");
        subParagraph.setAttribute("class", "section-two-sub-paragraph");
        subParagraph.textContent = data[i].content.paragraph;
        topic.appendChild(subParagraph);

        topicContentTab.appendChild(topic);

        let exploreBtn = document.createElement("input");
        exploreBtn.setAttribute("class", "explore-btn");
        exploreBtn.setAttribute("id", "explore-btn-" + data[i].id);
        exploreBtn.setAttribute("type", "button");
        exploreBtn.setAttribute("value", "Explore " + data[i].name);
        topicContentTab.appendChild(exploreBtn);

        let courseList = document.createElement("div");
        courseList.setAttribute("class", "section-two-list");
        for (let j = 0; j < data[i].content.courses.length; j++) {
            let course = data[i].content.courses[j];
            let article = document.createElement("artice");
            article.setAttribute(
                "class",
                "section-two-list-elem card border-0"
            );

            let img = document.createElement("img");
            img.setAttribute("class", "section-two-img card-img-top");
            img.setAttribute("src", course.img);

            let cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");

            let title = document.createElement("h3");
            title.setAttribute("class", "section-two-content-header");
            title.textContent = course.title;
            title.style.height = "50px";

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

            let oldPrice = document.createElement("s");
            oldPrice.setAttribute("class", "section-two-old-price");
            oldPrice.textContent = course.oldPrice;

            cardBody.appendChild(title);
            cardBody.appendChild(desc);
            cardBody.appendChild(rating);
            cardBody.append(newPrice);
            cardBody.append(oldPrice);

            article.appendChild(img);
            article.appendChild(cardBody);

            courseList.appendChild(article);
        }
        topicContentTab.appendChild(courseList);
        topicContent.appendChild(topicContentTab);
    }
};

function renderPage(topic) {
    let subHeader = document.querySelector(".section-two-sub-header");
    let subParagraph = document.querySelector(".section-two-sub-paragraph");
    subHeader.textContent = topic.content.header;
    subParagraph.textContent = topic.content.paragraph;
    renderList(topic.content.courses);
}

function renderList(courses) {
    let parentDiv = document.querySelector(".section-two-list");
    parentDiv.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        if (courseIdx + i >= courses.length) {
            break;
        }
        let course = courses[courseIdx + i];
        let article = document.createElement("artice");
        article.setAttribute("class", "section-two-list-elem card border-0");

        let img = document.createElement("img");
        img.setAttribute("class", "section-two-img card-img-top");
        img.setAttribute("src", course.img);

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        let title = document.createElement("h3");
        title.setAttribute("class", "section-two-content-header");
        title.textContent = course.title;
        title.style.height = "50px";

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

        let oldPrice = document.createElement("s");
        oldPrice.setAttribute("class", "section-two-old-price");
        oldPrice.textContent = course.oldPrice;

        cardBody.appendChild(title);
        cardBody.appendChild(desc);
        cardBody.appendChild(rating);
        cardBody.append(newPrice);
        cardBody.append(oldPrice);

        article.appendChild(img);
        article.appendChild(cardBody);

        parentDiv.appendChild(article);
    }
}

function search() {
    let searchBar = document.querySelector(".search-bar").value;
    let matchedCourses = [];
    for (let course of data.content.courses) {
        let title = course.title;
        if (title.includes(searchBar))
            matchedCourses = [...matchedCourses, course];
    }
    courseIdx = 0;
    renderList(matchedCourses);
}
function showNext() {
    if (courseIdx + 5 < data.content.courses.length) {
        courseIdx += 5;
    }
    renderList(data.content.courses);
}
function showBack() {
    if (courseIdx != 0) {
        courseIdx -= 5;
    }
    renderList(data.content.courses);
}

getData("http://localhost:3000/topic");

let searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", search);

// let nextBtn = document.querySelector(".next-btn");
// nextBtn.addEventListener("click", showNext);

// let backBtn = document.querySelector(".back-btn");
// backBtn.addEventListener("click", showBack);
