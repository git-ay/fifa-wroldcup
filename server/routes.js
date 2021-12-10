const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the FIFA server!`)
    } else {
        res.send(`Hello! Welcome to the FIFA server!`)
    }
}



// ********************************************
//                  WARM UP 
// ********************************************

// Route 2 (handler)
async function jersey(req, res) {
    const colors = ['red', 'blue', 'white']
    const jersey_number = Math.floor(Math.random() * 20) + 1
    const name = req.query.name ? req.query.name : "player"

    if (req.params.choice === 'number') {
        // TODO: TASK 1: inspect for issues and correct 
        res.json({ message: `Hello, ${name}!`, jersey_number: jersey_number })
    } else if (req.params.choice === 'color') {
        var lucky_color_index = Math.floor(Math.random() * 2) + 1;
        // TODO: TASK 2: change this or any variables above to return only 'red' or 'blue' at random (go Quakers!)
        res.json({ message: `Hello, ${name}!`, jersey_color: colors[lucky_color_index-1] })
    } else {
        // TODO: TASK 3: inspect for issues and correct
        res.json({ message: `Hello, ${name}, we like your jersey!` })
    }
}

// ********************************************
//               GENERAL ROUTES
// ********************************************


// Route 3 (handler)
async function all_matches(req, res) {
    const league = req.params.league ? req.params.league : 'D1'

     if (req.query.page && !isNaN(req.query.page)) {
        pag = req.query.page
        pag_size = req.query.pagesize
        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
        FROM Matches 
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam
        LIMIT ${pag}, ${pag_size}`, function (error, results, fields)
        {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    } else {
        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
        FROM Matches 
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}


// Route 4 (handler)
async function all_players(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const offset = (page * pagesize) - pagesize
        connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating , Potential, Club, Value  
        FROM Players 
        LIMIT ${pagesize} OFFSET ${offset}`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    } else {
        connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating , Potential, Club, Value  
        FROM Players`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }


}
//------- 4b exp ------

async function all_stats(req, res) {
    const player = req.params.player ? req.params.player : 'cristiano ronaldo'

    if (req.query.page && !isNaN(req.query.page)) {
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const offset = (page * pagesize) - pagesize
        connection.query(`WITH CTE
        AS(
        Select player, EM.date,
           SUM(CASE WHEN is_goal = 1 THEN 1 ELSE 0 END) AS Goals,
           SUM(CASE WHEN event_type = 4 THEN 1 ELSE 0 END) AS Yellow_Cards,
           SUM(CASE WHEN event_type = 5 or event_type = 6 THEN 1 ELSE 0 END) AS Red_Cards
        From events inner join events_metadata as EM on events.id_odsp=EM.id_odsp
        GROUP BY player)
        Select player, sum(Goals) as Goals,  sum(Yellow_Cards) as Yellow_Cards, sum(Red_Cards) as Red_Cards
        From CTE
        Where date>= 2012-01-01 and date<= 2017-01-01 and player='${player}'`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    } else {
        connection.query(`WITH CTE
        AS(
        Select player, EM.date,
           SUM(CASE WHEN is_goal = 1 THEN 1 ELSE 0 END) AS Goals,
           SUM(CASE WHEN event_type = 4 THEN 1 ELSE 0 END) AS Yellow_Cards,
           SUM(CASE WHEN event_type = 5 or event_type = 6 THEN 1 ELSE 0 END) AS Red_Cards
        From events inner join events_metadata as EM on events.id_odsp=EM.id_odsp
        GROUP BY player)
        Select player, sum(Goals) as Goals,  sum(Yellow_Cards) as Yellow_Cards, sum(Red_Cards) as Red_Cards
        From CTE
        Where date>= 2012-01-01 and date<= 2017-01-01 and player='${player}'`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }


}
//---------------------

async function all_matches_stats(req, res) {
    const team_home = req.query.home ? req.query.home : 'Brazil'
    const team_away = req.query.away ? req.query.away : 'England'

    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const offset = (page * pagesize) - pagesize
        connection.query(`Select year, Datetime, stage, stadium, Home_Team_Name, Away_Team_Name, home_team_goals, away_team_goals, Attendance
        From WorldCupMatches
        Where (Home_Team_Name = '${team_home}' and Away_Team_Name = '${team_away}') or (Home_Team_Name = '${team_away}' and Away_Team_Name = '${team_home}')
        Order by year asc;`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    } else {
        connection.query(`Select year, Datetime, stage, stadium, Home_Team_Name, Away_Team_Name, home_team_goals, away_team_goals, Attendance
        From WorldCupMatches
        Where (Home_Team_Name = '${team_home}' and Away_Team_Name = '${team_away}') or (Home_Team_Name = '${team_away}' and Away_Team_Name = '${team_home}')
        Order by year asc;`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }


}
//-------------------
async function all_best_scorers(req, res) {

    const team = req.query.team ? req.query.team : 'Spain'
    if (req.query.page && !isNaN(req.query.page)) {
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const offset = (page * pagesize) - pagesize
        connection.query(`
        WITH distinct_matches AS (
            SELECT DISTINCT MatchID, WCP.Player_Name, WCS.Team_Name, Shirt_Number,
            Sum(length(WCP.event) - length(replace(WCP.event, 'G','')) + length(WCP.event) - length(replace(WCP.event, 'P',''))) as Goals_Count
            From WorldCupPlayers as WCP JOIN WorldCupStates WCS on WCP.Team_Initials = WCS.Team_Initials
                WHERE WCS.Team_Name = '${team}'
                Group By MatchID, WCP.Player_Name, WCS.Team_Name
                ORDER BY Goals_Count DESC)
        SELECT Player_Name, SUM(Goals_Count) AS Goals
        FROM distinct_matches
        GROUP BY Player_Name, Team_Name
        ORDER BY SUM(Goals_Count) DESC
        LIMIT 10;`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    } else {
        connection.query(`WITH distinct_matches AS (
            SELECT DISTINCT MatchID, WCP.Player_Name, WCS.Team_Name, Shirt_Number,
            Sum(length(WCP.event) - length(replace(WCP.event, 'G','')) + length(WCP.event) - length(replace(WCP.event, 'P',''))) as Goals_Count
            From WorldCupPlayers as WCP JOIN WorldCupStates WCS on WCP.Team_Initials = WCS.Team_Initials
                WHERE WCS.Team_Name = '${team}'
                Group By MatchID, WCP.Player_Name, WCS.Team_Name
                ORDER BY Goals_Count DESC)
        SELECT Player_Name, SUM(Goals_Count) AS Goals
        FROM distinct_matches
        GROUP BY Player_Name, Team_Name
        ORDER BY SUM(Goals_Count) DESC
        LIMIT 10;`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }


}


async function all_worldcup_goals(req, res) {
    const team = req.query.team ? req.query.team : 'Spain'
    console.log("Team:", team)
    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const offset = (page * pagesize) - pagesize
        connection.query(`WITH total_goals AS (
                WITH Home AS (
                    SELECT Home_Team_Name AS Team, Year, SUM(Home_Team_Goals) AS Goals
                    FROM WorldCupMatches
                    Where Home_Team_Name = '${team}'
                    GROUP BY Year)
                SELECT Home.Team, Home.Goals, Year
                FROM Home
                UNION
                (
                    WITH Away AS (
                        SELECT Away_Team_Name AS Team, Year, SUM(Away_Team_Goals) AS Goals
                        FROM WorldCupMatches
                        Where Away_Team_Name = '${team}'
                        GROUP BY Year)
                    SELECT Away.Team, Away.Goals, Year
                    FROM Away
                    GROUP BY Year)
            )
            SELECT total_goals.Team AS Team, Sum(total_goals.Goals) AS Goals, total_goals.Year
            FROM total_goals
            GROUP BY total_goals.Year
            ORDER BY Year DESC
            LIMIT 5;`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    } else {
            connection.query(`WITH total_goals AS (
            WITH Home AS (
                SELECT Home_Team_Name AS Team, Year, SUM(Home_Team_Goals) AS Goals
                FROM WorldCupMatches
                Where Home_Team_Name = '${team}'
                GROUP BY Year)
            SELECT Home.Team, Home.Goals, Year
            FROM Home
            UNION
            (
                WITH Away AS (
                    SELECT Away_Team_Name AS Team, Year, SUM(Away_Team_Goals) AS Goals
                    FROM WorldCupMatches
                    Where Away_Team_Name = '${team}'
                    GROUP BY Year)
                SELECT Away.Team, Away.Goals, Year
                FROM Away
                GROUP BY Year)
        )
        SELECT total_goals.Team AS Team, Sum(total_goals.Goals) AS Goals, total_goals.Year
        FROM total_goals
        GROUP BY total_goals.Year
        ORDER BY Year DESC
        LIMIT 5;`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }


}





//-------------------
async function all_playerNames(req, res) {
    // TODO: TASK 5: implement and test, potentially writing your own (ungraded) tests
    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        // The SQL schema has the attribute OverallRating, but modify it to match spec!
        // TODO: query and return results here:
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        const offset = (page * pagesize) - pagesize
        // console.log(pagesize)
        connection.query(`SELECT distinct Player_Name from WorldCupPlayers`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

    } else {
        // The SQL schema has the attribute OverallRating, but modify it to match spec!
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`SELECT distinct Player_Name from WorldCupPlayers`, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }


}

// ********************************************
//             MATCH-SPECIFIC ROUTES
// ********************************************

// Route 5 (handler)
async function match(req, res) {
    // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests
    const id = req.query.id

    if (id && !isNaN(id)) {
        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away,FullTimeGoalsH AS HomeGoals,FullTimeGoalsA AS AwayGoals,HalfTimeGoalsH AS HTHomeGoals,HalfTimeGoalsA AS HTAwayGoals, ShotsH AS ShotsHome,ShotsA AS ShotsAway,ShotsOnTargetH AS ShotsOnTargetHome, ShotsOnTargetA AS ShotsOnTargetAway,
        FoulsH AS FoulsHome, FoulsA AS FoulsAway, CornersH AS CornersHome,CornersA AS CornersAway,YellowCardsH AS YCHome,YellowCardsA AS YCAway,RedCardsH AS RCHome, RedCardsA AS RCAway 
        FROM Matches
        WHERE MatchId = ${id}`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else {
        res.json({ error: "match_id isn't a number" })
    }

}

async function matchStats(req, res) {

        connection.query(`Select Home_Team_Name, Away_Team_Name, Half_time_Home_Goals, Half_time_Away_Goals, Home_Team_Goals, Away_Team_Goals, Year, Stadium, Stage, Referee
        from WorldCupMatches
        Where (Home_Team_Name = 'England' and Away_Team_Name = 'Brazil') or (Home_Team_Name = 'England' and Away_Team_Name = 'Brazil')
        ORDER BY Year DESC
        limit 1`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });

}

// ********************************************
//            PLAYER-SPECIFIC ROUTES
// ********************************************

// Route 6 (handler)
async function player(req, res) {
    // TODO: TASK 7: implement and test, potentially writing your own (ungraded) tests
    const id = req.query.id
    if (id && !isNaN(id)) {
        connection.query(`SELECT PlayerId , Name , Age, Photo , Nationality, Flag ,OverallRating AS Rating , Potential, Club , ClubLogo  ,
        Value , Wage , InternationalReputation, Skill , JerseyNumber, ContractValidUntil , Height , Weight , BestPosition ,
        BestOverallRating , ReleaseClause 
        FROM Players
        WHERE PlayerId = ${id}`, function (error, results, fields) {
            if (error) {
                console.log(error)
                return res.json({ error: error })
            } else if (results) {
                for (var i = 0; i < results.length; i++) {
                    if (results[i].BestPosition == 'GK') {

                        connection.query(`SELECT PlayerId , Name , Age, Photo , Nationality, Flag ,OverallRating AS Rating , Potential, Club , ClubLogo  ,
                        Value , Wage , InternationalReputation, Skill , JerseyNumber, ContractValidUntil , Height , Weight , BestPosition ,
                        BestOverallRating , NULLIF(ReleaseClause,'') AS ReleaseClause, GKPenalties , GKDiving ,
                        GKHandling , GKKicking , GKPositioning , GKReflexes
                        FROM Players
                        WHERE PlayerId = ${id}`, function (error, resultsGK, fields) {
                            if (error) {
                                console.log(error)
                                return res.json({ error: error })
                            } else if (resultsGK) {
                                return res.json({ results: resultsGK })
                            }
                        });

                    } else {
                        connection.query(`SELECT PlayerId , Name , Age, Photo , Nationality, Flag ,OverallRating AS Rating , Potential, Club , ClubLogo  ,
                        Value , Wage , InternationalReputation, Skill , JerseyNumber, ContractValidUntil , Height , Weight , BestPosition ,
                        BestOverallRating , NULLIF(ReleaseClause,'') AS ReleaseClause, NPassing ,
                        NBallControl , NAdjustedAgility , NStamina , NStrength, 
                        NPositioning 
                        FROM Players
                        WHERE PlayerId = ${id}`, function (error, resultsGK, fields) {
                            if (error) {
                                console.log(error)
                                return res.json({ error: error })
                            } else if (resultsGK) {
                                return res.json({ results: resultsGK })
                            }
                        });

                    }
                }
            }
        });
    } else {
        return res.json({ error: "player_id is not a number" })
    }
}


// ********************************************
//             SEARCH ROUTES
// ********************************************

// Route 7 (handler)
async function search_matches(req, res) {
    // TODO: TASK 8: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    const home = req.query.Home
    const away = req.query.Away

    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize : 10
    const offset = (page * pagesize) - pagesize
    if (req.query.page && !isNaN(req.query.page)) {
        // console.log(pagesize)
        if (home && away) {
            connection.query(`SELECT MatchId , Date , Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals,FullTimeGoalsA AS AwayGoals   
                FROM Matches
                WHERE HomeTeam LIKE '%${home}%' AND AwayTeam LIKE '%${away}%'
                ORDER BY HomeTeam, AwayTeam
                LIMIT ${pagesize} OFFSET ${offset}`, function (error, results, fields) {

                if (error) {
                    console.log(error)
                    return res.json({ error: error })
                } else if (results) {
                    return res.json({ results: results })
                }
            });
        }

    } else if (home && away) {

        connection.query(`SELECT MatchId , Date , Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals,FullTimeGoalsA AS AwayGoals   
        FROM Matches
        WHERE HomeTeam LIKE '%${home}%'  AND AwayTeam LIKE '%${away}%'
        ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {

            if (error) {
                console.log(error)
                return res.json({ error: error })
            } else if (results) {
                return res.json({ results: results })
            }
        });

    }else{

        return res.json({ error: "Not valid. Please enter home & away" })
    }

}


// Route 8 (handler)
async function search_players(req, res) {
    const Name = req.query.Name
    const Nationality = req.query.Nationality
    const Club = req.query.Club
    const RatingLow = req.query.RatingLow ? req.query.RatingLow : 0
    const RatingHigh = req.query.RatingHigh ? req.query.RatingHigh : 100
    const PotentialLow = req.query.PotentialLow ? req.query.PotentialLow : 0
    const PotentialHigh = req.query.PotentialHigh ? req.query.PotentialHigh : 100

    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize : 10
    const offset = (page * pagesize) - pagesize

    if (req.query.page && !isNaN(req.query.page)) {
        // console.log(pagesize)
        if (Name && Nationality && Club ) {
            connection.query(`SELECT PlayerId , Name , Nationality, OverallRating AS Rating , Potential , Club , Value     
            FROM Players
        WHERE NAME LIKE '%${NAME}%'  AND Nationality LIKE '%${Nationality}%' AND Club LIKE '%${Club}%'
        AND OverallRating >= ${RatingLow} AND OverallRating <= ${RatingHigh} AND Potential >= ${PotentialLow} AND Potential <= ${PotentialHigh}
        ORDER BY NAME`, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    return res.json({ error: error })
                } else if (results) {
                    return res.json({ results: results })
                }
            });
        }

    } else if (Name && Nationality && Club ) {

        connection.query(`SELECT PlayerId , Name , Nationality, OverallRating AS Rating , Potential , Club , Value     
        FROM Players
        WHERE NAME LIKE '%${Name}%'  AND Nationality LIKE '%${Nationality}%' AND Club LIKE '%${Club}%'
        AND OverallRating >= ${RatingLow} AND OverallRating <= ${RatingHigh} AND Potential >= ${PotentialLow} AND Potential <= ${PotentialHigh}
        ORDER BY NAME`, function (error, results, fields) {

            if (error) {
                console.log(error)
                return res.json({ error: error })
            } else if (results) {
                return res.json({ results: results })
            }
        });

    }else{

        return res.json({ error: "Not valid. Please enter home & away" })
    }
}


// Route
async function wage_somevar(req, res) {
    
    const SomeVar = req.query.SomeVar ? req.query.SomeVar : 'OverallRating'
    connection.query(`SELECT Wage, ${SomeVar} FROM Players`, function (error, results) {
        if (error) {
            console.log(error)
            return res.json({ error: error })
        } else if (results) {
            return res.json({ results: results })
        }
    } );
    
}

// Route
async function rank_and_player(req, res) {
    
    const rank = req.query.rank ? req.query.rank : 'Winner'

    connection.query(`
    WITH MatchEvents AS (
        SELECT M.Year AS year, W.Team_Name AS teamCtry, playerName, numEvents
        FROM (
            SELECT Year, teamInit, playerName, numEvents
            FROM
                (SELECT Year, MatchID AS mid FROM WorldCupMatches) MTCH
            LEFT OUTER JOIN
                (SELECT MatchID AS mid,
                        Team_Initials AS teamInit,
                        Player_Name AS playerName,
                        ROUND( LENGTH(Event) - LENGTH(REPLACE(Event, "'", "")) ) AS numEvents
                 FROM WorldCupPlayers
                 WHERE Event IS NOT NULL ) EVNT
            ON MTCH.mid = EVNT.mid ) M
        LEFT OUTER JOIN
            (SELECT * FROM WorldCupStates) W
        ON M.teamInit = W.Team_Initials
    )
    SELECT year, ${rank}, playerName AS playerWithMaxEvents, numEvents
    FROM (
        SELECT WC.year AS year,
               ${rank},
               ME.playerName,
               SUM(ME.numEvents) AS numEvents
        FROM (SELECT Year AS year, ${rank} FROM WorldCups) WC
        LEFT OUTER JOIN
             (SELECT * FROM MatchEvents) ME
        ON WC.year = ME.year
        WHERE WC.${rank} = ME.teamCtry
        GROUP BY WC.year, ME.teamCtry, ME.playerName
        ORDER BY WC.year, numEvents DESC
    ) F GROUP BY year;
    `, function (error, results) {
            if (error) {
                console.log(error)
                return res.json({ error: error })
            } else if (results) {
                return res.json({ results: results })
            }
    }
    );
}

// Route
async function avg_goal_per_match(req, res) {

    connection.query(`
    SELECT Ctry, sum(NumGoals)/sum(GoalCnt) AS AvgGoalPerMatch
    FROM (
        SELECT sum(Home_Team_Goals) AS NumGoals, count(Home_Team_Name) AS GoalCnt, Home_Team_Name AS Ctry FROM WorldCupMatches GROUP BY Home_Team_Name
        UNION ALL
        SELECT sum(Away_Team_Goals) AS NumGoals, count(Away_Team_Name) AS GoalCnt, Away_Team_Name AS Ctry FROM WorldCupMatches GROUP BY Away_Team_Name
    ) A
    GROUP BY Ctry;
    `, function (error, results) {
            if (error) {
                console.log(error)
                return res.json({ error: error })
            } else if (results) {
                return res.json({ results: results })
            }
    }
    );
}


module.exports = {
    hello,
    jersey,
    all_matches,
    all_stats,
    all_matches_stats,
    all_best_scorers,
    all_worldcup_goals,
    all_playerNames,
    all_players,
    match,
    matchStats,
    player,
    search_matches,
    search_players,
    wage_somevar,
    rank_and_player,
    avg_goal_per_match
}
