fetch('https://jd5pri3k2r.eu-west-1.awsapprunner.com/job-roles', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_VALID_TOKEN'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));