"use client";
import { useAuth } from "@/app/(auth)/application/use-auth";
import Navbar from "@/core/presentation/components/nav-bar";
import { Spinner } from "@/core/presentation/components/spinner";
import { redirect } from "next/navigation";
import { Fragment, useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { loading, user } = useAuth();

  useEffect(() => {
    if (!loading && !user) redirect("/login");
  }, [loading, user]);

  if (loading) return <FullScreenLoader />;

  return (
    <Fragment>
      <Navbar />
      {children}
    </Fragment>
  );
}

const FullScreenLoader: React.FC = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Spinner size={"large"} />
    </div>
  );
};
