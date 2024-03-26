import React from 'react'
import Loader from '../Loader'

const QuestionAnswer = ({QNA}) => {
  return (
    <>

            <>
                <div className="question w-3/5 m-auto px-12 py-6">
                    <p className="who text-3xl my-4">You</p>
                    <p className="question-text text-xl">{QNA.question}</p>
                </div>
                <div className="answer w-3/5 m-auto my-12 px-12">
                    <p className="who text-3xl my-4">LegalBot</p>
                        {!QNA.answer && (
                            <div className='answer w-3/5 m-auto py-5 px-12 flex justify-center'>
                                <Loader  />
                            </div>
                        )}
                        {QNA.answer && (
                            <p className="question-text text-xl my-4">{QNA.answer}</p>
                        )}
                </div>
            </>
    </>
  )
}

export default QuestionAnswer