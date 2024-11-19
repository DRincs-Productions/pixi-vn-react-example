import { narration } from '@drincs/pixi-vn';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { INTERFACE_DATA_USE_QUEY_KEY, useQueryCanGoBack } from '../use_query/useQueryInterface';

export default function BackButton() {
    const queryClient = useQueryClient()
    const { data: canGoBack = false } = useQueryCanGoBack()
    const [loading, setLoading] = useState(false);

    async function backOnClick(): Promise<void> {
        try {
            if (!narration.canGoBack) {
                return;
            }
            setLoading(true);
            narration.goBack((_path) => {
                // TODO: navigate in the url path
                // READ THIS: https://pixi-vn.web.app/start/interface.html#navigate-switch-between-ui-screens
            })
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

    if (!canGoBack) {
        return null;
    }

    return (
        <button
            color="primary"
            onClick={backOnClick}
            disabled={loading}
            style={{
                position: "absolute",
                right: 0,
                bottom: 48,
                width: 40,
                height: 20,
                pointerEvents: "auto",
            }}
        >
            Back
        </button>
    );
}
