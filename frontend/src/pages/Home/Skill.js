import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

function Skill() {
  const { PortfolioData } = useSelector((state) => state.root);
  const skills = PortfolioData?.skills?.[0] || {};

  const {
    programmingLanguages = [],
    webDevelopment = [],
    databases = []
  } = skills;

  return (
    <div className='mt-6'>
      <SectionTitle title="Skills" />

      {/* Programming Languages */}
      <div className='mb-6'>
        <h2 className='text-tertiary text-lg mt-6'>Programming Languages</h2>
        <div className='flex flex-wrap gap-4 mt-3 py-3'>
          {programmingLanguages.map((language, index) => (
            <div key={index} className='inline-block border border-tertiary text-tertiary py-2 px-3 rounded'>
              {language}
            </div>
          ))}
        </div>
      </div>

      {/* Web Development */}
      <div className='mb-6'>
        <h2 className='text-tertiary text-lg mt-6'>Web Development</h2>
        <div className='flex flex-wrap gap-4 mt-3 py-3'>
          {webDevelopment.map((tech, index) => (
            <div key={index} className='inline-block border border-tertiary text-tertiary py-2 px-3 rounded'>
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* Databases */}
      <div className='mb-6'>
        <h2 className='text-tertiary text-lg mt-6'>Databases</h2>
        <div className='flex flex-wrap gap-4 py-3 mt-3'>
          {databases.map((db, index) => (
            <div key={index} className='inline-block border border-tertiary text-tertiary py-2 px-3 rounded'>
              {db}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skill;
