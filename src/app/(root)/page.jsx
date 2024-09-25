"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "../../core/presentation/components/spinner";
import { useAuth } from "../(auth)/application/use-auth";
export default function MarketingPage() {
  const { loading, user } = useAuth();
  useEffect(() => {
    if (user) {
      redirect("/dashboard");
    }
  }, [user]);

  return (
    <div className="h-full flex justify-center items-center">
      {loading && <Spinner size={"large"} />}
    </div>
  );
}
