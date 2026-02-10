function Footer (){
    return(
        <div id="footer" className="flex justify-start flex-col w-full h-auto bg-custom-secondary text-gray-200 px-10 py-10 mt-10 text-sm">
            <div>
                <h1 className="text-3xl font-semibold mb-2 montserrat-bold">SNIPER KUN</h1>
            </div>
            <div className="flex justify-evenly mt">
            <div className="flex flex-col leading-8">
                <h2 className="font-bold text-lg mb-2 montserrat-bold">Social Media</h2>
                    <a className="montserrat-regular" href="https://www.facebook.com/share/otLoN2wJZB3o7ipL/?mibextid=qi2Omg" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a className="montserrat-regular" href="https://www.instagram.com/sniper_kun/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a className="montserrat-regular" href="https://wa.me/6282340017349" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
            <div className="flex flex-col leading-8">
                 <h2 className="font-bold text-lg mb-2 montserrat-bold">Business Contact</h2>
                    <a className="montserrat-regular" href="https://github.com/danu-0" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a className="montserrat-regular" href="mailto:danuhaeridaputra07@gmail.com">Email</a>
                    <a className="montserrat-regular" href="https://www.linkedin.com/in/danu-putra" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
                <div className="flex flex-col leading-8">
                    <h2 className="font-bold text-lg mb-2 montserrat-bold">Order Type</h2>
                    <a className="montserrat-regular" href="#">Premium Full Body</a>
                    <a className="montserrat-regular" href="#">Standard Waist Up</a>
                    <a className="montserrat-regular" href="#">Basic Hal Bust Up</a>
                </div>
            </div>
            <hr className="border-t border-gray-600 my-5" />
            <p className="text-center ">© 2024 Sniper Kun Comission. All rights reserved.</p>
        </div>
    )
}
export default Footer