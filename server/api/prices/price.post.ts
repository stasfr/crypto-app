export default defineEventHandler(async (event) => {
  const params = await readBody(event);

  const apiUrl: string = "https://api.binance.com/api/v3/klines";

  const response = await fetch(`${apiUrl}?${new URLSearchParams(params)}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return {
    response,
  };
});
