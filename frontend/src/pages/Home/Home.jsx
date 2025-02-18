// import React from "react";

const Home = () =>{
    return(
        <>
            <header className="font-KumbhSans">
                <nav className="flex justify-between items-center relative py-1 font-bold drop-shadow-sm
                bg-slate-50 h-[70px]">
                    <div className="basis-1/6 lg:basis-2/6 lg:mx-auto">  
                        <a href="#" className="inline-flex items-center justify-center w-auto h-auto relative">    
                            <img className="w-36 lg:h-auto" src="public/img/Lib-hub.svg" alt="Logo-lib-hub"/>
                        </a>
                    </div>  
                    <ul id="ct-top-menu" className="basis-3/6 hidden lg:flex lg:justify-center lg:items-center lg:gap-12" >
                        <li>
                            <a className="ct-top-menu-item " href="#">Home</a>
                        </li>
                        <li>
                            <a className="ct-top-menu-item" href="#">About Us</a>
                        </li>
                        <li>
                            <a className="ct-top-menu-item" href="#">Book</a>
                        </li>
                        <li>
                            <a className="ct-top-menu-item" href="#">Contact Us</a>
                        </li>
                        <li>
                            
                        </li>
                        <li>
                            <a className="" href="#">
                                <img className="basis-1/6 w-10 h-10 p-1 rounded-full ring-2 ring-pornhub-200 drop-shadow-md hover:ring-pornhub-300 duration-300 hover:shadow-black" src="public/img/default-avatar.png" alt="avatar-user" />
                            </a>
                        </li> 
                    </ul>
                    
                    <div className="basis-1/6 lg:hidden flex items-center cursor-pointer px-3 sm:px-8">
                    <svg id="ct-toggle-top-menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                    </div>

                </nav>
            </header> 

            <main>
                <div className="relative flex flex-col items-center text-black text-center px-4 h-screen">
                    <fieldset className="w-full max-w-3xl items-center my-52 mx-auto">  
                        <h1 className="text-3xl font-bold mb-8">What book are you looking for?</h1>
                        {/* Search-bar */}
                        <div className="input-field relative w-full">
                            <button className="icon-search absolute top-1/2 -translate-y-1/2 flex justify-center items-center h-full w-16 hover:text-pornhub-200 hover:transition-colors ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>        
                            </button>
                            <input type="text" placeholder="Tittle book, author, ISBN, ..." className="w-full h-[70px] p-8 pl-16 rounded-full text-black focus:outline-none bg-gray-200 " />


                        </div>
                    </fieldset>                    
                </div>                    
            </main> {/*End Body*/}

            <footer >
                Footer
            </footer> {/*End Footer*/}
        
        </>
    )
}

export default Home