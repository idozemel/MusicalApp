export const configWithToken = (token) => ({
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${JSON.parse(token)}`,
  },
});
