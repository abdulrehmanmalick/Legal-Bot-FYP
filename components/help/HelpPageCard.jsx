import React from 'react'

const HelpPageCard = ({title, description}) => {
  return (
    <div class="faq-card w-full rounded-2xl my-4 overflow-hidden">
          <p class="qa--1 bg-cyan-400 w-full text-white text-4xl uppercase p-4">
            {title}
          </p>
          <p
            class="qa--2 bg-gray-100 w-full text-cyan-400 text-4xl uppercase p-4">
            {description}
          </p>
        </div>
  )
}

export default HelpPageCard