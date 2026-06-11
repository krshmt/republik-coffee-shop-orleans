"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Copy from "@/components/Copy/Copy";
import ImageBanner from "@/components/ImageBanner/ImageBanner";
import Marquee from "@/components/Marquee/Marquee";
import StickyCards from "@/components/StickyCards/StickyCards";
import Chefs from "@/components/Chefs/Chefs";

import "./about.css";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BREAKPOINT = 1000;

export default function About() {
  const heroSectionRef = useRef(null);

  /* fade in the hero image on mount */
  useEffect(() => {
    const heroImage = heroSectionRef.current?.querySelector(
      ".hero-image-reveal",
    );
    if (!heroImage) return;

    gsap.fromTo(
      heroImage,
      { autoAlpha: 0, scale: 0.75, y: 50 },
      {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 1,
        delay: 1.25,
        ease: "power3.out",
      },
    );
  }, []);

  /* scroll-driven parallax for hero header and image */
  useEffect(() => {
    let ctx;

    const buildScrollAnimation = () => {
      if (ctx) ctx.revert();

      const section = heroSectionRef.current;
      if (!section) return;

      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const headingLines = [
        ".hero-heading .heading-line-1",
        ".hero-heading .heading-line-2",
        ".hero-heading .heading-line-3",
      ];
      const headerOffsetY = isMobile ? "200vh" : "175vh";
      const headerOffsetX = isMobile ? -130 : -220;
      const imageOffsetY = isMobile ? 140 : 180;

      ctx = gsap.context(() => {
        const heroParallaxTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${Math.max(section.offsetHeight - window.innerHeight, window.innerHeight)}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        heroParallaxTimeline
          .to(
            [".hero-heading .heading-line-1", ".hero-heading .heading-line-3"],
            {
              scale: 2,
              y: headerOffsetY,
              xPercent: headerOffsetX,
              duration: 1,
              ease: "none",
            },
            "scroll",
          )
          .to(
            ".hero-heading .heading-line-2",
            {
              scale: 2,
              y: headerOffsetY,
              xPercent: -headerOffsetX,
              duration: 1,
              ease: "none",
            },
            "scroll",
          )
          .to(
            headingLines,
            {
              autoAlpha: 0,
              duration: 0.2,
              ease: "none",
            },
            0.72,
          )
          .to(
            ".hero-image",
            {
              scaleY: 2.5,
              yPercent: imageOffsetY,
              duration: 1,
              ease: "none",
            },
            "scroll",
          )
          .to(
            ".hero-image img",
            {
              scaleX: 2.5,
              duration: 1,
              ease: "none",
            },
            "scroll",
          );
      }, section);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    let wasMobile = window.innerWidth < MOBILE_BREAKPOINT;
    buildScrollAnimation();

    const handleResize = () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      if (isMobile !== wasMobile) {
        wasMobile = isMobile;
        buildScrollAnimation();
      }
    };

    const handleTransitionComplete = () => buildScrollAnimation();

    window.addEventListener("resize", handleResize);
    window.addEventListener("viewTransitionComplete", handleTransitionComplete);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener(
        "viewTransitionComplete",
        handleTransitionComplete,
      );
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <>
      <section className="about-hero" ref={heroSectionRef}>
        <div className="about-hero-pin">
          <div className="hero-heading">
            <Copy animateOnScroll={false} delay={0.85}>
              <h1 className="heading-line-1">Histoire</h1>
              <h1 className="heading-line-2">de</h1>
              <h1 className="heading-line-3">Republik</h1>
            </Copy>
          </div>

          <div className="hero-image">
            <div className="hero-image-reveal">
              <img src="/about/about-hero.jpg" alt="About Salle Blanche" />
            </div>
          </div>
        </div>
      </section>

      <section className="about-info">
        <div className="container">
          <Copy>
            <h3>
              Chez Republik Coffee Shop, nous créons un cadre chaleureux où l’on vient aussi bien pour un café du matin que pour une pause gourmande au cours de la journée.
            </h3>
            <h3>
              Entre boissons préparées avec soin, pâtisseries maison et recettes généreuses, chaque visite est une invitation à prendre son temps et à profiter d’un moment de convivialité.
            </h3>
          </Copy>
        </div>
      </section>

      <ImageBanner image="/about/about-image-banner.jpg" />
      <Marquee />
      <StickyCards />
      <Chefs />
    </>
  );
}
