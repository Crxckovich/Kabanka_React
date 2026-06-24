import { createRoot } from "react-dom/client"
import "./app/styles/index.css"
import App from "./app/App.tsx"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@/app/providers/ThemeProvider/ThemeProvider.tsx"
import StoreProvider from "./app/providers/StoreProvider/StoreProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StoreProvider>
)
