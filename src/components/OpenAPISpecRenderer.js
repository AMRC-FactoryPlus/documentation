import React, {useState, useEffect} from 'react';
import yaml from 'js-yaml';
import {RestParameters, RestRequest, RestResponse} from "./RestUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {OpenAPISpec} from "./OpenAPISpec";

const OpenAPISpecRenderer = ({url, text}) => {
    const [paths, setPaths] = useState(null);
    const [refs, setRefs] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const text = await response.text();
                const parsedSpec = yaml.load(text);
                setPaths(parsedSpec.paths);
                setRefs(parsedSpec.components);
            } catch (error) {
                console.error(`Error fetching OpenAPI spec from ${url}: ${error.message}`);
            }
        };
        fetchData();
    }, [url]);

    return paths && refs ? (
        <div>
            <OpenAPISpec url={url} text={text}></OpenAPISpec>

            {Object.entries(paths).map(([path, methods]) => (
                <div key={path}>
                    <div className={'border-solid border-transparent border-b-brand-10 mb-3'}>
                        {Object.entries(methods).filter(([method, methodInfo]) => method !== 'parameters').map(([method, methodInfo]) => (
                            <div className={'flex flex-col-rev'} key={method}>
                                <div>
                                    {(
                                        <RestRequest key={path+'-req-'+method} type={method} url={path} description={methodInfo.summary}></RestRequest>
                                    )}
                                </div>
                            </div>
                        ))}
                        {Object.entries(methods).filter(([method, methodInfo]) => method === 'parameters').map(([method, methodInfo]) => (
                            <div className={'flex flex-col-rev'} key={method}>
                                <div>
                                    {(
                                        <RestParameters key={path+'-params-'+method} details={methodInfo} refs={refs}></RestParameters>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <div className='bg-brand-10 p-3 animate-pulse flex gap-2 items-center'>
            <FontAwesomeIcon className={'fa-spin w-10'} icon={faCircleNotch}/>
            <div className="flex flex-col">
                <div className={'font-bold'}>Loading OpenAPI Specification...</div>
                <div className={'text-brand-60 text-sm'}>From: {url}</div>
            </div>
        </div>
    );
};

export default OpenAPISpecRenderer;