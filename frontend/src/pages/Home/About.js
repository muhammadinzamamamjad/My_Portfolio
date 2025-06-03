import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

function About() {
    const{ PortfolioData} = useSelector((state) => state.root);
  const{about}= PortfolioData;
  const {description1, description2, lottieUrl} = about;
    return (

        <div>
            <SectionTitle title="About" />
            <div className='flex w-full items-center sm:flex-col'>
                <div className='h-[65vh] w-1/2 sm:w-full'>
                    <dotlottie-player
                        src={lottieUrl}
                        background="transparent"
                        speed="1"
                    ></dotlottie-player>
                </div>
                <div className='flex flex-col gap-5 w-1/2 sm:w-full'>
                    <p className='text-white'>{description1}</p>
                    <p className='text-white'>{description2}</p>
                </div>

            </div>
        </div>
    )
}

export default About