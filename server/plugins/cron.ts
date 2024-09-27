import cron from "node-cron";

export default defineNitroPlugin((nitroApp) => {
  // Каждый час
  console.log("Запрос выполняется каждый час");

  // Каждый день в полночь
  cron.schedule("0 0 * * *", () => {
    console.log("Запрос выполняется каждый день");
  });
});
