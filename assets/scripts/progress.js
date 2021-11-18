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
  const targetUSD = 69_420_000;
  const milestones = [
    [14_000_000, "Qualification Goal", true],
    [30_000_000, "Competitive Goal", false],
    [69_420_000, "nice.", true],
  ];

  milestones.forEach(([value, text, hide]) => {
    const milestone = document.createElement("div");
    milestone.innerHTML = `
    <div class="tooltip ${hide ? "hide" : ""}">
      <div>$${numberWithCommas(value)}</div>
      <div class="label">${text}</div>
    </div>
    `;
    milestone.className = "milestone";
    milestone.style.left = `${(value / targetUSD) * 100}%`;
    document.getElementById("bar").appendChild(milestone);
  });

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
