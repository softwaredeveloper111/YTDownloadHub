import youtubedl from "yt-dlp-exec";
import ffmpeg from "fluent-ffmpeg";



export const downloadVideo = async (url, formatId, type, res) => {

  let format;

  if (type === "audio") {
    format = formatId || "bestaudio";
  } else {
    format = `${formatId}+bestaudio`;
  }

  const stream = youtubedl.exec(url, {
    format: format,
    output: "-",
  });

  // AUDIO → convert to MP3
  if (type === "audio") {

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="audio.mp3"`
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
      `attachment; filename="video.mp4"`
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

};