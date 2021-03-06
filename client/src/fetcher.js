import config from './config.json'

const getAllMatches = async (page, pagesize, league) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/matches/${league}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllStats = async (page, pagesize, player) => {
    //{player = 'lionel messi'}
    var res = await fetch(`http://${config.server_host}:${config.server_port}/stats/${player}?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllMatchesStats = async (page, pagesize, team_home, team_away) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/statsMatches/teams?home=${team_home}&away=${team_away}&page=${page}&pagesize=${pagesize}`, {
            method: 'GET',
    })
    return res.json()
}

const getBestScorers = async (page, pagesize, team) => {

    var res = await fetch(`http://${config.server_host}:${config.server_port}/scorers?team=${team}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getWorldCupGoals = async (page, pagesize, team) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/worldCupGoals?team=${team}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayerNames = async (page, pagesize, year) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playerNames?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getAllPlayers = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/players?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatch = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/match?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatchStats = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/matchStats`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayer = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/player?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}

const getMatchSearch = async (home, away, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/matches?Home=${home}&Away=${away}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getPlayerSearch = async (name, nationality, club, rating_high, rating_low, pot_high, pot_low, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/players?Name=${name}&Nationality=${nationality}&Club=${club}&RatingLow=${rating_low}&RatingHigh=${rating_high}&PotentialHigh=${pot_high}&PotentialLow=${pot_low}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const getWageSomeVar = async (someVar) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/statAnalysis/reg?SomeVar=${someVar}`, {
        method: 'GET',
    })
    return res.json()
}

const getRankAndPlayer = async (rank) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/statAnalysis/rank?rank=${rank}`, {
        method: 'GET',
    })
    return res.json()
}

const getAvgGoalPerMatch = async (rank) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/statAnalysis/avgGoal`, {
        method: 'GET',
    })
    return res.json()
}

export {
    getAllMatches,
    getAllStats,
    getAllMatchesStats,
    getBestScorers,
    getWorldCupGoals,
    getPlayerNames,
    getAllPlayers,
    getMatch,
    getMatchStats,
    getPlayer,
    getMatchSearch,
    getPlayerSearch,
    getWageSomeVar,
    getRankAndPlayer,
    getAvgGoalPerMatch
}