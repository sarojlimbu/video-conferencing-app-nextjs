"use client";

import React, { useEffect, useState } from "react";
import {
  VideoPreview,
  useCall,
  DeviceSettings,
} from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const call = useCall();

  if (!call)
    throw new Error("usecall must be used within streamcall component");

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone?.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);
  return (
    <div className="flex h-screen w-full flex-col justify-center items-center gap-3 text-white">
      <h1 className="text-2xl font-bold"> Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center gpa-3 justify-center">
        <label className="flex justify-center items-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
        className="rounded-md bg-green-500 py-2.5 px-4"
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
