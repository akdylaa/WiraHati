async function test() {
  const res = await fetch('https://wirahati-api-909415694718.us-central1.run.app/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'I feel sad' })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

test();
