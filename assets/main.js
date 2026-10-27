// Footer year
document.querySelectorAll("#year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Demo video: fall back to the animated caption preview while assets/demo.mp4 is missing
(function () {
  const frame = document.getElementById("demo");
  if (!frame) return;

  const video = frame.querySelector("video");
  const source = video && video.querySelector("source");
  if (!video || !source) return; // an <iframe> embed is used instead

  const showPlaceholder = () => {
    if (frame.classList.contains("no-video")) return;
    frame.classList.add("no-video");
    startCaptionDemo();
  };

  source.addEventListener("error", showPlaceholder);
  video.addEventListener("error", showPlaceholder);
  if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) showPlaceholder();
})();

function startCaptionDemo() {
  const lines = [
    "Captions that move with every word",
    "Generated right inside DaVinci Resolve",
    "Editable Text+ clips on your timeline",
  ];
  const caption = document.getElementById("demo-caption");
  const textTrack = document.getElementById("demo-text-track");
  const playhead = document.getElementById("demo-playhead");
  if (!caption) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wordMs = 380;
  let lineIndex = 0;

  // Fake caption clips on the text track
  const totalWords = lines.reduce((n, l) => n + l.split(" ").length, 0);
  let offset = 0;
  lines.forEach((line) => {
    const words = line.split(" ").length;
    const clip = document.createElement("div");
    clip.className = "demo-clip";
    clip.style.left = (offset / totalWords) * 100 + 1 + "%";
    clip.style.width = (words / totalWords) * 100 - 2 + "%";
    textTrack.appendChild(clip);
    offset += words;
  });

  let wordsBefore = 0;

  function playLine() {
    const words = lines[lineIndex].split(" ");
    caption.innerHTML = "";
    const spans = words.map((w) => {
      const s = document.createElement("span");
      s.textContent = w;
      caption.appendChild(s);
      return s;
    });

    if (reduceMotion) {
      spans.forEach((s) => s.classList.add("shown"));
      return;
    }

    words.forEach((_, i) => {
      setTimeout(() => {
        spans.forEach((s) => s.classList.remove("active"));
        spans[i].classList.add("shown", "active");
        const progress = (wordsBefore + i + 0.5) / totalWords;
        playhead.style.left = `calc(12px + ${progress} * (100% - 24px))`;
      }, i * wordMs);
    });

    setTimeout(() => {
      wordsBefore += words.length;
      lineIndex = (lineIndex + 1) % lines.length;
      if (lineIndex === 0) wordsBefore = 0;
      playLine();
    }, words.length * wordMs + 900);
  }

  playLine();
}
