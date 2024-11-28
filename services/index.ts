import { OramaClient } from "@oramacloud/client";

const api_key = process.env.NEXT_PUBLIC_ORAMA_PUBLIC_API_KEY as string;
const endpoint = process.env.NEXT_PUBLIC_ORAMA_ENDPOINT as string;

export const oramaClient = new OramaClient({
  endpoint,
  api_key,
  cache: true,
});
