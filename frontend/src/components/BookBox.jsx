const BookBox = ({title, description, imgUrl}) => {
    return (
        <div className="box sm:w-[calc(50%-30px)] md:w-[calc(33.3%-26.6px)] lg:w-[calc(25%-52.5px)] flex flex-col">
            <img src={imgUrl} alt={title} className="basis-3/4"/>
            <div className="basis-1/4 bg-white flex flex-col p-5">
                <p className="text-black text-css vsm:text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] vlg:text-[16px]">{title}</p>
                <span className="text-white-1 text-css vsm:text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] vlg:text-[16px]">{description}</span>
            </div>
        </div>
    );
};

export default BookBox;