import { narration } from '@drincs/pixi-vn';
import { Box, Grid } from '@mui/system';
import { QueryClient } from '@tanstack/react-query';
import { INTERFACE_DATA_USE_QUEY_KEY, useQueryCanGoNext, useQueryDialogue } from '../use_query/useQueryInterface';

export default function NarrationScreen() {
    const { data: { text, character } = {} } = useQueryDialogue()
    const { data: canGoNext = false } = useQueryCanGoNext()
    const queryClient = new QueryClient()

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

    return (
        <>
            <Grid
                container
                direction={"column"}
                style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    pointerEvents: "auto",
                    backgroundColor: "white",
                    paddingTop: character?.name ? "20px" : "5px",
                    paddingBottom: "5px",
                    height: "45%",
                    width: "100%",
                }}
            >
                {character?.icon && <Grid size={2}>
                    <img
                        src={character?.icon}
                        loading="lazy"
                        alt=""
                        style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                        }}
                    />
                </Grid>}
                <Grid size={character?.icon ? 10 : 12}>
                    <Box>
                        {text}
                    </Box>
                </Grid>
                {character && character.name && <div
                    style={{
                        position: "absolute",
                        top: 3,
                        left: 5,
                    }}
                >
                    {character.name + (character.surname ? " " + character.surname : "")}
                </div>}
            </Grid>

            {canGoNext && <button
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
            </button>}
        </>
    );
}
