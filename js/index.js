const them = document.querySelector(".clors");
let colorsSvg = document.getElementById("colorsSvg");
let colorsText = document.getElementById("colorsText");

them.addEventListener("click", () => {
  const elRoot = document.documentElement;
  let dataTheme = elRoot.getAttribute("data-theme");

  if (dataTheme === "light") {
    elRoot.setAttribute("data-theme", "dark");

    document.querySelector(".light").classList.toggle("active");
    colorsText.innerHTML = `Light Modess`;
    document.querySelector(".dark").classList.toggle("active");
  } else {
    elRoot.setAttribute("data-theme", "light");
    colorsText.innerHTML = `Dark Modess`;
    document.querySelector(".dark").classList.toggle("active");
    document.querySelector(".light").classList.toggle("active");
  }
});

let countres = document.querySelector(".countres");

// maping
const api = "https://countries-restapi.vercel.app/all?sort=title&order=desc";
const fetchData = async (api) => {
  try {
    const result = await fetch(api);
    const data = await result.json();
    fetchCard(data);
    fetchBtn(data);
  } catch (error) {
    console.log(error);
  }
};
fetchData(api);

function fetchCard(data) {
  let ui = "";
  data?.data?.slice(0, 12).map((el) => {
    ui += `
       <div class="card" onclick="window.location.href='./pages/detailes.html?common=${el.name?.common}'">

          <div class="card_img">
            <img src="${el?.flags?.png}" alt="${el.name?.commo}" />
          </div>
          <div class="card_item">
            <h3>${el.name?.common}</h3>
            <p>Population: <span>${el.population}</span></p> 
            <p>Region: <span>${el.region}</span></p> 
            <p>Capital: <span>${el.capital}</span></p> 
          </div>
        </div>`;
  });
  countres.innerHTML = ui;
}

let btns = document.querySelector(".btns");

const fetchBtn = (data) => {
  let ui = "";
  data.data?.slice(0, 12)?.forEach((el, index) => {
    ui += `<button class="btn">${index + 1}</button>`;
  });
  btns.innerHTML = ui;
  let btn = document.querySelectorAll(".btn");
  btn.forEach((element) => {
    element.addEventListener("click", function () {
      btn.forEach((item) => {
        item.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
};
