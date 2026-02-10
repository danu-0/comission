import ScrollAnimation from "../../utils/scrollAnimation"

function About(){
    return(
        <div id="about" className="flex flex-col h-auto px-10 py-10 bg-white w-full gap-3">
         <ScrollAnimation>
         <p className="montserrat-regular">[About Me]</p>
         <h1 className="montserrat-medium text-3xl reveal-type leading-snug" data-bg-color='#B6BBC4' data-fg-color='#151515'>{`Hello everyone, I'm SniperKun, a freelance illustrator, I'm from Indonesia. A self-taught artist, I like drawing Original Fan Art, Anime, and Game Characters, and I also make Character designs.`}</h1>
         <p className="montserrat-regular mt-5">[Term Service]</p>
         <h1 className="montserrat-medium text-3xl reveal-type leading-snug" data-bg-color='#B6BBC4' data-fg-color='#151515'>As a reminder I accept several types of commission orders such as</h1>
         <div className="flex flex-col gap-3 md:flex-row md:gap-16">
         <div className="flex flex-col leading-6 montserrat-regular">
            <h1 className="montserrat-bold text-lg">Do ⭕</h1>
            <ul className="list-disc pl-5 mt-3  space-y-2 text-lg text-gray-800">
            <li>Male /Famale</li>
            <li>Solo Character Male Or Famale</li>
            <li>NSFW</li>
            <li>SFW</li>
            </ul>
         </div>
         <div className="flex flex-col leading-6">
            <h1 className="montserrat-bold text-lg">Do not ❌</h1>
            <ul className="list-disc pl-5 mt-5  space-y-2 text-lg text-gray-800 ">
            <li>Furry /Animal</li>
            <li>Armor /Mecha</li>
            <li>Gore</li>
            <li>Extreme Fetish</li>
            </ul>
         </div>
         </div>

         <p className="montserrat-regular mt-5">[Order Type]</p>
         <h1 className="montserrat-medium text-3xl reveal-type leading-snug" data-bg-color='#B6BBC4' data-fg-color='#151515'>There are several order types available, and the prices for each are as follows:
         </h1>
         <ul className="list-disc pl-5  space-y-2 text-lg text-gray-800 montserrat-regular">
    <li>(PREMIUM) Full Body, drawing your character from head to toe</li>
    <li>(STANDARD) Half Body or Waist Up, drawing your character from Head to Waist (adjusting the viewing angle)</li>
    <li>(BASIC) Bust Up, drawing the character you from the chest up (adjust the viewing angle)</li>
  </ul>
         </ScrollAnimation>
        </div>
    )
}
export default About