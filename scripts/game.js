 function update_messages(humanMove, computerMove, result)
{
    let resultMessage = document.querySelector('.js-moves-area');
    resultMessage.innerHTML = 
    `<img class="js-player-move player-move" src="images/${humanMove}-emoji.png" alt="${humanMove} emoji">
    <p>x</p>
    <img class="js-computer-move computer-move" src="images/${computerMove}-emoji.png" alt="${computerMove} emoji">
    <p>=</p>
    <img src="images/${result}-emoji.png" alt="${result} emoji">`;

    resultMessage.classList.add('moves-area');
}

function update_score()
{
    let wins = document.querySelector('.js-score-wins');
    let ties = document.querySelector('.js-score-ties');
    let losses = document.querySelector('.js-score-losses');

    wins.innerHTML = score.wins;
    ties.innerHTML = score.ties;
    losses.innerHTML = score.losses;
}

function reset_score()
{
    score.wins = 0;
    score.ties = 0;
    score.losses = 0;

    localStorage.setItem('score', JSON.stringify(score));

    update_score();

    /* Clean messages */
    let resultMessage = document.querySelector('.js-moves-area');
    resultMessage.innerHTML = '';

    resultMessage.classList.remove('moves-area');
}


function play(move)
{
    /* COMPUTER MOVE */
    let result = '';
    let computer = '';
    let random = Math.random();

    if (random < 1 / 3)
    {
        computer = 'rock'; 
    }
    else if (random < 2 / 3)
    {
        computer = 'paper';
    }
    else
    {
        computer = 'scissors';
    }


    /* COMPARASION */
    if (move === 'rock')
    {
        if (computer === 'rock')
        {
            result = 'tie';
        }
        else if (computer === 'paper')
        {
            result = 'loss';
        }
        else
        {
            result = 'win';
        }
    }
    else if (move === 'paper')
    {
        if (computer === 'rock')
        {
            result = 'win';
        }
        else if (computer === 'paper')
        {
            result = 'tie';
        }
        else
        {
            result = 'loss';
        }
    }
    else if (move === 'scissors')
    {
        if (computer === 'rock')
        {
            result = 'loss';
        }
        else if (computer === 'paper')
        {
            result = 'win';
        }
        else
        {
            result = 'tie';
        }
    }

    /* UPDATE */
    if (result === 'win')
    {
        score.wins++;
    }
    else if (result === 'loss')
    {
        score.losses++;
    }
    else if (result === 'tie')
    {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    update_messages(move, computer, result);
    update_score();
}

/* When load the page*/
let score = JSON.parse(localStorage.getItem('score'));

if (score === null) 
{
    score = {wins: 0, losses: 0, ties: 0};
}

update_score();