"use client";
import Navbar from "@/components/navbar";
import { Spinner } from "@/components/spinner";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading, user } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      redirect("/login");
    }
  }, [loading, user]);
  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner size={"large"} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
