async function pushToWeb3Api(payload) {
  const rawResponse = await fetch("https://node1.web3api.com/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const content = await rawResponse.json();

  return content;
}

// I reversed engineered Etherscan's web3 API to get this to work. It's undocumented, and I have no idea if it will be stable if hit with a few hundred thousand uniques. The other API I looked at was The Graph, but they charge per request which didn't make sense to me because we're just reading from the contract.
// Optimal implementation is probably just a server w/ a cache that pulls from a paid API (The Graph or Etherscan's commercial API)
async function getBalanceOfJuiceboxProject(projectId) {
  const juiceboxContract = "0xd569d3cce55b71a8a3f3c418c329a66e5f714431";

  const payload = {
    id: 3,
    jsonrpc: "2.0",
    method: "eth_call",
    // I didn't know the ABI spec before this (and still only have a cursory understanding), here's a breakdown of this request:
    // data: first 4 bytes of the Keccak hash of the ASCII form of the method signature (I know, it's a lot), followed by the method args padded to 32 bytes.
    // from: address the call is coming from. it can be 0 because we're reading from the contract
    // to: the contract
    params: [
      {
        data: `0x9cc7f708${projectId.toString(16).padStart(64, "0")}`,
        from: "0x0000000000000000000000000000000000000000",
        to: juiceboxContract,
      },
      "latest",
    ],
  };

  const response = await pushToWeb3Api(payload);
  const wei = parseInt(response.result, 16);

  // wei to ETH
  return wei / 1000000000000000000;
}

(async function () {
  const targetEth = 1000;
  const raisedEth = await getBalanceOfJuiceboxProject(1);

  const percentage = (raisedEth / targetEth) * 100;

  // TODO: pull from actual progress and update text.
  document.getElementById("bar").style.width = `${percentage}%`;

  document.getElementById("amount").textContent = `${raisedEth.toFixed(
    3
  )} ETH / ${targetEth} ETH (${percentage.toFixed(0)}%)`;
})();
