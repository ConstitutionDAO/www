async function fetchData() {
  const rawResponse = await fetch("https://api.constitutiondao.com/raised");
  const content = await rawResponse.json();

  return content;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

(async function () {
  const raised = await fetchData()

  document.getElementById("usd").textContent = `$${numberWithCommas(raised.dollars)}`;
  document.getElementById("eth").textContent = `${raised.eth}`;
})();
