import { Products } from "./Card";

export default function Section(props) {
  const text = props.texto;
  const tipo = props.tipo;

  return (
    <div className="container mx-auto p-10 text-center">
      <h1 className="text-gray-800 text-6xl p-8">{text}</h1>
      <div className="inline-grid grid-cols-4 gap-4">
        <Products tipo={tipo} />
        <Products tipo={tipo} />
        <Products tipo={tipo} />
        <Products tipo={tipo} />
      </div>
    </div>
  );
}
