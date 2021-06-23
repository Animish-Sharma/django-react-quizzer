import './App.scss';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import Layout from './hocs/Layout';
import { Provider } from 'react-redux'
import store from './store';
import Home from './containers/Home';
import Login from './containers/Auth/Login';
import Logout from './containers/Auth/Logout';
import Register from './containers/Auth/Register';
import Profile from './containers/Quiz/Profile';
import Tests from './containers/Quiz/Tests';
import TestDetail from './containers/Quiz/TestDetail';
import ResultDetail from './containers/Quiz/ResultDetail';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/logout" component={Logout}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/tests" component={Tests}/>
            <Route exact path="/test/:slug" component={TestDetail}/>
            <Route exact path="/result/:id" component={ResultDetail}/>
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
