"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Spinner } from "../../components/spinner";
export default function MarketingPage() {
  const { loading, user } = useAuth();
  useEffect(() => {
    console.log("User", user);
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
