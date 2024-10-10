export default function Title(props) {
  return (
    <h1
      className={`pb-8 text-gray-700 uppercase font-oswald text-4xl font-semibold text-${props.align}`}
    >
      {props.text}
    </h1>
  );
}
