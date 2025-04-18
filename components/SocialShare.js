export default function SocialShare() {
  return (
    <div className="social-share">
      <a
        href={`https://facebook.com/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}`}
      >
        Share on Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          document.title
        )}`}
      >
        Share on Twitter
      </a>
    </div>
  );
}
