async function fetchData() {
  const rawResponse = await fetch("https://api.constitutiondao.com/raised");
  const content = await rawResponse.json();

  return content;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const milestoneMillions = [14_000_000, 30_000_000];

(async function () {
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

  for (var i = 0; i < milestoneMillions.length; i++) {
    console.log(targetUSD);
    console.log(milestoneMillions[i]);
    const percentage = milestoneMillions[i] / targetUSD;

    const marker = document.createElement("div");
    marker.className = "milestone";
    marker.style.left = percentage * 100 + "%";

    const label = document.createElement("div");
    label.className = "milestone-label";
    label.style.left = percentage * 100 + "%";
    label.innerText = "Milestone " + (i + 1);

    document.getElementById("progress").appendChild(marker);
    document.getElementById("progress").appendChild(label);
  }
})();
