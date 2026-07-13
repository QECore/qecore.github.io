import { BrowserRouter as Router } from "react-router-dom";
import { HeaderProvider } from "@/lib/HeaderContext";
import { AppProviders } from "@/app/providers";
import { AppRouter } from "@/app/router";

function App() {
  return (
    <AppProviders>
      <Router>
        <HeaderProvider>
          <AppRouter />
        </HeaderProvider>
      </Router>
    </AppProviders>
  );
}

export default App;
