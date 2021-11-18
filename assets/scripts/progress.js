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
  const fiveMillionUnits = Math.ceil(dollars / 5_000_000) + 3
  const targetUSD = fiveMillionUnits * 5_000_000

  const percentage = (dollars / targetUSD) * 100;

  document.getElementById("bar").style.width = `${percentage}%`;

  document.getElementById("raisedUsd").textContent = numberWithCommas(parseInt(dollars).toFixed(0));
  document.getElementById("targetUsd").textContent =
    numberWithCommas(targetUSD);

  document.getElementById("raisedEth").textContent = numberWithCommas(eth);

  document.getElementById("targetEth").textContent = numberWithCommas(
    (targetUSD / parseInt(ethUsdConversion)).toFixed(3)
  );

  document.getElementById("percent").textContent = `${percentage.toFixed(0)}%`

  const progressWrapper = document.getElementById("progressWrapper");

  const pointLen = fiveMillionUnits + 1;
  for (let i = 0; i < pointLen; i++) {
    let remainderRender = ((window.innerWidth / 100) < 5) ? 2 : 1;
    if (i % remainderRender === 0 && (i >= pointLen - 6 && i < pointLen - 1)) {
      let pointDiv = document.createElement("div");
      let pointLine = pointDiv.appendChild(document.createElement("div"));
      let pointLabel = pointDiv.appendChild(document.createElement("p"));

      let point = progressWrapper.appendChild(pointDiv);
      point.style.position = "absolute";
      point.style.top = 0;
      point.style.left = `${i * 10}%`;

      pointLine.style.position = "relative";
      point.style.width = "5px";
      point.style.height = "15px";
      point.style.borderRadius = '0 0 2px 2px';
      point.style.backgroundColor = 'white';

      pointLabel.style.position = "absolute";
      const pointUSD = i * 5;
      pointLabel.style.top = "2px";
      pointLabel.style.left = "calc(-0.5vw - 20px)";
      pointLabel.style.padding = "4px 8px";
      pointLabel.style.borderRadius = "100px";
      pointLabel.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
      pointLabel.style.fontWeight = "bold";
      pointLabel.textContent = `$${pointUSD}M`;
    }
  }
})();
