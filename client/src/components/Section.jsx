import { Products } from "./Card";

export default function Section({ data, text, tipo, limit }) {
  // Si `limit` está definido, limita los datos, de lo contrario, muestra todos
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="container mx-auto pt-10">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-6xl py-8 text-center">
        {text}
      </h1>

      <div className="inline-grid grid-cols-4 gap-4">
        {limitedData.map((item) => {
          // Filtra las imágenes para obtener solo la que tiene front: 1
          const frontImage = item.images.find(img => img.front === 1)?.url_img || "";

          return (
            <Products
              key={item.id_prod}
              id={item.id_prod}
              tipo={tipo}
              nombreProd={item.nombre_prod}
              precioProd={item.precio_prod}
              precioProdOff={item.precio_off_prod}
              frontImage={frontImage} // Pasa la imagen filtrada al componente Products
            />
          );
        })}
      </div>
    </div>
  );
}
