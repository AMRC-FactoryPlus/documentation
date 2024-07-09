import React from 'react';

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

function FpCpt (props) {
    const { layout, name, style, justify, vertical, hilite, children } = props;

    const hidden = (hilite && name != hilite);
    const colour = hidden ? `${Colours.light} opacity-40` : Colours[style ?? "light"];
    const classes = `p-4 items-center flex ${Justify[justify]} ${layout} ${colour}`;
    const direct = vertical ? { writingMode: "vertical-lr" } : {};

    return <div className={classes} style={direct}>{children}</div>;
}

function Cluster (props) {
    const { title, children } = props;

    return <div className="mb-10 mx-auto text-center w-full flex justify-center">
        <div className="flex flex-col">
            <FpCpt style="white" justify="start" layout="mb-2 h-[3vw] w-full">{title}</FpCpt>
            <div className="flex">
                {children}
            </div>
        </div>
    </div>;
}

export function CentralCluster (props) {
    const { hilite } = props;

    return <Cluster title="Central cluster">
        <FpCpt name="identity" vertical style="dark" hilite={hilite} justify="end" layout="w-[3vw]">Identity</FpCpt>
        <div className="flex flex-col">
            <FpCpt name="identity" hilite={hilite} style="dark" layout="h-[3vw]"></FpCpt>
            <FpCpt name="authorisation" hilite={hilite} style="mid" vertical justify="end" 
                layout="flex-1 mt-2 ml-2 w-[3vw]">Authorisation</FpCpt>
        </div>
        <div className="grid grid-cols-4 gap-2">
            <FpCpt name="identity" hilite={hilite} style="dark" justify="end" layout="col-span-full h-[3vw]">Identity</FpCpt>
            <FpCpt name="authorisation" hilite={hilite} style="mid" justify="end" layout="col-span-full h-[3vw]">Authorisation</FpCpt>
            <FpCpt name="directory" hilite={hilite} layout="ml-2">Directory</FpCpt>
            <FpCpt name="configdb" hilite={hilite}>Config DB</FpCpt>
            <FpCpt name="commands" hilite={hilite}>Commands</FpCpt>
            <FpCpt name="git" hilite={hilite}>Git server</FpCpt>
            <FpCpt name="manager" hilite={hilite} layout="ml-2">Manager</FpCpt>
            <FpCpt name="warehouse" hilite={hilite}>Data Warehouse</FpCpt>
            <FpCpt name="cluster-manager" hilite={hilite}>Cluster Manager</FpCpt>
            <FpCpt name="monitor" hilite={hilite}>Central Monitor</FpCpt>
            <FpCpt name="mqtt" hilite={hilite} layout="col-span-full ml-2">MQTT</FpCpt>
        </div>
    </Cluster>;
};

export function EdgeCluster (props) {
    const { hilite } = props;

    return <Cluster title="Edge clusters">
        <FpCpt name="flux" hilite={hilite} style="mid" vertical justify="end" layout="w-[3vw]">Flux</FpCpt>
        <div className="grid grid-cols-3 gap-2">
            <FpCpt name="flux" hilite={hilite} style="mid" justify="end" layout="col-span-full h-[3vw]">Flux</FpCpt>
            <FpCpt name="edge-sync" hilite={hilite} layout="ml-2">Edge Sync</FpCpt>
            <FpCpt name="monitor" hilite={hilite}>Edge Monitor</FpCpt>
            <FpCpt name="edge-agent" hilite={hilite}>Edge Agents</FpCpt>
        </div>
    </Cluster>;
}
