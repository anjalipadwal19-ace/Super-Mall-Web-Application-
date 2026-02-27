import { auth, db, collection, addDoc, getDocs, deleteDoc, doc } 
from "./firebase.js";
import { signOut, onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location = "login.html";
    }
});

/* ---------- Logout ---------- */
window.logout = function () {
    signOut(auth)
        .then(() => window.location = "login.html");
}

/* ---------- Add Shop ---------- */
const form = document.getElementById("shopForm");
if (form) {
    form.addEventListener("submit",
        async (e) => {
            e.preventDefault();
            const shop = {
                name: shopName.value,
                category: category.value,
                floor: floor.value,
                offer: offer.value
            };
            await addDoc(collection(db, "shops"), shop);
            alert("Shop Added");
            form.reset();
            loadShops();
        });
}

/* ---------- Load Shops ---------- */
async function loadShops() {
    const adminShopList = document.getElementById("adminShopList");
    const snapshot = await getDocs(collection(db, "shops"));
    adminShopList.innerHTML = "";
    snapshot.forEach((docu) => {
        const data = docu.data();
        adminShopList.innerHTML += `
<div class="shop-card">
<h3>${data.name}</h3>
<p>Category: ${data.category}</p>
<p>Floor: ${data.floor}</p>
<p>Offer: ${data.offer}</p>
<button onclick="deleteShop('${docu.id}')">
Delete
</button>
</div>
`;
    });
}
loadShops();

/* ---------- loadShopDropdown ---------- */
async function loadShopDropdown() {
    const snapshot = await getDocs(collection(db, "shops"));
    const dropdown = document.getElementById("pShopId");
    dropdown.innerHTML = "";
    snapshot.forEach(doc => {
        const shop = doc.data();
        dropdown.innerHTML += `
<option value="${doc.id}">
${shop.name}
</option>
`;
    });

}
loadShopDropdown();

/* ---------- Delete ---------- */
window.deleteShop = async function (id) {
        await deleteDoc(doc(db, "shops", id));
        loadShops();
    }

/* ---------- Add product function ---------- */
window.addProduct = async function () {
    const shopId = document.getElementById("pShopId").value;
    const product = {
        name: productName.value,
        price: price.value,
        features: features.value,
        offer: productOffer.value
    };
    if (!shopId) {
        alert("Enter Shop ID");
        return;
    }
    await addDoc( collection(db, "shops", shopId, "products"), product );
    alert("Product Added");
}

/* ---------- Load Analytics ---------- */
async function loadAnalytics() {
    const snapshot = await getDocs(collection(db, "orders"));
    let totalSales = 0;
    let orders = 0;
    snapshot.forEach(doc => {
        orders++;
        totalSales += doc.data().amount;
    });
    document.getElementById("analytics").innerHTML = `
<div class="shop-card">
<h3>Total Orders : ${orders}</h3>
<h3>Total Revenue : ₹${totalSales}</h3>
<canvas id="salesChart"></canvas>
</div>
`;
    drawChart(totalSales, orders);
}
loadAnalytics();

/* ---------- chart dashboard ---------- */
let chart;
function drawChart(sales, orders) {
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(
        document.getElementById("salesChart"),
        {
            type: "bar",
            data: {
                labels: ["Orders", "Revenue"],
                datasets: [{
                    label: "Mall Analytics",
                    data: [orders, sales]
                }]
            }
        });
}
