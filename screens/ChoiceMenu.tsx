import { ChoiceMenuOption, ChoiceMenuOptionClose, narration } from '@drincs/pixi-vn';
import { Grid } from '@mui/system';
import { useQueryClient } from '@tanstack/react-query';
import { INTERFACE_DATA_USE_QUEY_KEY, useQueryChoiceMenuOptions } from '../use_query/useQueryInterface';

export default function ChoiceMenu() {
    const { data: menu = [] } = useQueryChoiceMenuOptions()
    const queryClient = useQueryClient()

    function afterSelectChoice(item: ChoiceMenuOptionClose | ChoiceMenuOption<{}>) {
        narration.selectChoice(item, {})
            .then(() => queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] }))
            .catch((e) => console.error(e))
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{
                width: '100%',
                height: "100%",
                overflow: 'auto',
                gap: 1,
                pointerEvents: "auto",
            }}
        >
            {menu?.map((item, index) => {
                return (
                    <Grid
                        key={"choice-" + index}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <button
                            onClick={() => afterSelectChoice(item)}
                        >
                            {item.text}
                        </button>
                    </Grid>
                )
            })}
        </Grid>
    );
}