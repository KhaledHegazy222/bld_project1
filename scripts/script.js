/*
    This JS file is responsible for :
        1- Get Needed Data for Udemy homepage 
        2- initialize Topics & Courses Content with recieved Data
        3- present the courses with next and back buttons to view more courses
        4- Handle Search in search bar
*/

let data;
let courseIdxArr = [];

const getData = async (url) => {
    // This Function Collect Data and initialize the home page content based on recieved Data

    // Fetch All Courses Data From The Given URL
    let response = await fetch(url);
    let json = await response.json();

    // Store recieved json file
    data = json;

    // Create Topic Navigation Bar with Tabs
    let topicsNav = document.querySelector(".topic-list");

    for (let i = 0; i < data.length; i++) {
        // Initialize Courses list index for each topic with zero
        courseIdxArr = [...courseIdxArr, 0];

        // Create Each Topic Navigation link
        let topic = document.createElement("li");
        topic.setAttribute("class", "topic-elem");
        let topicLink = document.createElement("a");
        if (i == 0) {
            // Set The First Link to be active by default
            topicLink.setAttribute("class", "nav-link active");
            topicLink.setAttribute("aria-selected", "true");
        } else {
            topicLink.setAttribute("class", "nav-link");
            topicLink.setAttribute("aria-selected", "false");
        }

        topicLink.setAttribute("id", "tab-link-" + data[i].id);
        topicLink.setAttribute("data-toggle", "tab");
        topicLink.setAttribute("href", "#tab-content-" + data[i].id);
        topicLink.textContent = data[i].name;
        topic.appendChild(topicLink);
        topicsNav.appendChild(topic);
    }

    // Create Topic Tabs to fill the tab content
    let topicContent = document.querySelector(".section-two-content");
    for (let i = 0; i < data.length; i++) {
        let topicContentTab = document.createElement("div");
        if (i == 0) {
            // Set the first tab to appear by default
            topicContentTab.setAttribute("class", "tab-pane fade show active");
        } else {
            topicContentTab.setAttribute("class", "tab-pane fade");
        }
        topicContentTab.setAttribute("id", "tab-content-" + data[i].id);

        // Filling the tab with needed Data
        renderPage(data[i], topicContentTab);

        // Appending The Page to the topic Tab
        topicContent.appendChild(topicContentTab);
    }
};

function getActiveTab() {
    // This Function Return the index of active topic tab (zero indexed)

    // get the id of the active tab
    let x = document.querySelector(".topic-list").querySelector(".active");

    // extract the number of the tab from its id
    let number = x.id.substring(9, x.length);

    // converting the extracted number to integer (zero based)
    return parseInt(number) - 1;
}

function search() {
    // This Function Filters Courses in the active tab which have the searched string in its title

    // Get Active Tab index
    let idx = getActiveTab();

    // Get The String in the search bar
    let searchBar = document.querySelector(".search-bar").value;

    // get the courses to filer from
    let coursesList = document
        .querySelector(".section-two-content")
        .querySelector(".active")
        .querySelector(".section-two-list");

    // initialize empty array to fill with matching courses
    let matchedCourses = [];
    for (let course of data[idx].content.courses) {
        let title = course.title;
        // in case of match append course to list
        if (title.includes(searchBar))
            matchedCourses = [...matchedCourses, course];
    }
    courseIdxArr[idx] = 0;
    // Render The Matched Courses in the list filtered courses
    renderList(matchedCourses, courseIdxArr[idx], coursesList);
}

function showNext() {
    // This Function Shifts The Displayed Courses to view additional Courses (On click Event for Next button)

    // Get Active Tab Index
    let idx = getActiveTab();

    // If There exist addition Courses can be displayed
    if (courseIdxArr[idx] + 1 < data[idx].content.courses.length) {
        let coursesList = document
            .querySelector(".section-two-content")
            .querySelector(".active")
            .querySelector(".section-two-list");
        // Render New Courses
        renderList(data[idx].content.courses, ++courseIdxArr[idx], coursesList);
    }
}

function showBack() {
    // This Function Shifts The Displayed Courses to view additional Courses (On click Event for Back button)

    // Get Active Tab Index
    let idx = getActiveTab();

    // If There exist addition Courses can be displayed
    if (courseIdxArr[idx] != 0) {
        let coursesList = document
            .querySelector(".section-two-content")
            .querySelector(".active")
            .querySelector(".section-two-list");
        // Render New Courses
        renderList(data[idx].content.courses, --courseIdxArr[idx], coursesList);
    }
}

function renderPage(pageContnet, topicContentTab) {
    // This Function Render given Content in the given topic tab

    // Initialize Empty Topic Content Container
    let topic = document.createElement("div");
    topic.setAttribute("class", "section-two-topic");

    // Add topic's sub header to the topic container
    let subHeader = document.createElement("h2");
    subHeader.setAttribute("class", "section-two-sub-header");
    subHeader.textContent = pageContnet.content.header;
    topic.appendChild(subHeader);

    // Add topic's sub paragraph to the topic container
    let subParagraph = document.createElement("p");
    subParagraph.setAttribute("class", "section-two-sub-paragraph");
    subParagraph.textContent = pageContnet.content.paragraph;
    topic.appendChild(subParagraph);

    // Appent Topic to topic Tab
    topicContentTab.appendChild(topic);

    // Create Explore Button in each Tab
    let exploreBtn = document.createElement("input");
    exploreBtn.setAttribute("class", "explore-btn");
    exploreBtn.setAttribute("id", "explore-btn-" + pageContnet.id);
    exploreBtn.setAttribute("type", "button");
    exploreBtn.setAttribute("value", "Explore " + pageContnet.name);
    topicContentTab.appendChild(exploreBtn);

    // Initialize Empty Courses List
    let courseList = document.createElement("div");
    courseList.setAttribute("class", "section-two-list");

    // Create Back button to view Courses
    let backBtn = document.createElement("button");
    backBtn.setAttribute("class", "back-btn btn");
    backBtn.setAttribute("id", "back-btn-" + pageContnet.id);
    backBtn.innerHTML =
        '<i class="course-btn bi bi-arrow-left-circle-fill"></i>';
    backBtn.addEventListener("click", showBack);
    courseList.appendChild(backBtn);

    // Create Next button to view more Courses
    let nextBtn = document.createElement("button");
    nextBtn.setAttribute("class", "next-btn btn");
    nextBtn.innerHTML =
        '<i class="course-btn bi bi-arrow-right-circle-fill"></i>';
    nextBtn.setAttribute("id", "next-btn-" + pageContnet.id);
    nextBtn.addEventListener("click", showNext);
    courseList.appendChild(nextBtn);

    renderList(pageContnet.content.courses, 0, courseList);
    topicContentTab.appendChild(courseList);
}

function renderList(courses, courseIdx, coursesList) {
    // Select All Rendered Courses
    let oldDivs = coursesList.querySelectorAll(".section-two-list-elem");
    for (let i = 0; i < oldDivs.length; i++) {
        // Remove Old Displayed Courses
        coursesList.removeChild(oldDivs[i]);
    }
    // Render 5 Courses each list atmost
    for (let i = 0; i < 5; i++) {
        // Select Course to add (Courses are stored as a cyclic container)
        let course = courses[(courseIdx + i) % courses.length];

        // create empty article (course)
        let article = document.createElement("artice");
        article.setAttribute("class", "section-two-list-elem card border-0");

        // render Course Image
        let img = document.createElement("img");
        img.setAttribute("class", "section-two-img card-img-top");
        img.setAttribute("src", course.img);
        article.appendChild(img);

        // Card Body includes (Title + Instructor + Rating + Price)
        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        // Initialize Title
        let title = document.createElement("h3");
        title.setAttribute("class", "section-two-content-header");
        title.textContent = course.title;
        title.style.height = "50px";
        cardBody.appendChild(title);

        // Initialize Instructor
        let desc = document.createElement("div");
        desc.setAttribute("class", "section-two-content-desc");
        desc.textContent = course.instructor;
        cardBody.appendChild(desc);

        // Render Rating Icons
        let rating = document.createElement("div");
        rating.setAttribute("class", "rating");
        let ratingVal = document.createElement("span");
        ratingVal.setAttribute("class", "rating-value");
        ratingVal.innerHTML = "4.4";
        rating.appendChild(ratingVal);
        let starList = document.createElement("ul");
        starList.setAttribute("class", "rating-list");
        for (let i = 0; i < 5; i++) {
            // For Now All ratings = 4.4 star
            let star = document.createElement("li");
            if (i === 4) {
                star.setAttribute("class", "fa fa-star-half-full checked");
            } else {
                star.setAttribute("class", "fa fa-star checked");
            }
            starList.appendChild(star);
        }
        rating.appendChild(starList);
        cardBody.appendChild(rating);

        // Initialize New Price After Offer
        let newPrice = document.createElement("div");
        newPrice.setAttribute("class", "section-two-price");
        newPrice.textContent = course.newPrice;
        cardBody.append(newPrice);

        // Initialize Old Price
        let oldPrice = document.createElement("s");
        oldPrice.setAttribute("class", "section-two-old-price");
        oldPrice.textContent = course.oldPrice;
        cardBody.append(oldPrice);

        article.appendChild(cardBody);

        coursesList.appendChild(article);
    }
}

// Get Needed Data From API
getData("http://localhost:3000/topic");

// Add Event On click to search button
let searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", search);
