/*
    This JS file is responsible for :
        1- Get Needed Data for Udemy homepage 
        2- initialize Courses Content with recieved Data
        3- present the courses in multi rows
        4- Handle Search in search bar
*/

let data;
const getData = async (passedFunction) => {
    // This Function Collect Data and initialize the home page content based on recieved Data

    // Fetch All Courses Data From The Given URL
    let response = await fetch("http://localhost:3000/courses");
    let json = await response.json();

    // Store recieved json file
    data = json;

    // render data in homepage
    render(data);
};

function render(courses) {
    // This Function Render given Courses in the page

    // Initialize Empty List of courses
    let parentDiv = document.querySelector(".section-two-list");
    parentDiv.innerHTML = "";
    for (let course of courses) {
        // create empty article (course)
        let article = document.createElement("artice");
        article.setAttribute("class", "section-two-list-elem");

        // render Course Image
        let img = document.createElement("img");
        img.setAttribute("class", "section-two-img");
        img.setAttribute("src", course.img);
        article.appendChild(img);

        // Initialize Title
        let title = document.createElement("h3");
        title.setAttribute("class", "section-two-content-header");
        title.textContent = course.title;
        article.appendChild(title);

        // Initialize Instructor
        let desc = document.createElement("div");
        desc.setAttribute("class", "section-two-content-desc");
        desc.textContent = course.instructor;
        article.appendChild(desc);

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
        article.appendChild(rating);

        // Initialize New Price After Offer
        let newPrice = document.createElement("div");
        newPrice.setAttribute("class", "section-two-price");
        newPrice.textContent = course.newPrice;
        article.append(newPrice);

        // Initialize Old Price
        let oldPrice = document.createElement("div");
        oldPrice.setAttribute("class", "section-two-old-price");
        oldPrice.textContent = course.oldPrice;
        article.append(oldPrice);

        parentDiv.appendChild(article);
    }
}

function search() {
    // This Function Filters Courses which have the searched string in its title

    // Get The String in the search bar
    let searchBar = document.querySelector(".search-bar").value;

    // initialize empty array to fill with matching courses
    let matchedCourses = [];
    for (let course of data) {
        let title = course.title;
        // in case of match append course to list
        if (title.includes(searchBar))
            matchedCourses = [...matchedCourses, course];
    }
    // Render The Matched Courses in the list filtered courses
    render(matchedCourses);
}

// Get Needed Data From API
getData(render);

// Add Event On click to search button
let searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", search);
