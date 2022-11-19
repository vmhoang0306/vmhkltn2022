import { useCallback, useState } from "react";
import { Route, Switch } from "react-router";
import { PAGE_URL } from "./constant/route";
import LoginPage from "./features/Login/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<any>(false);

  const login = useCallback((uid: any) => {
    setIsLoggedIn(true);
    setUsername(uid);
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUsername(null);
  }, [])

  const route = (
    <Switch>
      <Route path={PAGE_URL.LOGIN} exact>
        <LoginPage />
      </Route>
    </Switch>
  );


  return <LoginPage />;
}

export default App;
