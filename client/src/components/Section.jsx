import { Products } from "./Card";

export default function Section(props) {
  const text = props.texto;
  const tipo = props.tipo;

  return (
    <div className="container mx-auto pt-10">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-6xl py-8 text-center">{text}</h1>
      
      <div className="inline-grid grid-cols-4 gap-4">
        <Products tipo={tipo} />
        <Products tipo={tipo} />
        <Products tipo={tipo} />
        <Products tipo={tipo} />
      </div>
    </div>
  );
}
