const url: string = "https://api.binance.com/api/v3/klines";

interface RequestParams {
  symbol: string | null;
  interval: string | null;
  startTime: string | null;
  endTime: string | null;
}

export default () => {
  const getPrices = async (requestParams: RequestParams) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = $fetch(url, {
          method: "GET",
          params: {
            symbol: requestParams.symbol,
            interval: requestParams.interval,
            startTime: requestParams.startTime,
            endTime: requestParams.endTime,
          },
        });

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return { getPrices };
};
