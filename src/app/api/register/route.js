import { dbConnect, dbDisconnect} from "@/lib/db/mongoDB";
import {UserModel} from '@/lib/models/user'
import bcrypt from 'bcrypt';


export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const req_data = await  req.json();
    const client = await dbConnect();

    const data = {
      email:req_data.email, password:await bcrypt.hash(req_data.password, 10)
    }


    const already_exist = await UserModel.findOne({email:data.email})
    
        // Check if the email already exists in the database
       if(already_exist){
        return Response.json({ success:false, message:'User already exist' });
       }
  
    //Check if any required field is missing
       const requiredFields = [
           "password",
           "email",
         
         ];
        for (const field of requiredFields) {
          if (!data[field]) {
            return Response.json({success:false,  message: `${field} is required` });
          }
        }
    
    
        // Insert the new user into the database
         (await UserModel.create(data)).save()
     

    await dbDisconnect()
    return Response.json({ success:true, message:'User saved' });
  } catch (error) {
    console.error(error.message);
    await dbDisconnect()
    return Response.json({ success:false, message: "An error occurred" }, { status: 500 });
  }
}
// export async function POST(req, res) {
//   try {
//     // const client = await clientPromise;
//     // const db = client.db(process.env.DATABASE);

//     // // Check if the email already exists in the database
//     // const existingUser = await db
//     //   .collection("users")
//     //   .findOne({ email: req.body.email });

 
//     // if (existingUser) {
//     //   // If the name exists
//     //   return res
//     //     .status(200)
//     //     .json({ message: "User already exist" });
//     // }

//     // // Check if any required field is missing
//     // const requiredFields = [
//     //   "password",
//     //   "email",
     
//     // ];
//     // for (const field of requiredFields) {
//     //   if (!req.body[field]) {
//     //     return res.status(400).json({ error: `${field} is required` });
//     //   }
//     // }

//     // // If the user does not exist by email or name, create a new user object with the provided data
//     // const newUser = {
//     //   password: req.body.password,
//     //   email: req.body.email,
//     // };

//     // // Insert the new user into the database
//     // await db.collection("users").insertOne(newUser);

//     // res
//     //   .status(200)
//     //   .json({ message: "User registered or updated successfully" });
//   } catch (error) {
//     console.error("API Error:", error);
//     // res
//     //   .status(500)
//     //   .json({ error: "An error occurred while processing the request" });
//   }
// }

// export const config = {
//   api: {
//     externalResolver: true,
//   },
// };