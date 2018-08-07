const mockResponse = (status, response) => new Response(response, {
  status,
  headers: {
    'Content-type': 'application/json',
  },
});

export default mockResponse;
