import Hero from "./components/Hero.jsx";
import Categories from "./components/Categories.jsx";
import Section from "./components/Section.jsx";

export default function Home() {


  return(
    <>
      <Hero />
      <Categories />
      <Section texto="Recién llegados" tipo="news" />
      <Section texto="Ultimas ofertas" tipo="off" />
    </>
  )
 
}


