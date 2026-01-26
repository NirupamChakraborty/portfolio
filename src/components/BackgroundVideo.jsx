export default function BackgroundVideo() {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Video */}
        <video
          className="w-full h-full object-cover"
          src="/bg-video.mov"
          autoPlay
          loop
          muted
          playsInline
        />
  
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
      </div>
    );
  }
  