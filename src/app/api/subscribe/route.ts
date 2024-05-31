import clientPromise from "@/lib/db/mongo";

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return Response.json(
        { message: "The email must be a valid email address." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("SuiAI");

    // Check if the email already exists in the database
    const existingSubscriber = await db
      .collection("subscribers")
      .findOne({ email });

    if (existingSubscriber) {
      return Response.json(
        { message: "Email already subscribed" },
        { status: 400 }
      );
    }

    // Insert the new email into the database
    await db.collection("subscribers").insertOne({ email });

    return Response.json({ message: "Subscription successful" });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { message: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
};
