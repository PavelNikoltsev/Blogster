import { Query, QueryCondition } from "../query-builder/index.js";

export async function removeExpiredLogs() {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  await new Query("logs")
    .delete()
    .where("date", date, QueryCondition.LESS)
    .run();
  console.log("Expired logs deleted");
}
