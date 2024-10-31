import React, { createContext, useContext } from 'react';
import useBaseUrl from "@docusaurus/useBaseUrl";

const Colours = {
    dark:   "bg-brand text-white dark:bg-brand-10 dark:text-brand",
    mid:    "bg-brand-80 text-white dark:bg-brand-40 dark:text-brand",
    light:  "bg-brand-20 text-brand dark:bg-brand-90 dark:text-white",
    white:  "bg-white text-brand dark:bg-brand dark:text-white",
};

/* Looking these up works. Building a class name using string
 * interpolation doesn't. Don't ask me. */
const Justify = {
    start:  "justify-start",
    center: "justify-center",
    end:    "justify-end",
};

const Ctx = createContext({});

function FpCpt (props) {
    const { layout, name, style, justify, vertical, children } = props;

    const { base, hilite } = useContext(Ctx);

    const hidden = (hilite && name != hilite);
    const colour = hidden ? `${Colours.light} opacity-40` : Colours[style ?? "light"];
    const classes = `p-4 items-center flex ${Justify[justify ?? "center"]} ${layout} ${colour}`;
    const direct = vertical ? { writingMode: "vertical-lr" } : {};

    const content = base 
        ? <a href={useBaseUrl(`${base}/${name}`)} style={{ color: "inherit" }}>{children}</a>
        : children;

    return <div className={classes} style={direct}>{content}</div>;
}

function Cluster (props) {
    const { title, path, hilite, children } = props;

    const base = `docs/framework-components/${path}`;
    const ctx = { hilite, base };

    return <div className="mb-10 mx-auto text-center w-full flex justify-center">
        <div className="flex flex-col">
            <FpCpt style="white" justify="start" layout="mb-2 h-[3vw] w-full">{title}</FpCpt>
            <div className="flex">
                <Ctx.Provider value={ctx}>{children}</Ctx.Provider>
            </div>
        </div>
    </div>;
}

export function CentralCluster (props) {
    const { hilite } = props;

    return <Cluster title="Central cluster" path="central" hilite={hilite}>
        <FpCpt name="identity" vertical style="dark" justify="end" layout="w-[3vw]">Identity</FpCpt>
        <div className="flex flex-col">
            <FpCpt name="identity" style="dark" layout="h-[3vw]"></FpCpt>
            <FpCpt name="authorisation" style="mid" vertical justify="end" 
                layout="flex-1 mt-2 ml-2 w-[3vw]">Authorisation</FpCpt>
        </div>
        <div className="grid grid-cols-4 gap-2">
            <FpCpt name="identity" style="dark" justify="end" layout="col-span-full h-[3vw]">Identity</FpCpt>
            <FpCpt name="authorisation" style="mid" justify="end" layout="col-span-full h-[3vw]">Authorisation</FpCpt>
            <FpCpt name="directory" layout="ml-2">Directory</FpCpt>
            <FpCpt name="configuration-store">Config Store</FpCpt>
            <FpCpt name="commands">Commands</FpCpt>
            <FpCpt name="git">Git server</FpCpt>
            <FpCpt name="manager" layout="ml-2">Manager</FpCpt>
            <FpCpt name="data-warehouse">Data Warehouse</FpCpt>
            <FpCpt name="cluster-manager">Cluster Manager</FpCpt>
            <FpCpt name="monitor">Central Monitor</FpCpt>
            <FpCpt name="mqtt" layout="col-span-full ml-2">MQTT</FpCpt>
        </div>
    </Cluster>;
};

export function EdgeCluster (props) {
    const { hilite } = props;

    return <Cluster title="Edge clusters" path="edge" hilite={hilite}>
        <FpCpt name="flux" style="mid" vertical justify="end" layout="w-[3vw]">Flux</FpCpt>
        <div className="grid grid-cols-3 gap-2">
            <FpCpt name="flux" style="mid" justify="end" layout="col-span-full h-[3vw]">Flux</FpCpt>
            <FpCpt name="sealed-secrets" layout="ml-2">Sealed Secrets</FpCpt>
            <FpCpt name="edge-sync">Edge Sync</FpCpt>
            <FpCpt name="monitor">Edge Monitor</FpCpt>
            <FpCpt name="edge-agent" layout="ml-2 col-span-full">Edge Agents</FpCpt>
        </div>
    </Cluster>;
}
