export const serverUrl = "https://rag-production-2b1c.up.railway.app";
export const baseUrl =
  process.env.NODE_ENV == "production"
    ? "https://suiai.vercel.app"
    : "http://localhost:3000";
