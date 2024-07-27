"use client";

import { Button, Typography } from "@mui/material";
import { useEffect } from "react";

const LessonPage = ({ params }: { params: { topicId: string } }) => {
  // useEffect(() => {
  //   const enterFullscreen = () => {
  //     const element = document.documentElement; // The whole document
  //     if (element.requestFullscreen) {
  //       element.requestFullscreen();
  //     }
  //   };

  //   // Call this function to enter fullscreen when your page loads
  //   enterFullscreen();

  //   // Optionally, you can listen for changes in fullscreen state
  //   document.addEventListener("fullscreenchange", () => {
  //     if (document.fullscreenElement) {
  //       console.log("We are in fullscreen mode!");
  //     } else {
  //       console.log("We are not in fullscreen mode.");
  //     }
  //   });
  // }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div
        style={{ minWidth: "75%", borderRadius: 5 }}
        className="bg-slate-300 p-5 my-5 min-h-[80vh] flex flex-col justify-between"
      >
        <Button
          id="fullscreen-button"
          onClick={() => {
            const docElm = document.documentElement;
            if (docElm.requestFullscreen) {
              docElm.requestFullscreen();
            } else {
              console.error("Fullscreen API is not supported in this browser.");
            }
          }}
        >
          Go Fullscreen!
        </Button>
        <Typography>LESSON HERE</Typography>
      </div>
    </main>
  );
};

export default LessonPage;
