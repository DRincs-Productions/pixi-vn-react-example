import { narration } from '@drincs/pixi-vn';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { INTERFACE_DATA_USE_QUEY_KEY, useQueryDialogue, useQueryInputValue } from '../../use_query/useQueryInterface';

export default function TextInput() {
    const { data: { text } = {} } = useQueryDialogue()
    const { data: { isRequired: open } = { currentValue: undefined, isRequired: false } } = useQueryInputValue();
    const [tempValue, setTempValue] = useState();
    const queryClient = useQueryClient()

    return (
        <dialog
            open={open}
            style={{
                pointerEvents: "auto",
            }}
        >
            <p>{text}</p>
            <input
                onChange={(e) => {
                    let value: any = e.target.value;
                    if (e.target.type === "number") {
                        value = e.target.valueAsNumber
                    }
                    setTempValue(value)
                }}
            />
            <button
                onClick={() => {
                    narration.inputValue = tempValue
                    queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
                }}
            >Confirm</button>
        </dialog>
    );
}
