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
  const fiveMillionUnits = dollars / 5_000_000;
  const targetUSD = Math.ceil(fiveMillionUnits) * 5_000_000;
  const qualificationGoal = 14_000_000;
  const competitiveGoal = 30_000_000;

  const goalPercentage = (dollars / targetUSD) * 100;
  const qualificationPercentage = (qualificationGoal / targetUSD) * 100;
  const competitivePercentage = (competitiveGoal / targetUSD) * 100;

  document.getElementById("bar").style.width = `${goalPercentage}%`;

  document.getElementById("raisedUsd").textContent = numberWithCommas(parseInt(dollars).toFixed(0));
  document.getElementById("targetUsd").textContent =
    numberWithCommas(targetUSD);

  document.getElementById("raisedEth").textContent = numberWithCommas(eth);

  document.getElementById("targetEth").textContent = numberWithCommas(
    (targetUSD / parseInt(ethUsdConversion)).toFixed(3)
  );

  document.getElementById("percent").textContent = `${goalPercentage.toFixed(0)}%`;

  console.log(qualificationPercentage, competitivePercentage);
  document.getElementById("qualificationGoal").style.left = `${qualificationPercentage.toFixed(0)}%`;
  document.getElementById("qualificationGoal").style.display = "block";
  document.getElementById("competitiveGoal").style.left = `${competitivePercentage.toFixed(0)}%`;
  document.getElementById("competitiveGoal").style.display = "block";
})();
