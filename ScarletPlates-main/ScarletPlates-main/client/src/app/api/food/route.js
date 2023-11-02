
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET({request}) {
const data = await axios.get(`http://127.0.0.1:8080/api/plate?campus=${campus}`);
console.log(request)

try {
    return NextResponse.json(data.data)
} catch (error) {
    console.log(error)
}
}