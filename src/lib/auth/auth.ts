import axios from "axios"

export async function handleRegister ({email, password}:{email:string, password:string}){
    
   try {
    const body = {email, password}

    const res =await axios.post('/api/register', body)
    console.log(res)
    return res
   } catch (error) {
    console.log(error.message)
   }
}