import youtubedl from "yt-dlp-exec";



export const getVideoMetadata = async (url) => {
  const data = await youtubedl(url, {
    dumpSingleJson: true,
    noWarnings: true,
    noCallHome: true,
  });

  const videoFormats = new Map();
  const audioFormats = new Map();

  data.formats.forEach((f) => {

    // VIDEO FORMATS (UNCHANGED)
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

    // AUDIO FORMATS (UPDATED)
    if (f.vcodec === "none" && f.acodec !== "none" && f.abr) {

      const bitrate = Math.round(f.abr);

      // avoid duplicate bitrate
      if (!audioFormats.has(bitrate)) {
        audioFormats.set(bitrate, {
          formatId: f.format_id,
          ext: f.ext,
          abr: bitrate,
          filesize: f.filesize || null,
        });
      }
    }

  });

  return {
    title: data.title,
    thumbnail: data.thumbnail,
    duration: data.duration,
    channel: data.uploader,
    viewCount: data.view_count,

    videoFormats: Array.from(videoFormats.values()).sort(
      (a, b) => parseInt(a.resolution) - parseInt(b.resolution)
    ),

    audioFormats: Array.from(audioFormats.values()).sort(
      (a, b) => b.abr - a.abr
    ),
  };
};