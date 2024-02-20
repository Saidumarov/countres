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
const api_one =
  "https://countries-restapi.vercel.app/all?sort=title&order=desc";
const api = "https://countries-restapi.vercel.app/all";

const fetchData = async (api) => {
  try {
    const result = await fetch(api);
    const data = await result.json();
    fetchCard(data?.data);
    fetchBtn(data?.data);
    Region(data?.data);
    Search(data?.data);
    Sort(data?.data);
  } catch (error) {
    console.log(error);
  }
};
fetchData(api);

function fetchCard(data) {
  let ui = "";
  data?.slice(0, 16).map((el) => {
    ui += `
       <div class="card" onclick="window.location.href='./pages/detailes.html?common=${
         el.name?.common
       }'">

          <div class="card_img">
            <img src="${el?.flags?.png}" alt="${el.name?.commo}" />
          </div>
          <div class="card_item">
            <h3>${el.name?.common}</h3>
            <p>Population: <span>${el?.population}</span></p> 
            <p>Region: <span>${el?.region}</span></p> 
            <p>Capital: <span>${!el.capital ? "" : el?.capital}</span></p> 
          </div>
        </div>`;
  });
  countres.innerHTML = ui;
}

let btns = document.querySelector(".btns");

const fetchBtn = (data) => {
  let ui = "";
  data.slice(0, 12)?.forEach((el, index) => {
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

// region

let region1 = document.querySelector(".region1");

function Region(data) {
  region1.addEventListener("change", (e) => {
    let value = e.target.value;

    let countryData = data?.filter((el) => {
      return value === "all" ? el : el?.region == value;
    });
    fetchCard(countryData);
  });
}

// Sort

let sort = document.querySelector(".region");

function Sort(data) {
  sort.addEventListener("change", (e) => {
    let value = e.target.value;

    if (value === "population") {
      data.sort((a, b) => b?.population - a?.population);
    }
    if (value === "all") {
      fetchData("https://countries-restapi.vercel.app/all");
    }
    if (value === "region") {
      data.sort((a, b) => {
        let regionA = a.region.toLowerCase();
        let regionB = b.region.toLowerCase();
        if (regionA < regionB) {
          return -1;
        }
      });
    }
    if (value === "capital") {
      data.sort((a, b) => {
        let capitalA =
          Array.isArray(a.capital) && a.capital.length > 0
            ? a.capital[0].toLowerCase()
            : "";
        let capitalB =
          Array.isArray(b.capital) && b.capital.length > 0
            ? b.capital[0].toLowerCase()
            : "";
        if (capitalA < capitalB) {
          return -1;
        }
      });
    }
    if (value === "title") {
      data.sort((a, b) => {
        let regionA = a.name?.common?.toLowerCase();
        let regionB = b.name?.common?.toLowerCase();
        if (regionA < regionB) {
          return -1;
        }
      });
    }

    fetchCard(data);
  });
}

// Search

let search = document.getElementById("search");
function Search(data) {
  search.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase(e);
    let searchData = data?.filter((el) => {
      return (
        el?.region?.toLowerCase().includes(value) ||
        el?.name?.common?.toLowerCase().includes(value)
      );
    });
    fetchCard(searchData);
  });
}
