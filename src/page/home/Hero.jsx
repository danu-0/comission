import Section1 from "../../component/section1"
import bg from "../../assets/background.png"

function Hero() {

  return (
    <div id="home" className='flex justify-center h-auto w-full sm:h-[calc(100vh-20px)]  text-black font-semibold bg-cover'  style={{ backgroundImage: `url(${bg})` }}>
      < Section1 />
    </div>
  )
}

export default Hero
