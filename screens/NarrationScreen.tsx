import { narration } from '@drincs/pixi-vn';
import { Box, Grid, Stack } from '@mui/system';
import { useQueryClient } from '@tanstack/react-query';
import { INTERFACE_DATA_USE_QUEY_KEY, useQueryCanGoNext, useQueryDialogue } from '../use_query/useQueryInterface';
import ChoiceMenu from './ChoiceMenu';

export default function NarrationScreen() {
    const { data: { text, character } = {} } = useQueryDialogue()
    const { data: canGoNext = false } = useQueryCanGoNext()
    const queryClient = useQueryClient()

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
        <Stack
            direction="column"
            spacing={0}
            sx={{
                justifyContent: "flex-end",
                alignItems: "center",
                height: '100%',
                width: '100%',
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <ChoiceMenu />
            {text && <Box
                sx={{
                    pointerEvents: "auto",
                    backgroundColor: "white",
                    height: "30%",
                    width: "100%",
                }}
            >
                <Stack
                    direction="column"
                    spacing={0}
                    sx={{
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                        height: '100%',
                        width: '100%',
                    }}
                >
                    {character && character.name && <div
                        style={{
                            marginLeft: "10px",
                        }}
                    >
                        {character.name + (character.surname ? " " + character.surname : "")}
                    </div>}
                    <Grid
                        container
                        direction={"column"}
                        sx={{
                            overflow: 'auto',
                            marginRight: canGoNext ? "40px" : undefined,
                            height: "100%",
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
                    </Grid>
                </Stack>

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
            </Box>}
        </Stack>
    );
}
