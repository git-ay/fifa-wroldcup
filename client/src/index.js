import React from 'react';

import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import PlayersPage from './pages/PlayersPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import MatchesPage from './pages/MatchesPage';
import IntroPage from "./pages/IntroPage";
import TeamPage from "./pages/TeamPage";
import StatAnalysisPage from "./pages/StatAnalysisPage";

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
        <Route exact
							path="/players"
							render={() => (
								<PlayersPage />
							)}/>

        <Route exact
							path="/matches"
							render={() => (
								<MatchesPage />
							)}/>

		<Route exact		path="/IntroPage"
			   				render={() => (
				   				<IntroPage />
			   				)}/>
		<Route exact		path="/statAnalysis"
			   				render={() => (
				   				<StatAnalysisPage />
			   				)}/>							   

		  <Route exact		path="/TeamPage"
				 			render={() => (
					 			<TeamPage />
				 			)}/>

      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

