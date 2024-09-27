// import { serverSupabaseClient } from "#supabase/server";
// import type {
//   KlineObject,
//   RequestParams,
//   ChartConfig,
// } from "~/types/klines.ts";

export default defineEventHandler(async (event) => {
  // const client = await serverSupabaseClient(event);
  const params = await readBody(event);

  const apiUrl: string = "https://api.binance.com/api/v3/klines";

  let response;

  try {
    response = await fetch(`${apiUrl}?${new URLSearchParams(params)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(`${apiUrl}?${new URLSearchParams(params)}`);

        return data;
      });
  } catch (error) {
    console.error(`Error fetching data from ${apiUrl}:`, error);
    throw error;
  }

  // response.forEach(async (kline: (number | string)[]) => {
  //   const { data, error } = await client.from("BtcKlines").insert([]);
  // });

  return { response };
});
