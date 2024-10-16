import { narration } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";

export const INTERFACE_DATA_USE_QUEY_KEY = "interface_data_use_quey_key";

const CHOICE_MENU_OPTIONS_USE_QUEY_KEY = "choice_menu_options_use_quey_key";
export function useQueryChoiceMenuOptions() {
 return useQuery({
  queryKey: [INTERFACE_DATA_USE_QUEY_KEY, CHOICE_MENU_OPTIONS_USE_QUEY_KEY],
  queryFn: () => {
   return narration.choiceMenuOptions || []
  },
 });
}