import { canvas, ChoiceMenuOption, narration, newLabel, showImage, Assets } from "@drincs/pixi-vn"

export const startLabel = newLabel("start_label",
    [
        async () => {
            narration.choiceMenuOptions = [
                new ChoiceMenuOption("Helmlok", helmlokLabel, {}),
                new ChoiceMenuOption("Skully", skullyLabel, {}),
            ]
        },
        (props) => narration.jumpLabel("start_label", props),
    ],
    {
        onLoadStep: async () => {
            Assets.load('https://pixijs.com/assets/skully.png')
            Assets.load('https://pixijs.com/assets/helmlok.png')
        }
    }
)

const helmlokLabel = newLabel("helmlok_label",
    [
        async (props) => {
            canvas.clear()
            await showImage('skully', 'https://pixijs.com/assets/skully.png')
            narration.jumpLabel(startLabel, props)
        },
    ]
)

const skullyLabel = newLabel("skully_label",
    [
        async (props) => {
            canvas.clear()
            await showImage('helmlok', 'https://pixijs.com/assets/helmlok.png')
            narration.jumpLabel(startLabel, props)
        },
    ]
)