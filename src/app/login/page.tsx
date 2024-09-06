import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from 'react-icons/fc';


export default function Login() {
    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <h1 className="my-5 text-2xl tracking-wider font-bold">KOICASTER</h1>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Log in to your account</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        variant="outline"
                        size="lg"
                        className="flex items-center flex-grow gap-2"
                    >
                        <FcGoogle size={24} />
                        Login with Google
                    </Button>
                    {/* <Button>Deploy</Button> */}
                </CardFooter>
            </Card>
        </div>
    )
}
