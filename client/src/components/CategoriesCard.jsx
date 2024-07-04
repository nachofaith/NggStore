export default function CategoriesCard(props) {
  const title = props.title;
  const img = props.img;
  return (
    <section
      className="basis-1/4 bg-center bg-no-repeat bg-gray-700 bg-blend-multiply rounded-lg"
      style={{ backgroundImage: `url(/src/assets/${img})` }}
    >
      <a href="">
        <div className="px-4 text-center py-10 lg:py-56 ">
          <h1 className="hover:drop-shadow-md mb-4 text-4xl font-normal tracking-tight leading-none text-white md:text-5xl lg:text-6xl ">
            {title}
          </h1>
        </div>
      </a>
    </section>
  );
}
