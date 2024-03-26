import Image from 'next/image'

const MemberCard = ({name, position, imgURL}) => {
  return (
    <div className="card--2 px-16 pt-16 pb-8 border-4 border-solid border-white">
        <div className="img-holder w-full mt-8 ">
            <Image 
            className="img inline-block outline outline-solid outline-cyan-400" 
            src={imgURL} alt=""
            width={300} height={300} />
        </div>
        <div className="txt mt-8">
            <p className="text-center font-bold text-2xl text-cyan-400">{name}</p>
            <p className="text-center font-bold text-2xl text-cyan-400">{position}</p>
        </div>
    </div>
  )
}

export default MemberCard