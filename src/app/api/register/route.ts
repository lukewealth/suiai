import clientPromise from "@/lib/db/mongo";
import { UserModel } from "@/lib/models/user";
import bcrypt from "bcrypt";

// export async function POST(req) {
//   try {
//     const req_data = await req.json();
//     const client = await dbConnect();

//     const data = {
//       email: req_data.email,
//       password: await bcrypt.hash(req_data.password, 10),
//     };

//     const already_exist = await UserModel.findOne({ email: data.email });

//     // Check if the email already exists in the database
//     if (already_exist) {
//       return Response.json({ success: false, message: "User already exist" });
//     }

//     //Check if any required field is missing
//     const requiredFields = ["password", "email"];
//     for (const field of requiredFields) {
//       if (!data[field]) {
//         return Response.json({
//           success: false,
//           message: `${field} is required`,
//         });
//       }
//     }

//     // Insert the new user into the database
//     (await UserModel.create(data)).save();

//     await dbDisconnect();
//     return Response.json({ success: true, message: "User saved" });
//   } catch (error) {
//     console.error(error.message);
//     await dbDisconnect();
//     return Response.json(
//       { success: false, message: "An error occurred" },
//       { status: 500 }
//     );
//   }
// }
async function create(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("SuiAI");

    // Check if the email already exists in the database
    const existingUser = await db
      .collection("users")
      .findOne({ email: body?.email });

    if (existingUser) {
      // If the name exists
      return Response.json({ message: "User already exist" }, { status: 400 });
    }

    // Check if any required field is missing
    const requiredFields = ["password", "email"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return Response.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // If the user does not exist by email or name, create a new user object with the provided data
    const newUser = {
      password: await bcrypt.hash(body.password, 10),
      email: body.email,
    };

    // Insert the new user into the database
    await db.collection("users").insertOne(newUser);

    return Response.json(
      { message: "User registered or updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}

export { create as POST };
