
async function submit(url = '', data = {}) {
  const response = await fetch('https://blockchain.info/latestblock', {
    method: 'GET'
  });
  debugger
  return response.text();
}

export default submit;