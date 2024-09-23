"use client";
import React from "react";
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
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import Image from "next/image";
import LogoDark from "@/public/Dark.svg";
import LogoLight from "@/public/light.svg";

export default function Login() {
  const { login, loading } = useAuth();

  return (
    <div className="flex min-h-screen bg-gradient-to-b flex-col justify-center items-center p-4">
      <Link className="mb-10" href={"/"}>
        <Image
          src={LogoDark}
          className="hidden dark:block"
          alt="Koicaster"
          height={50}
          width={200}
        />
        <Image
          src={LogoLight}
          className="block dark:hidden"
          alt="Koicaster"
          height={50}
          width={200}
        />
      </Link>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Log in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={login}
            disabled={loading}
            className="w-full py-6 text-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            {loading ? (
              <Spinner size={"small"} />
            ) : (
              <FcGoogle className="mr-2 h-5 w-5" />
            )}
            {loading ? "Logging in..." : "Login with Google"}
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center w-full">
            By logging in, you agree to our <br />
            Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
