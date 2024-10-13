import { API_BASE_URL, endpoints } from "./constants.js";
import { checkUser, deleteDataById, getAllData, getDataById, updateData } from "./details.js";


if (isLogged) {
    navLinks.innerHTML = `
      <li><a href="index.html">Home</a></li>
      <li class="text-light">${isLogged.username}</li>
                <li><button class="btn btn-outline-warning sign-out">Sign Out</button></li>
      `;
  } else {
    navLinks.innerHTML = `
    <li><a href="index.html">Home</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
    `;
  }

const blogsContainer = document.querySelector(".blog-container");
let blogs = []; // Declare the blogs array in a broader scope

// DOM Load
document.addEventListener('DOMContentLoaded', async () => {
    blogs = await getAllData(API_BASE_URL, endpoints.blogs); // Fetch all blogs

    // Render blog cards
    blogs.forEach((blog) => {
        blogsContainer.innerHTML += `
            <div class="blog-card" data-id="${blog.id}">
                <div class="blog-image">
                    <img src="${blog.image}" alt="Blog Image">
                    <div class="blog-date">
                        <span class="date-day">${blog.date.day}</span>
                        <span class="date-month">${blog.date.month}</span>
                        <br>
                    </div>
                </div>
                <br>
                <div class="blog-content">
                    <h3>${blog.title}</h3>
                    <p>${blog.description}</p>
                    <div class="blog-meta">
                        <span class="blog-category">
                            <i class="fa fa-folder"></i> ${blog.category}
                        </span>
                        <span class="blog-comments">
                            <i class="fa fa-comments"></i> 3 Comments
                        </span>
                    </div>
                    <div class="button-container" style="margin-top: 10px;">
                        <button class="details-btn" data-id="${blog.id}" style="
                            background-color: pink; 
                            color: black; 
                            border: none; 
                            padding: 5px 20px; 
                            border-radius: 5px; 
                            cursor: pointer; 
                            margin-right: 5px;">
                            Details
                        </button>
                        <button class="edit-btn" data-id="${blog.id}" style="
                            background-color: lightblue; 
                            color: black; 
                            border: none; 
                            padding: 5px 20px; 
                            border-radius: 5px; 
                            cursor: pointer; 
                            margin-right: 5px;">
                            Edit
                        </button>
                        <button class="delete-btn" data-id="${blog.id}" style="
                            background-color: yellow; 
                            color: black; 
                            border: none; 
                            padding: 5px 20px; 
                            border-radius: 5px; 
                            cursor: pointer;">
                            Delete
                        </button>
                        <i class="wish-list" data-id="${blog.id}" style="cursor: pointer;">❤</i>
                    </div>
                </div>
            </div>
        `;

        // Event listener for the wish-list button
        const wishListIcon = blogsContainer.querySelector(`.wish-list[data-id="${blog.id}"]`);
        wishListIcon.addEventListener('click', () => addToWishlist(blog.id));
    });

    // Delete Functionality
    if (!checkUser()) {
        alert("Please log in to perform this action.");
    } else {
        const deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        const blogCard = e.target.closest(".blog-card");
                        const id = blogCard.getAttribute("data-id");
                        deleteDataById(API_BASE_URL, endpoints.blogs, id).then((res) => {
                            blogCard.remove();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });
                        });
                    }
                });
            });
        });
    }

    // Details Functionality
    const detailsBtns = document.querySelectorAll(".details-btn");
    detailsBtns.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            const blogCard = e.target.closest(".blog-card");
            const id = blogCard.getAttribute("data-id");

            try {
                const blog = await getDataById(API_BASE_URL, endpoints.blogs, id);
                Swal.fire({
                    title: blog[0].title,
                    html: `
                        <img src="${blog[0].image}" alt="Blog Image" style="width: 100%; margin-bottom: 20px;">
                        <p><strong>Description:</strong> ${blog[0].description}</p>
                        <p><strong>Category:</strong> ${blog[0].category}</p>
                    `,
                    icon: "info",
                });
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to load blog details.",
                    icon: "error",
                });
            }
        });
    });

    // Edit Functionality
    if (!checkUser()) {
        alert("Please log in");
    } else {
        const editBtns = document.querySelectorAll(".edit-btn");
        editBtns.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                const blogCard = e.target.closest(".blog-card");
                const id = blogCard.getAttribute("data-id");

                try {
                    const blog = await getDataById(API_BASE_URL, endpoints.blogs, id);
                    const { title, description, category, image, date } = blog[0];

                    Swal.fire({
                        title: 'Edit Blog',
                        html: `
                            <input type="text" id="edit-title" class="swal2-input" value="${title}">
                            <input type="text" id="edit-category" class="swal2-input" value="${category}">
                            <input type="text" id="edit-image" class="swal2-input" value="${image}">
                            <input type="number" id="edit-day" class="swal2-input" value="${date.day}" min="1" max="31" placeholder="Day">
                            <input type="text" id="edit-month" class="swal2-input" value="${date.month}" placeholder="Month">
                            <textarea id="edit-description" class="swal2-textarea">${description}</textarea>
                        `,
                        focusConfirm: false,
                        preConfirm: () => {
                            const updatedTitle = document.getElementById('edit-title').value;
                            const updatedCategory = document.getElementById('edit-category').value;
                            const updatedImage = document.getElementById('edit-image').value;
                            const updatedDay = document.getElementById('edit-day').value;
                            const updatedMonth = document.getElementById('edit-month').value;
                            const updatedDescription = document.getElementById('edit-description').value;

                            return {
                                title: updatedTitle,
                                category: updatedCategory,
                                image: updatedImage,
                                description: updatedDescription,
                                date: {
                                    day: updatedDay,
                                    month: updatedMonth
                                }
                            };
                        }
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const updatedBlog = result.value;
                            try {
                                await updateData(API_BASE_URL, endpoints.blogs, id, updatedBlog);
                                Swal.fire({
                                    title: "Success!",
                                    text: "Blog updated successfully.",
                                    icon: "success"
                                });
                                // Update the UI with the new values
                                blogCard.querySelector("h3").innerText = updatedBlog.title;
                                blogCard.querySelector("p").innerText = updatedBlog.description;
                                blogCard.querySelector(".blog-category").innerHTML = `<i class="fa fa-folder"></i> ${updatedBlog.category}`;
                                blogCard.querySelector(".blog-image img").src = updatedBlog.image;
                                blogCard.querySelector(".date-day").innerText = updatedBlog.date.day;
                                blogCard.querySelector(".date-month").innerText = updatedBlog.date.month;
                            } catch (error) {
                                Swal.fire({
                                    title: "Error!",
                                    text: "Failed to update blog.",
                                    icon: "error",
                                });
                            }
                        }
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to load blog for editing.",
                        icon: "error",
                    });
                }
            });
        });
    }

    // Search and Filter Functionality
    document.getElementById('search-input').addEventListener('input', filterBlogs);
    document.getElementById('category-filter').addEventListener('change', filterBlogs);

    function filterBlogs() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const selectedCategory = document.getElementById('category-filter').value.toLowerCase();

        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach((card) => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.querySelector('.blog-category').textContent.toLowerCase();

            // Filter logic: Matches search term and category filter
            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = (selectedCategory === 'all') || category.includes(selectedCategory);

            // Show/hide the card based on filters
            if (matchesSearch && matchesCategory) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }
});

// Add to wishlist functionality
function addToWishlist(id) {
    const blog = blogs.find(c => c.id === id);
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isInWishlist = wishlist.some(item => item.id === blog.id);

    if (!isInWishlist) {
        wishlist.push(blog);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert(`${blog.title} has been added to your wishlist!`);
    } else {
        wishlist = wishlist.filter(item => item.id !== blog.id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert(`${blog.title} has been removed from your wishlist.`);
    }
}
