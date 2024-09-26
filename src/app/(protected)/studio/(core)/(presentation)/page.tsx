import React from "react";
//
import StudioNavbar from "./components/studio-navbar";
import StudioSideBar from "./components/studio-sidebar";
import StreamingCanvas from "./components/streaming_canvas";
import ParticipantsRows from "./components/participants-row";
import ActionButton from "./components/action-button";

const LiveStreamStudio = () => {
  return (
    <div className="h-screen gap-10 ">
      <StudioNavbar />
      <div className="flex h-[92vh]">
        <div className="flex-1 flex flex-col">
          <StreamingCanvas />
          <ParticipantsRows />
          <ActionButton />
        </div>
        <StudioSideBar />
      </div>
    </div>
  );
};

export default LiveStreamStudio;
