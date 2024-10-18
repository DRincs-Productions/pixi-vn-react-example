import { narration } from '@drincs/pixi-vn';
import { useQueryClient } from '@tanstack/react-query';
import { INTERFACE_DATA_USE_QUEY_KEY, useQueryCanGoBack } from '../use_query/useQueryInterface';

export default function BackButton() {
    const queryClient = useQueryClient()
    const { data: canGoBack = false } = useQueryCanGoBack()

    async function backOnClick(): Promise<void> {
        try {
            if (!narration.canGoBack) {
                return;
            }
            narration.goBack((_path) => {
                // TODO: navigate in the url path
                // READ THIS: https://pixi-vn.web.app/start/interface.html#navigate-switch-between-ui-screens
            })
                .then(() => {
                    queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] })
                })
                .catch((e) => {
                    console.error(e);
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
            style={{
                position: "absolute",
                right: 0,
                bottom: 22,
                width: 40,
                height: 20,
                pointerEvents: "auto",
            }}
        >
            Back
        </button>
    );
}
