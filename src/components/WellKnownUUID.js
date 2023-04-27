import React from 'react';

export const WellKnownUUID = ({name, description, uuid, type = 'Permission'}) => (
    <div className={'flex flex-col flex-1 mb-6'}>
        <div className="rounded-none border-none text-brand flex items-end justify-between">
            <div className="flex">
                <div className={'bg-brand-90 dark:bg-brand-10 dark:text-brand text-white px-2 py-1 font-bold tracking-wide'}>{type}</div>
                <div className={'bg-brand-70 dark:bg-brand-30 dark:text-brand text-white px-2 py-1 font-bold tracking-wide'}>{name}</div>
            </div>
            <div className="flex">
                <div className={'bg-brand-10 dark:bg-brand-80 text-brand-80 dark:text-brand-20 px-2 py-1 text-sm font-bold'}>{uuid}</div>
            </div>
        </div>
        <div
            className="rounded-none border-none text-brand flex items-center flex-1 w-full bg-brand-10 dark:bg-brand-90 dark:text-white h-4 p-4">
            {description}
        </div>
    </div>
);
