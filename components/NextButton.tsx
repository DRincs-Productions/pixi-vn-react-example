import { narration } from '@drincs/pixi-vn';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { INTERFACE_DATA_USE_QUEY_KEY, useQueryCanGoNext } from '../use_query/useQueryInterface';

export default function NextButton() {
    const queryClient = useQueryClient()
    const { data: canGoNext = false } = useQueryCanGoNext()
    const [loading, setLoading] = useState(false);

    async function nextOnClick(): Promise<void> {
        try {
            if (!narration.canGoNext) {
                return;
            }
            setLoading(true);
            narration.goNext({})
                .then(() => {
                    queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
                    setLoading(false);
                })
                .catch((e) => {
                    console.error(e);
                    setLoading(false);
                })
            return;
        } catch (e) {
            console.error(e);
            return;
        }
    }

    if (!canGoNext) {
        return null
    }

    return (
        <button
            color="primary"
            onClick={nextOnClick}
            disabled={loading}
            style={{
                position: "absolute",
                right: 0,
                bottom: 70,
                width: 40,
                height: 20,
                pointerEvents: "auto",
            }}
        >
            Next
        </button>
    );
}
