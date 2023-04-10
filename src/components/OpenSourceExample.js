import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import Link from "@docusaurus/Link";

export const OpenSourceExample = ({repoUrl='https://github.com/AMRC-FactoryPlus/amrc-connectivity-stack', buttonText='Placeholder'}) => {
    return (
        <div className={'bg-brand-10 p-6 mb-6 flex flex-col sm:flex-row gap-6 sm:items-center justify-between border-solid border-brand'}>
            <div className="flex flex-col">
                <span className="flex text-sm items-center gap-1 text-brand-70 ">
                    <FontAwesomeIcon icon={faGithub}/>
                    <div>Open Source Example</div>
                </span>
                <div className="md:flex md:items-center md:justify-between min-w-0 flex-1 mb-3">
                    <h2 className="text-2xl text-brand sm:truncate sm:text-2xl sm:tracking-tight mb-0">
                        {buttonText}
                    </h2>
                </div>
                <div className={'text-sm text-brand-80'}>See how the AMRC have implemented this component in the AMRC Connectivity Stack</div>
            </div>
            <Link className={'hover:no-underline'}
                  to={repoUrl}>
                <div className="">
                    <div
                        className="flex whitespace-nowrap items-center justify-center py-2 px-4 ring-1 text-white dark:text-brand bg-brand dark:bg-white hover:bg-opacity-90 dark:hover:bg-brand-3 ring-brand dark:ring-white gap-2"
                    >
                        <FontAwesomeIcon icon={faGithub}/>
                        View on Github
                    </div>
                </div>
            </Link>
        </div>
    )
}
