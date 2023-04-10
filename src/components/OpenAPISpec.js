import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import Link from "@docusaurus/Link";
import {faCode} from "@fortawesome/free-solid-svg-icons";

export const OpenAPISpec = ({url, text}) => {
    return (
        <div className={'bg-brand-10 p-6 mb-6 flex flex-col sm:flex-row gap-6 sm:items-center justify-between border-solid' +
            ' border-none'}>
            <div className="flex flex-col">
                <div className="md:flex md:items-center md:justify-between min-w-0 flex-1">
                    <h2 className="text-2xl text-brand sm:truncate sm:text-2xl sm:tracking-tight mb-0">
                        OpenAPI Specification
                    </h2>
                </div>
                <div className={'text-sm text-brand-80'}>View the full OpenAPI specification for {text}</div>
            </div>
            <Link className={'hover:no-underline'}
                  to={url}
            target={'_blank'}>
                <div className="">
                    <div
                        className="flex whitespace-nowrap items-center justify-center py-2 px-4 ring-1 text-white dark:text-brand bg-brand dark:bg-white hover:bg-opacity-90 dark:hover:bg-brand-3 ring-brand dark:ring-white gap-2"
                    >
                        <FontAwesomeIcon icon={faCode}/>
                        View Specification
                    </div>
                </div>
            </Link>
        </div>
    )
}
