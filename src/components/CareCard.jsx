const CareCard = ({ image, imageName, heading, paragraph, tailwindStayle, imageStyle }) => {
    return (
      <div className={` w-full ${tailwindStayle}`}>
        <figure>
        <p>{image}</p>
        </figure>
        <div className="card-body">
          <h2 className="text-2xl font-bold">{heading}</h2>
          <p>{paragraph}</p>
        </div>
      </div>
    );
  };
  
  export default CareCard;