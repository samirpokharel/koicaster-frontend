import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import PastStreamComponent from "./_components/past_stream";
import CreateStream from "./_components/create_stream";

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
