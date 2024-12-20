import { canvas, clearAllGameDatas, narration } from '@drincs/pixi-vn'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { startLabel } from './labels/startLabel'
import { INTERFACE_DATA_USE_QUEY_KEY } from './use_query/useQueryInterface'

// Canvas setup with PIXI
const body = document.body
if (!body) {
    throw new Error('body element not found')
}

canvas.initialize(body, 720, 480, {
    backgroundColor: "#303030"
}).then(() => {
    // React setup with ReactDOM
    const root = document.getElementById('root')
    if (!root) {
        throw new Error('root element not found')
    }

    canvas.initializeHTMLLayout(root)
    if (!canvas.htmlLayout) {
        throw new Error('htmlLayout not found')
    }
    const reactRoot = createRoot(canvas.htmlLayout)
    const queryClient = new QueryClient()

    narration.onGameEnd = async () => {
        clearAllGameDatas()
        await narration.jumpLabel(startLabel, {})
    }

    narration.callLabel(startLabel, {})
        .then(() => queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] }))

    reactRoot.render(
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    )
})
