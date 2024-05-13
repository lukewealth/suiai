// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "@/lib/db/mongo";
import { NextApiHandler, NextApiRequest } from "next";

async function init(req: Request) {
  const body = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("SuiAI");
    const convos = await db
      .collection("conversations")
      .find({ customData: { user: body?.user } })
      .toArray();

    return Response.json(convos, { status: 200 });
  } catch (error) {
    console.error("getConvos Error:", error);

    return Response.json(
      { message: "An error occured while fetching convos" },
      { status: 500 }
    );
  }
}

export { init as POST };
