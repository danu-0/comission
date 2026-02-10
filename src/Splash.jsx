
const Splash = () => {
  return (
    <div className="splash-screen h-screen flex flex-col bg-custom-secondary justify-center items-center">
       <div className='min-h-60 w-96 items-center text-center rounded-md sm:h-72 h-72 py-5 text-gray-200'  >
       <img src="./assets/Makima.gif" alt="loading" className='drop-shadow-custom-red' />
       <h1 className="montserrat-bold text-lg drop-shadow-custom-light">SNIPER COMISSION</h1>
       </div>
       
    </div>
  );
};

export default Splash;
