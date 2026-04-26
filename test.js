fetch('http://localhost:5005/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ history: [{ role: 'user', content: 'hi' }] })
})
.then(r => r.text())
.then(data => console.log('Response:', data.substring(0, 500)))
.catch(e => console.error('Fetch Error:', e));
