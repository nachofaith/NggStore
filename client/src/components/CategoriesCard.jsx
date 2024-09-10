export default function CategoriesCard(props) {
  const title = props.title;
  const img = props.img;
  return (
    <section
      className="hover:bg-blend-overlay hover:shadow-lg hover:shadow-blue-500/50 text-6xl  basis-1/4  bg-center bg-no-repeat bg-gray-700 bg-blend-multiply rounded-lg "
      style={{ backgroundImage: `url(/src/assets/${img})` }}
    >
      <a href="">
        <div className="px-4 text-center py-10 lg:py-56 opacity-0 hover:opacity-100">
          <h1 className="hover:drop-shadow-md blur-none mb-4 font-normal tracking-tight leading-none text-white hover:blur-none hover:filter-none">
            {title}
          </h1>
        </div>
      </a>
    </section>
  );
}
