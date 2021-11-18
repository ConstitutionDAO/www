async function fetchData() {
  const rawResponse = await fetch("https://api.constitutiondao.com/raised");
  const content = await rawResponse.json();

  return content;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const flags = [
  { title: 'Qualification goal', amount: 14_000_000},
  { title: 'Competitive goal', amount: 30_000_000},
];

(async function () {
  const { dollars, eth, ethUsdConversion } = await fetchData();
  const targetUSD = 69_420_000;

  const percentage = (dollars / targetUSD) * 100;

  document.getElementById("bar").style.width = `${percentage}%`;

  const bar_container = document.getElementById("progress");
  flags.push({ title: 'Stretch Goal', amount: targetUSD });
  bar_container.style.height = `calc(3rem + ${flags.length + 1} * (1rem + 8px))`;

  flags.forEach((bar, i) => {
    const el = document.createElement('div');

    const text = document.createElement('p');
    text.textContent = bar.title;
    text.className = 'flagText';
    el.appendChild(text);

    el.className = 'bar flag';
    el.style.width = `${(bar.amount / targetUSD) * 100}%`;
    el.style.height = `calc(3rem + ${i + 1} * (1rem + 8px))`;
    el.style.zIndex = i + 1;
    bar_container.appendChild(el);
  });

  document.getElementById("raisedUsd").textContent = numberWithCommas(parseInt(dollars).toFixed(0));
  document.getElementById("targetUsd").textContent =
    numberWithCommas(targetUSD);

  document.getElementById("raisedEth").textContent = numberWithCommas(eth);

  document.getElementById("targetEth").textContent = numberWithCommas(
    (targetUSD / parseInt(ethUsdConversion)).toFixed(3)
  );

  document.getElementById("percent").textContent = `${percentage.toFixed(0)}%`
})();
