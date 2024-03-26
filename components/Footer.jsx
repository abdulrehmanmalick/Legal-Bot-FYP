import React from 'react'

const Footer = () => {
  return (
    <div className='py-10 px-20 hero flex justify-between'>
      <div className='navigation__logo no-underline text-white text-5xl font-bold my-auto'>
        LEGALBOT
      </div>
      <div className='text-white underline'>
        <ul className='flex gap-5'>
          <li>Home</li>
          <li>About</li>
          <li>Chat</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer