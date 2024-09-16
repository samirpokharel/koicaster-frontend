"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const { login } = useAuth();

  return (
    <div className="flex h-[90vh] dark:bg-[#141414] flex-col justify-center items-center">
      <h1 className="my-5 text-2xl tracking-wider font-bold">KOICASTER</h1>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Log in to your account</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={login}
            className="flex items-center flex-grow gap-2"
          >
            <FcGoogle size={24} />
            Login with Google
          </Button>
          {/* <Button>Deploy</Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
