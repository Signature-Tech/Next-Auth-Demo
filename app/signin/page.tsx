import { auth } from "@/auth";
import Form from "./Login_Form";
import { redirect } from "next/navigation";

export default async function CardWithForm() {

    const session = await auth()

    if (session) {
        return redirect("/")
    }

    return (
        <Form />
    )
}
