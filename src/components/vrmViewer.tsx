import { useContext, useCallback, useEffect, useState } from "react";
import { ViewerContext } from "../features/vrmViewer/viewerContext";
import { buildUrl } from "@/utils/buildUrl";
import { Loader2Icon } from "lucide-react";

export default function VrmViewer(props: { url: string }) {
  const { viewer } = useContext(ViewerContext);
  const [loading, setLoading] = useState(true);

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.setup(canvas);
        viewer.loadVrm(buildUrl(props.url)).then(() => setLoading(false));

        // Drag and DropでVRMを差し替え
        canvas.addEventListener("dragover", function (event) {
          event.preventDefault();
        });

        canvas.addEventListener("drop", function (event) {
          event.preventDefault();

          const files = event.dataTransfer?.files;
          if (!files) {
            return;
          }

          const file = files[0];
          if (!file) {
            return;
          }

          const file_type = file.name.split(".").pop();
          if (file_type === "vrm") {
            setLoading(true);
            const blob = new Blob([file], { type: "application/octet-stream" });
            const url = window.URL.createObjectURL(blob);
            viewer.loadVrm(url).then(() => setLoading(false));
          }
        });
      }
    },
    [props.url, viewer]
  );

  useEffect(() => {
    return () => {
      viewer.dispose();
    };
  }, [viewer]);

  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader2Icon className="animate-spin text-amber-900 text-lg font-semibold " />
        </div>
      )}
      <canvas ref={canvasRef} className={"h-full w-full"}></canvas>
    </div>
  );
}
