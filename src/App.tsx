import {AppProvider} from "@/providers/app";
import {AppRoutes} from "@/routes";
import { App as Antd } from 'antd';

function App() {
  return (

    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App; 