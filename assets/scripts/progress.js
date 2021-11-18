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
  const fiveMillionUnits = dollars / 5_000_000
  const targetUSD = Math.ceil(fiveMillionUnits) * 5_000_000

  const percentage = ((dollars) / targetUSD) * 100;

  let remaining = dollars;
  let amountRaised = 0;
  const barContainer = document.getElementById('barC');
  for (let i = 0; i < barContainer.children.length; i++) {
    const child = barContainer.children[i];

    const childTarget = child.getAttribute("req") || `${999999999}`;
    const target = parseInt(childTarget.replace(/_/g, ""), 10) - amountRaised;
    const value = Math.min(remaining, target);
    const width = ((value) / targetUSD) * 100;
    child.style.width = `${width}%`;

    amountRaised += target;
    remaining = Math.max(remaining - target, 0);
  }

  document.getElementById("raisedUsd").textContent = numberWithCommas(parseInt(dollars).toFixed(0));
  document.getElementById("targetUsd").textContent =
    numberWithCommas(targetUSD);

  document.getElementById("raisedEth").textContent = numberWithCommas(eth);

  document.getElementById("targetEth").textContent = numberWithCommas(
    (targetUSD / parseInt(ethUsdConversion)).toFixed(3)
  );

  document.getElementById("percent").textContent = `${percentage.toFixed(0)}%`
})();
