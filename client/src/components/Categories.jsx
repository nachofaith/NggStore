import CategoriesCard from "./CategoriesCard";

export default function Categories() {
  return (
    <section className="container mx-auto flex  gap-2 mt-24 sm:flex-col lg:flex-row md:flex-col ">
      <CategoriesCard title="Mouse" img="mouse2.webp" url="/category/17"  />
      <CategoriesCard title="Teclados" img="teclado.jpg" url="/category/14"  />
      <CategoriesCard title="Audífonos" img="fonos.jpg" url="/category/16"  />
      <CategoriesCard title="Gabinetes" img="gabo.webp" url="/category/18" />
    </section>
  );
}
