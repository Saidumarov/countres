const detailes_item = document.querySelector(".detailes_item");
let loading_product = document.getElementById("loading_product");
const common = new URLSearchParams(window.location.search).get("common");
console.log(common);
const api = "https://countries-restapi.vercel.app/all";
const fetchData = async (api) => {
  try {
    const result = await fetch(api);
    const data = await result.json();
    displayData(data?.data);
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      loading_product.style.opacity = "0";
    }, 500);
    setTimeout(() => {
      loading_product.style.display = "none";
    }, 700);
  }
};
fetchData(api);

function displayData(data) {
  console.log(data);
  let ui = "";
  data?.forEach((el) => {
    if (el.name?.common == common) {
      let til = el?.languages;
      let obj = Object.values(til);
      let arry = el.currencies;
      const currencyValues = Object?.values(arry);
      ui += `
      <div class="d_img">
          <img src="${el?.flags?.png}" alt="${el?.name?.commo}" />
          </div>
          <div class="dec">
            <h2> ${el?.name?.common}</h2>
            <div class="left">
              <div>
                <p>Native Name: ${el?.name?.common}</p>
                <p>Population: ${el?.population}</p>
                <p>Region: ${el?.region}</p>
                <p>Sub Region:${el?.subregion}</p>
                <p>Capital: ${el?.capital}</p>
              </div>
              <div>
                <p>Top Level Domain: ${el?.ccn3}</p>
                <p>Currencies: ${currencyValues?.map((el) => el?.name)}</p>
                  <p>Languages: ${obj?.map((el) => el)} </p>
              </div>
            </div>
            <div class="right">
              <p>Border Countries:</p>
              ${
                !el?.borders
                  ? ""
                  : el?.borders
                      ?.map(
                        (el) =>
                          ` <button onclick="btnCountry('${el}')">${el}</button>`
                      )
                      .join("")
              }
            </div>
          </div>
     `;
    }
  });
  detailes_item.innerHTML = ui;
}

async function btnCountry(id) {
  try {
    const result = await fetch(api);
    const data = await result.json();
    data?.data?.forEach((el) => {
      if (el?.cca3 == id) {
        window.location.href = `../pages/detailes.html?common=${el.name?.common}`;
        return displayData([el]);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
