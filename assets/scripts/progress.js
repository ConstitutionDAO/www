async function fetchData() {
  const rawResponse = await fetch("https://api.constitutiondao.com/raised");
  const content = await rawResponse.json();

  return content;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateClock() {
  const now = new Date();
  endDate = new Date(Date.UTC(2021, 10, 18, 21, 30, 0, 0));

  let diff = endDate - now;

  let ms = diff % 1000;
  diff = (diff - ms) / 1000;
  let s = diff % 60;
  diff = (diff - s) / 60;
  let m = diff % 60;
  diff = (diff - m) / 60;
  let h = diff;

  let ss = s <= 9 ? `0${s}` : s;
  let mm = m <= 9 ? `0${m}` : m;
  let hh = h <= 9 ? `0${h}` : h;

  document.getElementById("timeLeft").textContent =
    endDate > now ? `${hh}:${mm}:${ss} time left` : "";
}

(async function () {
  setInterval(updateClock, 1000);

  const { dollars, eth, ethUsdConversion } = await fetchData();
  const fiveMillionUnits = dollars / 5_000_000;
  const targetUSD = Math.ceil(fiveMillionUnits) * 5_000_000;

  const percentage = (dollars / targetUSD) * 100;

  document.getElementById("bar").style.width = `${percentage}%`;

  document.getElementById("raisedUsd").textContent = numberWithCommas(
    parseInt(dollars).toFixed(0)
  );
  document.getElementById("targetUsd").textContent =
    numberWithCommas(targetUSD);

  document.getElementById("raisedEth").textContent = numberWithCommas(eth);

  document.getElementById("targetEth").textContent = numberWithCommas(
    (targetUSD / parseInt(ethUsdConversion)).toFixed(3)
  );

  document.getElementById("percent").textContent = `${percentage.toFixed(0)}%`;
})();
