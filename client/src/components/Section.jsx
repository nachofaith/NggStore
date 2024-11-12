import { Products } from "./Card";
import Title from "./Title";

export default function Section({ data, text, tipo, limit }) {
  // Si `limit` está definido, limita los datos; de lo contrario, muestra todos
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="container mx-auto my-20">
      {tipo === "cat" ? null : <Title text={text} align="center" />}

      <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {limitedData.map((item) => {
          return (
            <Products
              key={item.id}
              id={item.id}
              tipo={tipo}
              nombreProd={item.name}
              precioProd={item.price}
              precioProdOff={item.priceOff}
              frontImage={item.cover?.url || "/path/to/default-image.jpg"} // Usa la URL del cover o una imagen por defecto
              stockProd={item.stock}
            />
          );
        })}
      </div>
    </div>
  );
}
