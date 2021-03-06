const express = require('express');
const mysql = require('mysql');


const routes = require('./routes')
const config = require('./config.json')
const cors = require('cors');


const app = express();
app.use(cors({
    origin: '*'
}));

// Route 1 - register as GET
app.get('/hello', routes.hello)

// Route 2 - register as GET
app.get('/jersey/:choice', routes.jersey)

// Route 3 - register as GET
app.get('/matches/:league', routes.all_matches)

// Route 3b - register as GET
app.get('/stats/:player', routes.all_stats)

// ------------------------
app.get('/statsMatches/teams', routes.all_matches_stats)

app.get('/scorers/', routes.all_best_scorers)

app.get('/worldCupGoals/', routes.all_worldcup_goals)
// ------------------------

// Route 3c - register as GET
app.get('/playerNames', routes.all_playerNames)

// Route 4 - register as GET
app.get('/players', routes.all_players)

// Route 5 - register as GET
app.get('/match', routes.match)

// Route 5c - register as GET
app.get('/matchStats', routes.matchStats)

// Route 5b - register as GET
app.get('/stat', routes.match)

// Route 6 - register as GET
app.get('/player', routes.player)

// Route 7 - register as GET
app.get('/search/matches', routes.search_matches)

// Route 8 - register as GET
app.get('/search/players', routes.search_players)

// Route
app.get('/statAnalysis/reg', routes.wage_somevar)

// Route
app.get('/statAnalysis/rank', routes.rank_and_player)

// Route
app.get('/statAnalysis/avgGoal', routes.avg_goal_per_match)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;