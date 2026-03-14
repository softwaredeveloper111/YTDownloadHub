import youtubedl from "yt-dlp-exec";




export const downloadVideo = async (url, formatId, type, res) => {

  let format;

if (type === "audio") {
  format = "bestaudio";
} else {
  format = `${formatId}+bestaudio`;
}

      const stream = youtubedl.exec(url, {
      format: format,
      output: "-",
    });

    res.setHeader("Content-Type", "application/octet-stream");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="video.${type === "audio" ? "m4a" : "mp4"}`
    );

    stream.stdout.pipe(res);

    stream.stderr.on("data", (data) => {
    console.error("yt-dlp error:", data.toString());
  });

    stream.on("error", (err) => {
    console.error(err);
    res.end();
  });
    

  };