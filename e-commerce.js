// ---------- CART ----------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cartIcons = document.querySelectorAll("#cart");

    cartIcons.forEach(function (cartIcon) {
        const count = cart.reduce(function (total, item) {
            return total + item.quantity;
        }, 0);

        cartIcon.title = `Cart (${count} items)`;
    });
}

function addToCart(product) {

    const existingProduct = cart.find(function (item) {
        return item.name === product.name;
    });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    alert(`${product.name} added to cart!`);
}


// ---------- HOME PAGE CART BUTTONS ----------

const cartButtons = document.querySelectorAll(".add-cart-icon");

cartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard = button.closest(".shop-home-card-1");

        if (!productCard) {
            return;
        }

        const nameElement = productCard.querySelector("h3");
        const priceElement = productCard.querySelector(".rate-box h3");
        const imageElement = productCard.querySelector(".normalimg");

        const product = {
            name: nameElement ? nameElement.textContent.trim() : "Product",
            price: priceElement ? priceElement.textContent.trim() : "$0",
            image: imageElement ? imageElement.getAttribute("src") : ""
        };

        addToCart(product);
    });
});


// ---------- COMPARE PAGE ----------

const compareButtons = document.querySelectorAll(".buy .button");

compareButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const cell = button.closest("td");

        if (!cell) {
            return;
        }

        const row = cell.parentElement;
        const columnIndex = Array.from(row.children).indexOf(cell);

        const imageRow = document.querySelector("tr.image");

        let image = "";

        if (imageRow && imageRow.children[columnIndex]) {
            const imageElement =
                imageRow.children[columnIndex].querySelector("img");

            if (imageElement) {
                image = imageElement.getAttribute("src");
            }
        }

        const product = {
            name: `Compared Product ${columnIndex}`,
            price: "$0",
            image: image
        };

        addToCart(product);
    });
});


// ---------- SEARCH ----------

const searchForms = document.querySelectorAll("form");

searchForms.forEach(function (form) {

    const searchInput = form.querySelector('input[type="search"]');

    if (!searchInput) {
        return;
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const searchText = searchInput.value.trim();

        if (searchText === "") {
            alert("Please enter something to search.");
            return;
        }

        alert(`Searching for: ${searchText}`);
    });
});


// ---------- LOGIN ----------

const loginForm = document.querySelector(".login-block");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = loginForm
            .querySelector('input[type="email"]')
            .value.trim();

        const password = loginForm
            .querySelector('input[type="password"]')
            .value.trim();

        if (email === "" || password === "") {
            alert("Please enter your email and password.");
            return;
        }

        localStorage.setItem("loggedInUser", email);

        alert("Login successful!");

        window.location.href = "clothing-myaccount-html.html";
    });
}


// ---------- REGISTRATION ----------

const registerForm = document.querySelector(".register-block");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const inputs = registerForm.querySelectorAll("input");

        const username = inputs[0].value.trim();
        const email = inputs[1].value.trim();
        const password = inputs[2].value;
        const confirmPassword = inputs[3].value;

        if (
            username === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            alert("Please fill in all registration fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        localStorage.setItem("registeredUser", username);
        localStorage.setItem("registeredEmail", email);

        alert("Registration successful!");

        registerForm.reset();
    });
}


// ---------- MY ACCOUNT ----------

const accountMenu = document.querySelector(".menu");

if (accountMenu) {

    const menuItems = accountMenu.querySelectorAll("li");

    menuItems.forEach(function (item) {

        const text = item.textContent.trim();

        item.addEventListener("click", function () {

            if (text.includes("Logout")) {

                localStorage.removeItem("loggedInUser");

                alert("You have been logged out.");

                window.location.href = "clothing-login-html.html";

            } else {

                alert(`${text} section selected.`);
            }
        });
    });
}

// ---------- INITIAL CART COUNT ----------

updateCartCount();
