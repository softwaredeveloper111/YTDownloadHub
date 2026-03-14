import youtubedl from "yt-dlp-exec";


export const getVideoMetadata = async (url) => {
  const data = await youtubedl(url, {
    dumpSingleJson: true,
    noWarnings: true,
    noCallHome: true,
  });

  const videoFormats = new Map();

  const audioCandidates = [];

  data.formats.forEach((f) => {

    // VIDEO FORMATS
    if (f.ext === "mp4" && f.vcodec !== "none" && f.height) {
      const resolution = `${f.height}p`;

      if (!videoFormats.has(resolution)) {
        videoFormats.set(resolution, {
          formatId: f.format_id,
          resolution,
          ext: f.ext,
          filesize: f.filesize || null,
        });
      }
    }

    // AUDIO FORMATS
    if (f.vcodec === "none" && f.acodec !== "none" && f.ext === "m4a") {
      audioCandidates.push({
        formatId: f.format_id,
        ext: f.ext,
        abr: Math.round(f.abr) || 0,
        filesize: f.filesize || null,
      });
    }

  });

  // pick best audio
  const bestAudio = audioCandidates.sort((a, b) => b.abr - a.abr)[0];

  return {
    title: data.title,
    thumbnail: data.thumbnail,
    duration: data.duration,
    channel: data.uploader,
    viewCount: data.view_count,

    videoFormats: Array.from(videoFormats.values()).sort(
      (a, b) => parseInt(a.resolution) - parseInt(b.resolution)
    ),

    audioFormats: bestAudio ? [bestAudio] : [],
  };
};