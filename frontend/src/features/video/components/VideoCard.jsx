import { useState } from "react";
import useVideo from "../hooks/useVideo";


const formatBytes = (bytes) => {
  if (!bytes) return "-";
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
};

const formatDuration = (seconds = 0) => {
  const total = Number(seconds);
  if (!total || Number.isNaN(total)) return "0:00";

  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  const padded = (num) => String(num).padStart(2, "0");

  if (hrs > 0) return `${hrs}:${padded(mins)}:${padded(secs)}`;
  return `${mins}:${padded(secs)}`;
};


export default function VideoCard({ video }) {
  const [tab, setTab] = useState("audio");
  const { videoUrl,  downloadVideoHandler} =  useVideo()


  if (!video) return null;



  const formats = tab === "audio"
    ? video.audioFormats || []
    : video.videoFormats || [];

  const buildDownloadUrl = (formatId) => {
    // console.log( videoUrl , formatId , tab);
    downloadVideoHandler(videoUrl, formatId, tab )
  };

  return (
    <div className="glass rounded-3xl p-6 flex flex-col md:flex-row gap-8 mt-10">
      
      <div className="flex flex-col gap-4 md:w-2/5">
        <img
          className="w-full h-56 md:h-64 rounded-xl object-cover border border-white/10 shadow-lg"
          src={video.thumbnail}
          alt={video.title}
        />

        <div>
          <h2 className="text-lg md:text-xl font-semibold">{video.title}</h2>
          <p className="text-sm text-gray-300 mt-1">
            {video.channel} • {video.viewCount?.toLocaleString()} views • Duration: {formatDuration(video.duration)}
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white/10 border border-white/10 rounded-2xl">

        <div className="flex items-center gap-2 border-b border-white/10 p-4">
          <button
            onClick={() => setTab("audio")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${
              tab === "audio"
                ? "bg-white/15 text-white"
                : "text-gray-200 hover:bg-white/10"
            }`}
          >
            🎵 Audio
          </button>

          <button
            onClick={() => setTab("video")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${
              tab === "video"
                ? "bg-white/15 text-white"
                : "text-gray-200 hover:bg-white/10"
            }`}
          >
            🎥 Video
          </button>
        </div>

        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              
              <thead>
                <tr className="text-xs uppercase text-gray-400">
                  <th className="py-2 px-3">File type</th>
                  <th className="py-2 px-3">Format</th>
                  <th className="py-2 px-3">Size</th>
                  <th className="py-2 px-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {formats.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 px-3 text-center text-gray-300">
                      No {tab} formats available.
                    </td>
                  </tr>
                ) : (
                  formats.map((format) => {

                    const fileTypeLabel =
                      tab === "audio"
                        ? `${"mp3"} - ${format.abr}kbps`
                        : `${format.resolution} (${format.ext?.toUpperCase()})`;

                    return (
                      <tr key={format.formatId} className="border-t border-white/10">
                        
                        <td className="py-3 px-3 text-white/90">
                          {fileTypeLabel}
                        </td>

                        <td className="py-3 px-3 text-white/80">
                          Auto
                        </td>

                        <td className="py-3 px-3 text-white/80">
                          {formatBytes(format.filesize)}
                        </td>

                        <td className="py-3 px-3">
                          <button
                            onClick={() => buildDownloadUrl(format.formatId)}
                            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-sm"
                          >
                            ⬇️ Download
                          </button>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}