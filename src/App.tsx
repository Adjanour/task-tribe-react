import {AppProvider} from "@/providers/app";
import {AppRoutes} from "@/routes";
import { App as Antd } from 'antd';

function App() {
  return (
    <Antd>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Antd>
  );
}

export default App; 