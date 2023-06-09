import React from 'react';

const LoaderCustom = () => {
    return (
        <div className='flex items-center justify-center h-[80vh]'>
        <div>
          <h2 className='text-6xl font-semibold text-primary uppercase animate-pulse'>Loading...</h2>
          <p className='text-2xl text-secondary'>Wait for sometime</p>
        </div>
      </div>
    );
};

export default LoaderCustom;