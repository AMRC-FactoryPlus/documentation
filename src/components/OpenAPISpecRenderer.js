import React, {createContext, useContext, useState, useEffect} from 'react';
import yaml from 'js-yaml';
import {RestParameters, RestRequest, RestResponse} from "./RestUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {OpenAPISpec} from "./OpenAPISpec";

const NotMethod = new Set(["summary", "description", "servers", "parameters"]);

const Path = createContext({});

function Methods (props) {
    const { methods } = props;
    return Object.entries(methods)
        .filter(([m]) => !NotMethod.has(m))
        .map(([m, inf]) => <Method method={m} info={inf}/>);
}

function Method (props) {
    const { method, info } = props;
    const { servers, path } = useContext(Path);

    return <div className={'flex flex-col-rev'} key={method}>
        <div>
            <RestRequest key={path+'-req-'+method} type={method} url={servers+path} 
                summary={info.summary} description={info.description}/>
        </div>
    </div>;
}

function Parameters (props) {
    const { params } = props;
    if (!params) return null;

    const { path, refs } =  useContext(Path);

    return <div className={'flex flex-col-rev'} key="parameters">
        <div>
            <RestParameters key={path+'-params'} details={params} refs={refs}></RestParameters>
        </div>
    </div>;
}

function Summary (props) {
    const { summary, description } = props;
    if (!summary && !description) return null;
    
    // XXX This is not right but just get something displayed for now
    return <Method method="path" info={props}/>;
}

const OpenAPISpecRenderer = ({url, text}) => {
    const [paths, setPaths] = useState(null);
    const [refs, setRefs] = useState(null);
    const [servers, setServers] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const text = await response.text();
                const parsedSpec = yaml.load(text);
                setPaths(parsedSpec.paths);
                setRefs(parsedSpec.components);
                setServers(parsedSpec.servers?.[0]?.url === '/' ? '' : parsedSpec.servers?.[0]?.url);
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
                <div key={path}><Path.Provider value={{ path, servers, refs }}>
                    <div className={'border-solid border-transparent border-b-brand-10 mb-3'}>
                        <Summary summary={methods.summary} description={methods.description}/>
                        <Parameters params={methods.parameters}/>
                        <Methods methods={methods}/>
                    </div>
                </Path.Provider></div>
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
