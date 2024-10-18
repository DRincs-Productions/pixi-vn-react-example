import { narration } from '@drincs/pixi-vn';
import { useQueryClient } from '@tanstack/react-query';
import { INTERFACE_DATA_USE_QUEY_KEY, useQueryCanGoNext } from '../use_query/useQueryInterface';

export default function NextButton() {
    const queryClient = useQueryClient()
    const { data: canGoNext = false } = useQueryCanGoNext()

    async function nextOnClick(): Promise<void> {
        try {
            if (!narration.canGoNext) {
                return;
            }
            narration.goNext({})
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

    if (!canGoNext) {
        return null
    }

    return (
        <button
            color="primary"
            onClick={nextOnClick}
            style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                pointerEvents: "auto",
            }}
        >
            Next
        </button>
    );
}
