import React from 'react';

export const RestRequest = ({type, url, summary, description}) => {
    const desc = description ? <div
        className="rounded-none border-none text-brand flex items-center flex-1 w-full bg-brand-10 dark:bg-brand-90 dark:text-white h-4 p-4">
        {description}
    </div> : null;

    return <div className={'flex flex-col flex-1 mb-3'}>
        <div className="rounded-none border-none text-brand flex items-center">
            <div
                className={'bg-brand-90 dark:bg-brand-20 dark:text-brand text-white px-2 py-1 font-bold tracking-wide uppercase'}>{type}</div>
            <div className={'bg-brand-70 dark:bg-brand-30 text-white dark:text-brand px-2 py-1 font-bold'}>{url}</div>
        </div>
        <div className="text-brand bg-brand-10 dark:text-white dark:bg-brand-90 items-center px-4 py-1 font-bold">{summary}</div>
        {desc}
    </div>;
};

export const RestParameters = ({details, refs}) => (
    <div className={'flex flex-col flex-1 mb-3'}>
        <div className={'text-brand dark:text-white font-bold tracking-wide uppercase'}>Parameters</div>
        <div className="rounded-none border-none text-brand flex items-center my-2">
            <div className={'text-brand dark:text-white flex-1'}>
                <div className={'grid grid-cols-6 flex-1 gap-2 bg-brand-10 dark:bg-brand-90 p-2'}>
                    <div className={'font-bold'}>Name</div>
                    <div className={'font-bold'}>In</div>
                    <div className={'font-bold'}>Required</div>
                    <div className={'font-bold'}>Description</div>
                </div>
                {
                    details && details.some(e => '$ref' in e) && (
                        Object.values(details).map(e => (
                            <div className={'grid grid grid-cols-6 items-baseline gap-2 even:bg-brand-3 dark:even:bg-brand-80 odd:bg-brand-5' +
                                ' dark:odd:bg-brand-70' +
                                ' p-2' +
                                ' border-solid border-0' +
                                ' border-b border-brand-10 dark:border-brand-80 border-l border-r'}>
                                <code className={'mr-auto'}>{getNestedValue(refs, e['$ref'].replace(/^#\/components\//, '')).name}</code>
                                <div>{getNestedValue(refs, e['$ref'].replace(/^#\/components\//, '')).in}</div>
                                <div>{JSON.stringify(getNestedValue(refs, e['$ref'].replace(/^#\/components\//, '')).required) ? 'Yes' : 'No'}</div>
                                <div className={'col-span-3'}>{getNestedValue(refs, e['$ref'].replace(/^#\/components\//, '')).description ?? 'NONE'}</div>
                            </div>
                        ))
                    )}


                {
                    details && !details.some(e => '$ref' in e) && (
                        Object.values(details).map(e => (
                            <div className={'grid grid-cols-6 items-baseline gap-2 even:bg-brand-3 dark:even:bg-brand-80 odd:bg-brand-5' +
                                ' dark:odd:bg-brand-70' +
                                ' p-2' +
                                ' border-solid border-0' +
                                ' border-b border-brand-10 dark:border-brand-80 border-l border-r'}>
                                <code className={'mr-auto'}>{e.name}</code>
                                <div>{e.in}</div>
                                <div>{JSON.stringify(e.required) ? 'Yes' : 'No'}</div>
                                <div className={'col-span-3'}>{e.description}</div>
                            </div>
                        ))
                    )}
            </div>
        </div>
    </div>
);

export const RestResponse = ({returns}) => (
    <div className={'flex mb-4'}>
        <div className="rounded-none flex items-start justify-between bg-brand-5 text-brand">
            <div className={'px-2 py-1 font-bold tracking-wide uppercase pb-auto bg-brand-30 dark:bg-brand-80 text-white'}>Returns</div>
            <div className={'px-2 py-1 dark:text-white'}>{returns}</div>
        </div>
    </div>
);

function getNestedValue(obj, path) {
    const properties = path.split('/');
    let nestedValue = obj;
    for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        nestedValue = nestedValue[property];
        if (nestedValue === undefined) {
            return undefined;
        }
    }
    return nestedValue;
}
