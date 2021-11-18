async function fetchData() {
  const rawResponse = await fetch("https://api.constitutiondao.com/raised");
  const content = await rawResponse.json();

  return content;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

(async function () {
  const { dollars, eth, ethUsdConversion } = await fetchData();
  const distanceUSD = 5000000;  //Goal will always be out between (set value) and (set value + 1 million)
  const targetUSD = Math.floor((parseInt(dollars) + distanceUSD) / 1000000) * 1000000;

  const percentage = (parseInt(dollars) / targetUSD) * 100;

  document.getElementById("bar").style.width = `${percentage}%`;
  document.getElementById("Marker14").style.left = `${100 * (14000000 / targetUSD)}%`;
  document.getElementById("Marker30").style.left = `${100 * (30000000 / targetUSD)}%`;

  document.getElementById("raisedUsd").textContent = numberWithCommas(parseInt(dollars).toFixed(0));
  document.getElementById("targetUsd").textContent =
    numberWithCommas(targetUSD);

  document.getElementById("raisedEth").textContent = numberWithCommas(eth);

  document.getElementById("targetEth").textContent = numberWithCommas(
    (targetUSD / parseInt(ethUsdConversion)).toFixed(3)
  );

  document.getElementById("percent").textContent = `${percentage.toFixed(0)}%`
})();
