import { API_BASE_URL, endpoints } from "./constants.js";
import { checkUser, getAllData } from "./details.js";

const loginForm = document.querySelector(".login-form");

async function init() {
    const users = await getAllData(API_BASE_URL, endpoints.users);

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("test");

        const usernameInp = document.querySelector("#username");
        const passwordInp = document.querySelector("#password");

        const checkValidUser = users.find(
            (x) => x.username === usernameInp.value && x.password === passwordInp.value
        );

        if (checkValidUser) {
            localStorage.setItem("user", JSON.stringify(checkValidUser.id));
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User signed in successfully!",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                window.location.replace("index.html");
            });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Username or password is incorrect!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
    
    displayLogoutButton();
}

async function displayLogoutButton() {
    const user = await checkUser();  // Properly await the result of checkUser
    
    if (user) {
        // Dynamically add the logout button
        const logoutContainer = document.getElementById("logout-container");
        logoutContainer.innerHTML = `
            <button id="logout-btn" style="
                background-color: red;
                color: white;
                padding: 10px 20px;
                border: none;
                cursor: pointer;
                border-radius: 5px;
                margin-top: 10px;">
                Log Out
            </button>
        `;
        
        // Attach the logout functionality to the button
        document.getElementById("logout-btn").addEventListener("click", () => {
            Swal.fire({
                title: "Are you sure you want to log out?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Log Out",
                cancelButtonText: "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    logout();
                }
            });
        });
    }
}

// Logout function
function logout() {
    localStorage.removeItem("user");
    window.location.replace("login.html");
}

// Call the init function to load users and set up event listeners
init();
