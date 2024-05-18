import axios from "axios";

export async function handleRegister({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const body = { email, password };

    const res = await axios.post("/api/register", body);
    console.log(res);
    return res;
  } catch (error: any) {
    console.log(error.message);
    console.log(error.response.data.message);
    return error.response.data.message;
  }
}
