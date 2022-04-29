const Img = ({ src, className }) => {
  return (
    <figure className={"aniimg " + className}>
      <img src={src} className="img mx-auto block w-full" />
    </figure>
  );
};

export default Img;
