import React, {useEffect} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useCallback} from "react";
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";

import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faBinoculars,
    faCircleDot, faCircleNodes, faCircleNotch,
    faCode, faDatabase,
    faFileCode,
    faGear,
    faLock,
    faRocket, faServer, faWarehouse
} from '@fortawesome/free-solid-svg-icons'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";

library.add(faRocket)
library.add(faArrowRight)

const navigation = [
    {name: 'Product', href: '#'},
    {name: 'Features', href: '#'},
    {name: 'Marketplace', href: '#'},
    {name: 'Company', href: '#'},
];

export function Header() {
    const particlesInit = useCallback(async engine => {
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
    }, []);
    return (
        <div className="relative overflow-hidden">
            <Particles
                className={'-z-50'}
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    "particles": {
                        "number": {
                            "value": 50,
                            "density": {
                                "enable": false,
                                "value_area": 0
                            }
                        },
                        "color": {
                            "value": "#2b3034"
                        },
                        "shape": {
                            "type": "circle",
                            "stroke": {
                                "width": 0,
                                "color": "#000000"
                            },
                            "polygon": {
                                "nb_sides": 3
                            }
                        },
                        "opacity": {
                            "value": 0.3,
                            "random": true,
                        },
                        "size": {
                            "value": 2,
                            "random": true,
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 300,
                            "color": "#000000",
                            "opacity": 0.1,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 0.1,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false,
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "detect_on": "window",
                        "events": {
                            "onclick": {
                                "enable": true,
                                "mode": "repulse"
                            },
                            "resize": true
                        },
                        "modes": {
                            "repulse": {
                                "distance": 400,
                                "duration": 4
                            },
                        }
                    },
                    "retina_detect": true
                }}
            />
            <div className="relative flex items-center justify-center">
                <main className="flex-1 max-w-7xl px-4 mx-10 pt-32 pb-24">
                    <div className="text-left">
                        <h1 className="text-4xl tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl mb-4">
                            <span className="block font-semibold xl:inline">AMRC</span>{' '}
                            <span className="block xl:inline">Factory+</span>
                        </h1>
                        <div className={'mb-10'}>
                            <a href="/articles/changes"
                               className="inline-flex space-x-4 underline-offset-2 !decoration-brand">
                    <span
                        className="bg-brand dark:bg-brand-3 px-2.5 py-1 text-xs font-semibold text-white dark:text-brand tracking-wide uppercase">
                      What's new?
                    </span>
                                <span
                                    className="inline-flex items-center text-sm font-medium text-brand dark:text-brand-3 space-x-1">
                            <span>Re-engineered from the ground up</span>
                        </span>
                            </a>
                        </div>
                        <p className="mt-3 max-w-md text-base text-brand-80 dark:text-brand-3 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            <span className={'font-black'}>Factory+</span> is a cutting-edge open-source reference
                            framework that establishes the digital blueprints necessary for a state-of-the-art,
                            connected manufacturing facility.
                        </p>
                        <div className="flex flex-col sm:flex-row  sm:justify-start gap-4 mt-10">
                            <Link className={'hover:no-underline'}
                                  to={useBaseUrl('/docs/introduction/')}>
                                <div className="">
                                    <div
                                        className="flex whitespace-nowrap items-center justify-center py-4 text-lg px-10 text-white dark:text-brand bg-brand dark:bg-white hover:bg-opacity-90 dark:hover:bg-brand-3 ring-1 ring-brand dark:ring-white"
                                    >
                                        Read the Framework
                                    </div>
                                </div>
                            </Link>
                            <Link className={'hover:no-underline'}
                                  to={'https://github.com/AMRC-FactoryPlus/amrc-connectivity-stack'}>
                                <div className="">
                                    <div
                                        className="flex whitespace-nowrap items-center justify-center bg-white dark:bg-brand hover:bg-brand dark:hover:bg-white dark:hover:text-brand text-brand hover:text-white dark:text-white py-4 text-lg px-10 ring-1 ring-brand dark:ring-white"
                                    >
                                        <span className={'mr-3'}>Deploy the AMRC Connectivity Stack</span>
                                        <FontAwesomeIcon icon={["fas", "rocket"]}/>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export function Testimonial() {
    return (
        <section className="bg-gray-50 overflow-hidden py-24 flex items-center justify-center">
            <div className="relative flex-1 max-w-7xl px-4 mx-10 sm:px-6 lg:px-8">
                <div className="relative">
                    <div className="max-w-7xl text-left text-lg leading-9 font-medium text-gray-600">
                        &ldquo;If you are considering starting your digital transformation journey, regardless
                        of the industry vertical you are in, the Factory+ Framework is a fantastic place to start. It is
                        a great read that I would highly
                        recommend!&rdquo;
                    </div>
                    <footer className="mt-8">
                        <div className="md:flex md:items-center md:justify-start">
                            <div className="md:flex-shrink-0">
                                <img
                                    className="mx-auto h-16 w-16 rounded-full"
                                    src="/img/arlen.jpeg"
                                    alt=""
                                />
                            </div>
                            <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                                <div className="text-base font-medium text-gray-600">Arlen Nipper</div>
                                <div className="text-base font-medium text-gray-500 ml-1"> - President and CTO at Cirrus
                                    Link, co-inventor of MQTT
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </section>
    );
}

function Home() {
    const context = useDocusaurusContext();
    const {siteConfig = {}} = context;
    return (
        <Layout
            title={`Home`}
            description="Factory+">
            <Header></Header>
            <Testimonial></Testimonial>
        </Layout>
    );
}

export default Home;
