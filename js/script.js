function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    navLinks.classList.toggle('show');
    menuToggle.classList.toggle('active');
}



function filterCourses(category) {
    const courses = document.querySelectorAll(".course");

    courses.forEach(course => {
        if (category === "all") {
            course.style.display = "block"; // Show all courses
        } else {
            if (course.getAttribute("data-category") === category) {
                course.style.display = "block"; // Show only selected category
            } else {
                course.style.display = "none"; // Hide other categories
            }
        }
    });
}


function filterCourses(category) {
    // Remove the "active" class from all buttons
    const buttons = document.querySelectorAll('.course-filter button');
    buttons.forEach(button => button.classList.remove('active'));

    // Add the "active" class to the clicked button
    const activeButton = document.querySelector(`.course-filter button[onclick="filterCourses('${category}')"]`);
    activeButton.classList.add('active');

    // Filter the course list
    const courses = document.querySelectorAll('#course-list .course');
    courses.forEach(course => {
        if (category === 'all' || course.getAttribute('data-category') === category) {
            course.style.display = 'block'; // Show the course
        } else {
            course.style.display = 'none'; // Hide the course
        }
    });
}



// footer 
// Get the last modified date of the document
const lastModified = new Date(document.lastModified);

// Format the date as desired (e.g., "Month Day, Year")
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = lastModified.toLocaleDateString(undefined, options);

// Insert the formatted date into the footer
document.getElementById('last-modified').textContent = formattedDate;