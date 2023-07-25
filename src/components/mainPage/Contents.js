import React from 'react'
import Image from 'next/image'
import content1 from '../../../public/images/content1.png';
import content2 from '../../../public/images/content2.png';
import content3 from '../../../public/images/content3.png';

function contents() {
  return (
    <div className='w-full flex justify mt-16'>
        <div className="flex flex-col ml-8 mr-8">
            <Image src={content1} alt="Content 1" className="w-full" />
                <div className="font-semibold text-3xl mt-5">Feed your employees</div>
                <div className='underline mt-3 text-lg'>Create a business account</div>
        </div>
        <div className="flex flex-col mr-8">
            <Image src={content2} alt="Content 2" className="w-full" />
                <div className="font-semibold text-3xl mt-5">Your restaurant, delivered</div>
                <div className='underline mt-3 text-lg'>Add your restaurant</div>
        </div>
        <div className="flex flex-col mr-8">
            <Image src={content3} alt="Content 3" className="w-full" />
                <div className="font-semibold text-3xl mt-5">Deliver with Uber Eats</div>
                <div className='underline mt-3 text-lg'>Sign up to deliver</div>
        </div>
    </div>
  )
}

export default contents
