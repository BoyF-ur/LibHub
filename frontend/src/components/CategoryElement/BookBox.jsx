
const BookBox = ({title, description, imgUrl}) => {
    return (
        <div className="box md:w-[calc(50%-55.5px)] lg:w-[calc(33.3%-53.3px)] vlg:w-[calc(25%-42.5px)] flex flex-col vlg:h-[371px] lg:h-[300px] md:h-[239px]" >
            <img src={imgUrl} alt={title} className="basis-3/4 rounded-[30px]"/>
            <div className="basis-1/4 bg-white flex flex-col p-5 rounded-[30px]">
                <p className="text-black text-css vsm:text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] vlg:text-[16px]">{title}</p>
                <span className="text-white-1 text-css vsm:text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] vlg:text-[16px]">{description}</span>
            </div>
        </div>
    );
};

export default BookBox;