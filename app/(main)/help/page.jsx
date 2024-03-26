"use client";
import React, { useEffect, useState } from 'react'
import HelpPageCard from '@/components/help/HelpPageCard'
import HelpForm from './HelpForm'
import { sleep } from 'openai/core';
import Loader from '@/components/Loader';

const help = () => {

  const [helpData, setHelpData] = useState(null);
  
  useEffect( () => {
    sleep(50000);
    setHelpData([
      {title: "What is the process for compelling the production of any document or register kept by the registrar?", description: "To compel the production of any document or register kept by the registrar in Pakistan, the process involves following the legal procedures outlined in the Pakistani laws. Specifically, under the Code of Civil Procedure 1908, Order XI governs the discovery and inspection of documents. According to this law, the court may order any party to produce documents in their possession or power related to the matter in question. Additionally, every party involved in the proceeding has the right to request the production of documents for inspection."},
      {title: "What are the conditions under which a general notice given to the board expires?", description: "According to Pakistani laws, a general notice given to the board expires under certain conditions. Specifically, in the context of the Company Ordinance in Pakistan, the notice of an extraordinary general meeting must be sent to the members at least twenty-one days before the date of the meeting. However, in cases of emergency affecting the business of the company, the registrar may authorize a meeting to be held at shorter notice as specified by him. This provision indicates that a general notice given to the board expires if it does not adhere to the required timeline for sending notices for meetings, which is at least twenty-one days before the meeting date."},
      {title: "What is the authorized capital of the company and how is it divided?", description: "In Pakistan, according to the Companies Act, 2017, the authorized capital of a company is the maximum amount of capital that the company can raise through the issuance of shares to its shareholders. The minimum requirement set by the Securities Exchange Commission of Pakistan (SECP) for authorized capital is Rs. 100,000."},
    ]);

  })


  return (
    <>
    <section class = "hero py-36">

    <div class="landing p-8 w-4/6 m-auto">
        <h1 class="heading__primary text-6xl text-white uppercase font-bold">
          Reach out to us.
        </h1>
        


        <HelpForm/>
      </div>
    </section>
    <section class="faq my-16 px-16 py-8 w-4/5 m-auto">
      <h1 class="heading__primary text-6xl text-cyan-400 uppercase font-bold">
        FAQ
      </h1>
      <div class="faq-cont my-8 grid grid-cols-1">
        {helpData && helpData.map(i => (
          <HelpPageCard 
            title = {i.title}
            description={i.description}
          />
        ))}
        {!helpData && (
          <div className='mx-auto'>
            <Loader />
          </div>
        )}
      </div>
    </section>
    </>
  )
}

export default help