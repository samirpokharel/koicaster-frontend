import React from "react";

import PastStreamComponent from "./_components/past_stream";
import CreateStream from "./_components/create_stream";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/presentation/components/ui/card";

const StreamingDashboard = () => {
  return (
    <div className="p-5">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Stream</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-start">
            <CreateStream />
          </CardContent>
        </Card>
        <PastStreamComponent />
      </div>
    </div>
  );
};

export default StreamingDashboard;
