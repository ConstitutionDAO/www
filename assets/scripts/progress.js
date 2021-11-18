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
  const targetUSD = 69420000

  const percentage = (dollars / targetUSD) * 100;

  document.getElementById("bar1").style.width = `${(14000000/targetUSD) * 100}%`
  document.getElementById("bar2").style.width = `${(30000000/targetUSD) * 100}%`
  document.getElementById("bar3").style.width = `${percentage}%`;

  document.getElementById("p-label1").style.left = `${(14000000/targetUSD) * 100}%`
  document.getElementById("p-label2").style.left = `${(30000000/targetUSD) * 100}%`
  document.getElementById("p-label3").style.left = `100%`;

  document.getElementById("raisedUsd").textContent = numberWithCommas(parseInt(dollars).toFixed(0));
  document.getElementById("targetUsd").textContent =
    numberWithCommas(targetUSD);

  document.getElementById("raisedEth").textContent = numberWithCommas(eth);

  document.getElementById("targetEth").textContent = numberWithCommas(
    (targetUSD / parseInt(ethUsdConversion)).toFixed(3)
  );

  
  document.getElementById("percent").textContent = `${percentage.toFixed(0)}% of stretch`
})();
