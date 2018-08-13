const mockResponse = (status, response, timeout) => {
  const res = new Response(response, {
    status,
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (timeout === true) {
    jest.useFakeTimers();
    jest.runAllTimers();
    return res;
  }
  return res;
};

export default mockResponse;
