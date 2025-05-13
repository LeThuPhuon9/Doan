import { ThemeProvider } from '@material-ui/core/styles';
import Navigation from 'components/Navigation';
import SpeedDials from 'components/SpeedDial';
import GlobalLoading from 'components/UI/GlobalLoading';
import Message from 'components/UI/Message';
import routerConfig from 'configs/routerConfig';
import theme from 'configs/theme';
import NotFoundPage from 'pages/NotFound';
import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Element } from 'react-scroll';
import { getUserInfo } from 'redux/slices/userInfo.slice';
import Home from 'components/Home';
import WordApproval from 'components/Admin/WordApproval';
import WordManagement from 'components/Admin/WordManagement';
import { ROUTES } from 'constant';
import ProtectedAdminRoute from 'components/ProtectedAdminRoute';
import AdminDashboard from 'components/Admin';

const { routes, renderRoutes } = routerConfig;

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(getUserInfo());
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <GlobalLoading />
      ) : (
        <ThemeProvider theme={theme}>
          <Router>
            <div className="dynonary-app">
              <Element name="scrollTop" />
              <Navigation />

              <Suspense fallback={<GlobalLoading />}>
                <Switch>
                  <Route exact path="/">
                    {isAuth ? renderRoutes(routes, isAuth) : <Redirect to="/home" />}
                  </Route>
                  <Route exact path="/home">
                    {isAuth ? <Redirect to="/" /> : <Home />}
                  </Route>
                  <ProtectedAdminRoute path="/admin" exact component={AdminDashboard} />
                  <ProtectedAdminRoute path="/admin/word-approval" component={WordApproval} />
                  <ProtectedAdminRoute path="/admin/word-management" component={WordManagement} />
                  {renderRoutes(routes, isAuth)}
                  <Route>
                    <NotFoundPage />
                  </Route>
                </Switch>
              </Suspense>

              <div id="_overlay"></div>
              <Message />
              <SpeedDials />
            </div>
          </Router>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
