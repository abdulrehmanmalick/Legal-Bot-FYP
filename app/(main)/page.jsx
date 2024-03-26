import Helpcard from "@/components/index/Helpcard";
import Problemscard from "@/components/index/Problemscard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section class="hero py-36">
        <div class="landing p-8 w-4/6 flex items-center gap-12 m-auto">
          <div class="landing__image-holder">
            <Image
              className="landing__image h-full w-full"
              src="/assets/images/hero-image.jpg"
              alt="hero"
              width={300}
              height={300}
            />
            {/* <img class="landing__image h-full" src="hero-image.jpg" alt="hero" /> */}
          </div>
          <div class="landing__text-holder">
            <h1 class="heading__primary text-6xl text-white uppercase font-bold">
              Getting a lawyer <br />
              has never been easier*.
            </h1>
            <p class="landing__text text-white">
              Legal Bot is a cutting-edge digital assistant that leverages{" "}
              <br />
              artificial intelligence to provide quick and accurate legal <br />
              information, guidance, and document generation, <br />
              simplifying complex legal processes and empowering <br />
              users to make informed decisions within the realm of law.
            </p>
            <Link
              href="/chat"
              class="button__primary text-black inline-block no-underline mt-4 bg-white font-bold rounded-xl"
            >
              Try it out &nbsp; &nbsp; &#5171;
            </Link>
          </div>
        </div>
      </section>
      <section class="help mt-12 mb-0 pt-12">
        <h1 class="heading__primary text-6xl uppercase font-bold heading__primary--mod mb-8 no-underline text-center">
          How we'll help you.
        </h1>
        <div class="card-container p-20 grid grid-cols-4 gap-32">
          <Helpcard
            title="Identify the problems you may face."
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ex tenetur molestiae beatae dolorem, voluptatum minima pariatur nam voluptates magnam dolor"
          />
          <Helpcard
            title="Identify the problems you may face."
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ex tenetur molestiae beatae dolorem, voluptatum minima pariatur nam voluptates magnam dolor"
          />
          <Helpcard
            title="Identify the problems you may face."
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ex tenetur molestiae beatae dolorem, voluptatum minima pariatur nam voluptates magnam dolor"
          />
          <Helpcard
            title="Identify the problems you may face."
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis ex tenetur molestiae beatae dolorem, voluptatum minima pariatur nam voluptates magnam dolor"
          />
        </div>
        <div class="card-details-container w-full bg-cyan-400 grid grid-cols-1 pt-32">
        <Problemscard
        title="Identify the problems you may face."
        description="LegalBot acts as your virtual legal detective, carefully examining your circumstances to pinpoint potential legal issues you may encounter. Our AI-powered analysis helps you gain a clear understanding of the challenges ahead."
      />
        <Problemscard
        title="Identify the problems you may face."
        description="LegalBot acts as your virtual legal detective, carefully examining your circumstances to pinpoint potential legal issues you may encounter. Our AI-powered analysis helps you gain a clear understanding of the challenges ahead."
      />
        <Problemscard
        title="Identify the problems you may face."
        description="LegalBot acts as your virtual legal detective, carefully examining your circumstances to pinpoint potential legal issues you may encounter. Our AI-powered analysis helps you gain a clear understanding of the challenges ahead."
      />
        <Problemscard
        title="Identify the problems you may face."
        description="LegalBot acts as your virtual legal detective, carefully examining your circumstances to pinpoint potential legal issues you may encounter. Our AI-powered analysis helps you gain a clear understanding of the challenges ahead."
      />
          
          
        </div>
      </section>
    </>
  );
}
