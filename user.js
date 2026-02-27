import { auth, db, collection, getDocs, addDoc }    
from "./firebase.js";

import { signOut, onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ---------- Session Check ---------- */
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location = "login.html";
    }
});

/* ---------- Logout ---------- */
window.logout = function () {
    signOut(auth).then(() => window.location = "login.html");
}

const container = document.getElementById("shopContainer");
const cartBox = document.getElementById("cartBox");
const billBox = document.getElementById("billBox");
const compareBox = document.getElementById("compareBox");
const offerSection = document.getElementById("offerSection");

/* ---------- Load Shop ---------- */
async function loadShops() {
    const snapshot = await getDocs(collection(db, "shops"));
    container.innerHTML = "";
    snapshot.forEach(docu => {
        const shop = docu.data();
        container.innerHTML += `
            <div class="card">
                <h3>${shop.name}</h3>
                <p>Category: ${shop.category}</p>
                <p>Floor: ${shop.floor}</p>
                <p>Offer: ${shop.offer}</p>
                <button>View Shop</button>
            </div>
            `;
    });
}
loadShops();

/* ---------- Filter ---------- */
window.filterShops = function () {
    let input = document.getElementById("search").value.toLowerCase();
    document
        .querySelectorAll(".card")
        .forEach(card => {
            card.style.display = card.innerText.toLowerCase().includes(input) ? "block" : "none";
        });
}


/* ---------- load shop offer ---------- */
async function loadShopOffers() {
    const snapshot = await getDocs(collection(db, "shops"));
    offerSection.innerHTML = "";
    snapshot.forEach(docu => {
        const shop = docu.data();
        offerSection.innerHTML += `
            <div class="card">
                <h3>${shop.name}</h3>
                <p>Offer : ${shop.offer}</p>
                <button onclick="viewProducts('${docu.id}')">
                View Products
                </button>
            </div>
        `;
    });
}
loadShopOffers();

/* ---------- View Products Of Selected Shop ---------- */
window.viewProducts = async function (shopId) {
        const productRef = collection(db, "shops", shopId, "products");
        const snapshot = await getDocs(productRef);
        container.innerHTML = "<h2>Product</h2>";
        snapshot.forEach(docu => {
            const p = docu.data();
            container.innerHTML += `
                <div class="card">
                    <h3>${p.name}</h3>
                    <p>Price : ₹${p.price}</p>
                    <p>${p.features}</p>
                    <p>Offer : ${p.offer}</p>
                    <button onclick="addToCart('${p.name}', ${p.price})">Add To Cart</button>
                    <!-- Checkbox beside Compare -->
                    <label style="display: inline-flex; align-items: center; margin-top: 10px; cursor: pointer;">
                        <input type="checkbox" 
                            style="margin-right: 5px;" 
                            onclick="selectCompare('${p.name}', '${p.price}', '${p.features}')">
                        Compare
                    </label>
                </div>
            `;
        });
    }

/* ---------- Add Comparison ---------- */
let compareList = [];
window.selectCompare = function (name, price, features) {
        if (compareList.length >= 2) {
            alert("Only 2 products allowed");
            return;
        }
        if (!compareList.find(p => p.name === name)) {
            compareList.push({ name, price, features });
        }
        showComparison();
    }

function showComparison() {
    compareBox.innerHTML = "";
    compareList.forEach(p => {
        compareBox.innerHTML += `
            <div class="card">
            <h3>${p.name}</h3>
            <p>Price : ₹${p.price}</p>
            <p>${p.features}</p>
            </div>
        `;
    });
}

/* ---------- Add to cart system ---------- */
let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


/* ---------- chart logic ---------- */
window.addToCart = function (name, price) {

    cart.push({ name, price });
    renderCart();
}

/* ---------- render chart ---------- */
function renderCart() {
    localStorage.setItem( "cart", JSON.stringify(cart) );
    cartBox.innerHTML = "";
    let total = 0;
    cart.forEach((item, i) => {
        total += Number(item.price);
        cartBox.innerHTML += `
            <div class="card">
                ${item.name} - ₹${item.price}
                <button onclick="removeItem(${i})"> Remove </button>
            </div>
        `;
    });
    generateBill(total);
}

/* ---------- Remove Item ---------- */
window.removeItem = function (index) {
    cart.splice(index, 1);
    renderCart();
}


/* ---------- Generate Bill ---------- */
function generateBill(total) {
    billBox.innerHTML = `
        <div class="card">
            <h3>Total Amount : ₹${total}</h3>
            <button onclick="checkout(${total})"> Generate Bill </button>
        </div>
    `;
}

/* ---------- Checkout ---------- */
window.checkout = async function (total) {
    const orderItems = [...cart];
    await addDoc(
        collection(db, "orders"),
        {
            userId: auth.currentUser.uid,
            items: orderItems,
            amount: total,
            date: new Date().toLocaleString()
        });
    generateInvoice(orderItems, total);
    cart = [];
    renderCart();
    alert("Order Placed ");
}

/* ---------- PDF Invoice Generator ---------- */
window.generateInvoice = function (items, total) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(26, 115, 232); 
    doc.text("SuperMall Invoice", 20, 20);

    // Date
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text("Date: " + new Date().toLocaleString(), 20, 30);

    // Draw a line
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Table headers
    let startY = 45;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text("Product", 20, startY);
    doc.text("Price (Rs)", 150, startY);

    startY += 5;
    doc.setLineWidth(0.3);
    doc.line(20, startY, 190, startY);

    // Table content
    startY += 10;
    items.forEach(item => {
        doc.text(item.name, 20, startY);
        doc.text(item.price.toString(), 150, startY);
        startY += 10;
    });

    // Draw total
    startY += 5;
    doc.setLineWidth(0.5);
    doc.line(20, startY, 190, startY);
    startY += 10;
    doc.setFontSize(14);
    doc.setTextColor(26, 115, 232);
    doc.text("Total: Rs" + total, 20, startY);

    // Footer
    startY += 15;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for shopping at SuperMall!", 20, startY);

    // Save PDF
    doc.save("SuperMall_Invoice.pdf");
};