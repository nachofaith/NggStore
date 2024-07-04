import Section from "./components/Section.jsx";
import Hero from "./components/Hero.jsx";
import Categories from "./components/Categories.jsx";

export default function App() {
  return (
    <div>
      <Hero />
      <Categories />
      <Section texto="Recién llegados" tipo="news" />
      <Section texto="Ultimas ofertas" tipo="off" />
    </div>
  );
}
