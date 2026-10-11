import { cacheLife } from "next/cache";

export default async function TodayDate() {
  "use cache";
  cacheLife("hours");
  return <>{new Date().toLocaleDateString("bn-BD", { dateStyle: "full" })}</>;
}