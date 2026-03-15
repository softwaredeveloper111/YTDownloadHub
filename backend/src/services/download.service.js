import youtubedl from "yt-dlp-exec";
import ffmpeg from "fluent-ffmpeg";

export const downloadVideo = async (url, formatId, type, res) => {
  try {
    
    let format;

    if (type === "audio") {
      format = formatId || "bestaudio";
    } else {
      format = `${formatId}+bestaudio`;
    }

    const metadata = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
    });

    const safeTitle = metadata.title
      .replace(/[<>:"/\\|?*]+/g, "")
      .replace(/\s+/g, "_");

    const stream = youtubedl.exec(url, {
      format: format,
      output: "-",
    });

    // AUDIO → convert to MP3
    if (type === "audio") {
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${safeTitle}.mp3"`,
      );

      ffmpeg(stream.stdout)
        .audioBitrate(192) // or dynamic if you want
        .format("mp3")
        .on("error", (err) => {
          console.error("FFmpeg error:", err);
          res.end();
        })
        .pipe(res, { end: true });
    }

    // VIDEO → keep original behavior
    else {
      res.setHeader("Content-Type", "video/mp4");

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${safeTitle}.mp4"`,
      );

      stream.stdout.pipe(res);
    }

    stream.stderr.on("data", (data) => {
      console.error("yt-dlp error:", data.toString());
    });

    stream.on("error", (err) => {
      console.error(err);
      res.end();
    });
  } catch (error) {
    console.error("Download error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Video download failed",
      });
    }
  }
};
