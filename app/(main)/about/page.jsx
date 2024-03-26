import MemberCard from "@/components/about/MemberCard"
import Image from "next/image"




const Home = () => {
  return (
    <>
        <section class="hero">
            <div class="landing p-36 w-4/6 flex items-start gap-32 m-auto">
                
                <div class="landing__text-holder w-3/5">
                <h1 class="heading__primary text-6xl text-gray-100 uppercase font-bold">
                    About us
                </h1>
                <p class="landing__text text-gray-100 pt-4 font-normal text-2xl">
                    Legal Bot is a cutting-edge digital assistant that leverages 
                    artificial intelligence to provide quick and accurate legal 
                    information, guidance, and document generation, 
                    simplifying complex legal processes and empowering 
                    users to make informed decisions within the realm of law.
                    information, guidance, and document generation, 
                    simplifying complex legal processes and empowering 
                    users to make informed decisions within the realm of law.
                    information, guidance, and document generation, 
                    simplifying complex legal processes and empowering 
                    users to make informed decisions within the realm of law.
                </p>
                
                </div>
                <div class="landing__image-holder">
                    <Image 
                    class="landing__image--2 h-full w-full" 
                    src="/assets/images/hero-image.jpg" alt="hero" 
                    width={300} height={300}/>
                </div>
            </div>
            </section>


            <section class="help mt-0 mb-0 py-20 bg-gray-100">
            <h1
                class="heading__primary text-5xl uppercase font-bold text-gray-700 mb-8 no-underline text-center">
                Meet the team
            </h1>

            <div class="card-container flex gap-16 justify-center w-4/5 m-auto">
                <MemberCard name={"Abdulrehman"} imgUrl={"/assets/images/team.png"} position={""} />
                <MemberCard name={"Ahmed Hamid"} imgUrl={"/assets/images/team.png"} position={""} />
                <MemberCard name={"Awais"} imgUrl={"/assets/images/team.png"} position={""} />
            </div>
        </section>
    </>
  )
}

export default Home