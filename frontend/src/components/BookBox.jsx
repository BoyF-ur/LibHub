const BookBox = ({title, description, imgUrl}) => {
    return (
        <div className="box flex flex-col">
            <img src={imgUrl} alt={title} className="basis-3/4"/>
            <div className="basis-1/4 bg-white flex flex-col p-5">
                <p className="text-black text-css">{title}</p>
                <span className="text-white-1 text-css">{description}</span>
            </div>
        </div>
    );
};

export default BookBox;