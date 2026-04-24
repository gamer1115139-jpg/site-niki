function renderProperties(list) {
  const container = document.getElementById("properties");
  if (!container) return;

  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.title}</h3>
        <p>${p.city} · ${p.rooms} خواب · $${p.price}M</p>

        <a href="property.html?id=${p.id}">
          <button>جزئیات</button>
        </a>

        <button onclick="callNow()">تماس</button>
      </div>
    `;
  });
}

function callNow() {
  window.location.href = "tel:+989111480159";
}

function getProperty() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  return properties.find(p => p.id == id);
}

function loadPropertyPage() {
  const p = getProperty();
  if (!p) return;

  document.getElementById("title").innerText = p.title;
  document.getElementById("desc").innerText = p.desc;
  document.getElementById("mainImg").src = p.img;
  document.getElementById("video").src = p.video;

  // پیشنهاد ساده (AI fake)
  const suggestions = properties.filter(x => x.price === p.price && x.id != p.id);
  const box = document.getElementById("suggestions");

  suggestions.forEach(s => {
    box.innerHTML += `<div>${s.title}</div>`;
  });
}

function submitRequest() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  const requests = JSON.parse(localStorage.getItem("requests") || "[]");

  requests.push({ name, phone });

  localStorage.setItem("requests", JSON.stringify(requests));

  alert("درخواست ثبت شد");
}
async function fetchProperties() {
  const res = await fetch("http://localhost:3000/api/properties");
  const data = await res.json();
  renderProperties(data);
}

fetchProperties();

function toggleTheme() {
  document.body.classList.toggle("dark");
}