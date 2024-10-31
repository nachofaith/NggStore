import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "./lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/useOutsideClick";

export const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"></div>
          <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
              <div
                key={index}
                className="transition hover:scale-105 duration-300 ease-in-out"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.2 * index,
                      ease: "easeOut",
                      once: true,
                    },
                  }}
                  key={"card" + index}
                  className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
                >
                  {item}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        {/* Botones de control: moverlos a la izquierda y derecha */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-40">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-blue-500 hover:bg-blue-700 flex items-center justify-center disabled:hover:bg-blue-500 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-8 w-8 text-white" />
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-40">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-blue-500 hover:bg-blue-700 disabled:hover:bg-blue-500 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-8 w-8 text-white" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, layout = false }) => {
  const containerRef = useRef(null);

  useOutsideClick(containerRef, () => handleClose());

  return (
    <>
      <a href="/categories">
        <motion.button
          layoutId={layout ? `card-${card.title}` : undefined}
          className=" items-center justify-center align-middle rounded-3xl dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col relative z-10"
        >
          {/* Gradient overlay */}
          <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />

          {/* Text content with pointer-events-none */}
          <div className="relative z-40 p-8 pointer-events-none">
            <motion.p
              layoutId={layout ? `category-${card.category}` : undefined}
              className="text-white text-sm md:text-base font-medium pb-4"
            >
              <span className="bg-green-600 text-white text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                {card.category}
              </span>
            </motion.p>
            <motion.p layoutId={layout ? `title-${card.title}` : undefined}>
              <span className="text-white text-center md:text-4xl font-semibold max-w-xs [text-wrap:balance]">
                {card.title}
              </span>
            </motion.p>
            <motion.p
              layoutId={layout ? `title-${card.desc}` : undefined}
              className="  md:text-3xl font-normal max-w-xs [text-wrap:balance]  mt-2"
            >
              <span className="text-md font-normal text-gray-200">
                {card.desc}
              </span>
            </motion.p>
          </div>

          {/* Blur image with hover effect */}
          <BlurImage
            src={card.src}
            alt={card.title}
            className="object-cover absolute z-10 inset-0 "
          />
        </motion.button>
      </a>
    </>
  );
};

export const BlurImage = ({ height, width, src, className, alt, ...rest }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "transition duration-300",
        "object-cover",
        "relative",
        "h-full",
        "mix-blend-multiply",
        "",
        "hover:blur-lg",

        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurdataurl={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
