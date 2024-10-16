import { narration, newLabel, pixivnTestStartLabel } from "@drincs/pixi-vn"

export const startLabel = newLabel("start_label",
    [
        (props) => narration.jumpLabel(pixivnTestStartLabel, props),
    ],
)
