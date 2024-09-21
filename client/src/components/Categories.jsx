import { Carousel, Card } from "./AppleCards";

const data = [
  {
    category: "DESTACADOS",
    title: "MOUSE | MOUSEPAD",
    src: "/src/assets/mouse2.webp",
  },
  {
    category: "DESTACADOS",
    title: "TECLADOS",
    src: "/src/assets/teclado.jpg",
  },
  {
    category: "DESTACADOS",
    title: "AUDÍFONOS",
    src: "/src/assets/fonos.jpg",
  },

  {
    category: "DESTACADOS",
    title: "GABINETES",
    src: "https://kronosgaming.cl/wp-content/uploads/2023/10/Gabinete-Gamer-White-Ice-ATX-Vidrio-Templado-USB-3.0_7-600x600.png",
  },
];

const cards = data.map((card, index) => (
  <Card key={card.src} card={card} index={index} />
));

export default function Categories() {
  return (
    <section className="flex container mx-auto sm:container sm:mx-auto gap-2 my-20 sm:flex-col lg:flex-row md:flex-col">
      <Carousel items={cards} />
    </section>
  );
}
