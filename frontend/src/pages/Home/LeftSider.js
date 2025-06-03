import React from 'react';

function LeftSider() {
  return (
    <div className='fixed left-0 bottom-0 px-10 z-50 sm:static'>
      <div className='flex flex-col items-center gap-6'>

        <div className='flex flex-col gap-5 text-2xl'>
          <a
            href="https://github.com/muhammadinzamamamjad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-tertiary transition-all"
          >
            <i className="ri-github-line"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/inzemam-amjad-394b02253/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-tertiary transition-all"
          >
            <i className="ri-linkedin-box-line"></i>
          </a>
          <a
            href="mailto:mianinzemam@gmail.com"
            className="text-gray-400 hover:text-tertiary transition-all"
          >
            <i className="ri-mail-line"></i>
          </a>
        </div>

        <div className='w-[1px] h-52 bg-[#124f63] sm:hidden'></div>
      </div>
    </div>
  );
}

export default LeftSider;
