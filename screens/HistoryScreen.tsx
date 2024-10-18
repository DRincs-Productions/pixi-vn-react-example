import { CharacterBaseModel, getCharacterById, narration } from '@drincs/pixi-vn';
import { Box, Stack } from '@mui/system';
import React, { useState } from 'react';

export default function HistoryScreen() {
    const [open, setOpen] = useState(false);

    return (
        <dialog
            open={open}
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
                }}
            >
                <Stack spacing={2} justifyContent="flex-end">
                    {narration.narrativeHistory
                        .map((step) => {
                            let character = step.dialoge?.character ? getCharacterById(step.dialoge?.character) ?? new CharacterBaseModel(step.dialoge?.character, { name: tNarration(step.dialoge?.character) }) : undefined
                            return {
                                character: character?.name ? character.name + (character.surname ? " " + character.surname : "") : undefined,
                                text: step.dialoge?.text || "",
                                icon: character?.icon,
                                choices: step.choices,
                                inputValue: step.inputValue,
                            }
                        })
                        .map((data, index) => {
                            return <React.Fragment key={"history" + index}>
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                >
                                    <Avatar
                                        size="sm"
                                        src={data.icon}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        {data.character && data.character}
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
                                                    color="success"
                                                    endDecorator={<CheckIcon />}
                                                    style={{
                                                        display: "inline-block",
                                                        padding: "0 25px",
                                                        height: "50px",
                                                        fontSize: "16px",
                                                        lineHeight: "50px",
                                                        borderRadius: "25px",
                                                        backgroundColor: "#f1f1f1",
                                                    }}
                                                >
                                                    {choice.text}
                                                </div>
                                            }
                                            return <Chip
                                                key={"choices" + index}
                                                color="primary"

                                            >
                                                {choice.text}
                                            </Chip>
                                        })}
                                        {data.inputValue && <Chip
                                            key={"choices-success" + index}
                                            color="neutral"
                                        >
                                            {data.inputValue.toString()}
                                        </Chip>}
                                    </Box>
                                </Stack>
                            </React.Fragment>
                        })}
                </Stack>
            </Box>
        </dialog>
    );
}
