export default function VideoBackground(): JSX.Element {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source
          src="https://res.cloudinary.com/dubr40tiq/video/upload/v1725840091/plants.mp4"
          type="video/mp4"
        />
        Tu navegador no soporta la etiqueta de video.
      </video>
    );
  }
  