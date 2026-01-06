interface SpotifyEmbedProps {
  src: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function SpotifyEmbed({
  src,
  className = "",
  width = "100%",
  height = 152,
}: SpotifyEmbedProps) {
  // Ensure the URL is an embed URL
  const embedSrc = src.replace("open.spotify.com", "open.spotify.com/embed");

  return (
    <div className={`my-8 w-full ${className}`}>
      <iframe
        style={{ borderRadius: "12px" }}
        src={embedSrc}
        width={width}
        height={height}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}
