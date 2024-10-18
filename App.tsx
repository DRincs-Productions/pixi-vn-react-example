import BackButton from "./components/BackButton";
import NextButton from "./components/NextButton";
import TextInput from "./screens/modals/TextInput";
import NarrationScreen from "./screens/NarrationScreen";

export default function App() {
    return (
        <>
            <NarrationScreen />
            <TextInput />
            <NextButton />
            <BackButton />
        </>
    )
}
