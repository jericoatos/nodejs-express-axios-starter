fetch('https://your-api-url.com/job-roles/123', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_VALID_TOKEN'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));