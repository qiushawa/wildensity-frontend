import React from 'react';
import AreaMap from '../components/MapComponents/AreaMap';
import ButtonList from '../components/ButtonList';
import SightingRecord from '../components/Charts/SightingRecord';
const AreaMapPage: React.FC = () => {
  return (
    <>
      <ButtonList options={['山羌一號', '山羌二號', '山羌三號']} />
      <div className='h-[700px] mt-4'>
        <AreaMap camera_id={1} center={[23.827890, 120.970192]} />
      </div>
      <div className='flex'>
        <SightingRecord />
        <div className='mt-5 w-[30%] border-2 ml-2 p-5'>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="shrink-0">
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        事件名稱或概述
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        114/05/14  11:45:14
                      </p>
                    </div>

                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </>
  );
};

export default AreaMapPage;