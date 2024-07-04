import CategoriesCard from "./CategoriesCard";

export default function Categories() {
  return (
    <section className="container mx-auto flex flex-row gap-2 mt-24">
      <CategoriesCard title="Mouse" img="mouse2.webp" />
      <CategoriesCard title="Teclados" img="teclado.jpg" />
      <CategoriesCard title="Audífonos" img="fonos.jpg" />
      <CategoriesCard title="Gabinetes" img="gabo.webp" />
  
    </section>
  );
}
