import React from 'react';
import SuperButton from "../universalComponents/SuperButton/SuperButton";
import SuperCheckbox from "../universalComponents/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../universalComponents/SuperInputText/SuperInputText";

export const Test = () => {
    return (
        <div>
            <div>
                button: <SuperButton/>
            </div>
            <div>
                checkbox: <SuperCheckbox/>
            </div>
            <div>
                input: <SuperInputText/>
            </div>
        </div>
    );
};
