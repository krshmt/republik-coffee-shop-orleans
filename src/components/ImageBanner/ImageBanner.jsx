import Copy from "../Copy/Copy";

import "./ImageBanner.css";

const ImageBanner = ({
  image = "/image-banner/image-banner.jpg",
  heading = ["Prenez", "votre", "temps"],
  description = "Un lieu chaleureux pour savourer cafés, boissons maison et douceurs artisanales à tout moment de la journée.",
}) => {
  return (
    <section className="image-banner">
      <div className="image-banner-bg">
        <img src={image} alt="" />
      </div>

      <div className="container">
        <Copy type="lines" animateOnScroll>
          {heading.map((word, index) => (
            <h4 key={index}>{word}</h4>
          ))}
        </Copy>

        <div className="image-banner-footer">
          <Copy
            type="lines"
            trigger=".image-banner"
            start="top 50%"
            delay={0.5}
          >
            <p>{description}</p>
          </Copy>
        </div>
      </div>
    </section>
  );
};

export default ImageBanner;
