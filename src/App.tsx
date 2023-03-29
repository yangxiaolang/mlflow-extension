import { ReactWidget } from '@jupyterlab/apputils';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
// import App from './experiment-tracking/components/App';
// import './App.css';

const Hello = () => {
  return (
    <>
      <h1>1</h1>
      <Link to="/2">click</Link>
    </>
  );
};

const World = () => {
  return (
    <>
      <h1>2</h1>
      <Link to="/">click</Link>
    </>
  );
};

export default ReactWidget.create(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Hello}></Route>
      <Route exact path="/2" component={World}></Route>
      <Route></Route>
    </Switch>
  </BrowserRouter>
);
