import { NextResponse } from "next/server";
import Form from "./Register_Form"
import { auth } from "@/auth";

export default async function CardWithForm() {

    const session = await auth()

    if (session) {
        return NextResponse.redirect("/")
    }

    return (
        <Form />
    )
}
