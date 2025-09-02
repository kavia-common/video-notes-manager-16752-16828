import { Composition } from "remotion";
import { NotesVideo, notesVideoSchema } from "./video/NotesVideo";
// Ensure UI App gets bundled and mounted when running in the browser studio
import "./app/bootstrap";

/**
 * RemotionRoot:
 * Registers our NotesVideo composition which renders the user's notes
 * as animated slides. In Remotion Studio, you can tweak props via Controls.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NotesVideo"
        component={NotesVideo}
        durationInFrames={600} // default length, will be overridden by notes length dynamically
        fps={30}
        width={1920}
        height={1080}
        schema={notesVideoSchema}
        defaultProps={{
          title: "My Notes Presentation",
          notes: [
            { id: "1", title: "Welcome", content: "This is your notes video.", color: "#3b82f6" },
            { id: "2", title: "Second Slide", content: "Edit notes on the left to update video.", color: "#6366f1" },
            { id: "3", title: "Export", content: "Use Export button to render a video.", color: "#f59e42" },
          ],
          theme: {
            primary: "#3b82f6",
            secondary: "#6366f1",
            accent: "#f59e42",
            background: "#ffffff",
            text: "#0f172a"
          },
          secondsPerNote: 4
        }}
      />
    </>
  );
};
