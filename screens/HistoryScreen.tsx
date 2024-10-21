import { Box, Stack } from '@mui/system';
import React from 'react';
import { useQueryNarrativeHistory } from '../use_query/useQueryInterface';

export default function HistoryScreen() {
    const { data = [] } = useQueryNarrativeHistory()

    return (
        <dialog
            open={true}
            style={{
                height: "80%",
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    minHeight: 0,
                    px: 2,
                    py: 3,
                    overflowY: 'scroll',
                    flexDirection: 'column-reverse',
                    pointerEvents: "auto",
                    overflow: 'auto',
                    height: "80%",
                }}
            >
                <Stack spacing={2} justifyContent="flex-end">
                    {data
                        .map((data, index) => {
                            return <React.Fragment key={"history" + index}>
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                >
                                    <img
                                        src={data.icon}
                                        loading="lazy"
                                        alt=""
                                        style={{
                                            verticalAlign: "middle",
                                            maxWidth: "50px",
                                            maxHeight: "50px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        {data.character && data.character}
                                        <div />
                                        {data.text}
                                    </Box>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={0.5}
                                >
                                    <Box sx={{ flex: 1 }}>
                                        {data.choices && data.choices.map((choice, index) => {
                                            if (choice.hidden) {
                                                return null
                                            }
                                            if (choice.isResponse) {
                                                return <div
                                                    key={"choices-success" + index}
                                                    style={{
                                                        display: "inline-block",
                                                        padding: "5px 5px",
                                                        fontSize: "12px",
                                                        borderRadius: "25px",
                                                        backgroundColor: "#21ff3e",
                                                    }}
                                                >
                                                    {choice.text}
                                                </div>
                                            }
                                            return <div
                                                key={"choices" + index}
                                                style={{
                                                    display: "inline-block",
                                                    padding: "5px 5px",
                                                    fontSize: "12px",
                                                    borderRadius: "25px",
                                                    backgroundColor: "#bcfdff",
                                                }}
                                            >
                                                {choice.text}
                                            </div>
                                        })}
                                        {data.inputValue && <div
                                            key={"choices-success" + index}
                                            style={{
                                                display: "inline-block",
                                                padding: "5px 5px",
                                                fontSize: "12px",
                                                borderRadius: "25px",
                                                backgroundColor: "#b0c2b2",
                                            }}
                                        >
                                            {data.inputValue.toString()}
                                        </div>}
                                    </Box>
                                </Stack>
                            </React.Fragment>
                        })}
                </Stack>
            </Box>
        </dialog>
    );
}
