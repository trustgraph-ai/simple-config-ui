
import React from 'react';

import { Argument } from '../state/Agents';

import ToolArgument from './ToolArgument';

interface ToolArgumentsProps {
    tool : any;
    setArgName : any;
    setArgType : any;
    setArgDescription : any;
    deleteArg : any;
}

const ToolArguments : React.FC<ToolArgumentsProps> = ({
    tool, setArgName, setArgType, setArgDescription, deleteArg,
}) => {

    return (

        <>

            {
                tool.arguments.map(
                    (arg : Argument, ix : number) => (

                        <ToolArgument
                            key={ix}
                            arg={arg}
                            ix={ix}
                            setArgName={setArgName}
                            setArgType={setArgType}
                            setArgDescription={setArgDescription}
                            deleteArg={deleteArg}
                        />
                    )
                )
            }

        </>
    );

}

export default ToolArguments;

