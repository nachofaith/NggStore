export default function Title(props) {
  return (
    <h1 className="pb-8 sm:text-center">
      <span className={`uppercase font-anton text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 text-6xl text-${props.align}`}>
        {props.text}
      </span>
    </h1>
  );
}
