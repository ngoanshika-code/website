// Fix specific campaign images
const campaignId = '68e4a196f592e4444bb341ce';

fetch('/api/fix-campaign', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ campaignId })
})
.then(response => response.json())
.then(data => {
  console.log('Fix result:', data);
})
.catch(error => {
  console.error('Error:', error);
});
