let playerName = '';

const states = {
    start: {
        text: (name) => `Hello ${name}, welcome to the adventure!`,
        choices: [
            { text: 'Enter the Mysterious Cave', action: 'caveEntrance' },
            { text: 'Turn Back', action: 'quitGame' }
        ]
    },
    caveEntrance: {
        text: 'You enter a dimly lit cave. You hear strange noises echoing from deep within. Two paths lie ahead.',
        choices: [
            { text: 'Take the Left Path', action: 'waterfall' },
            { text: 'Take the Right Path', action: 'treasureRoom' }
        ]
    },
    waterfall: {
        text: 'You find a glowing lake. A mystical creature asks: "What has keys but opens no locks?"',
        choices: [
            { text: 'A Piano', action: 'magicDoor' },
            { text: 'A Treasure Chest', action: 'gameOver' }
        ]
    },
    treasureRoom: {
        text: 'You discover a golden door. To enter, solve: "The more you take, the more you leave behind. What am I?"',
        choices: [
            { text: 'Footsteps', action: 'dragonLair' },
            { text: 'Gold Coins', action: 'gameOver' }
        ]
    },
    magicDoor: {
        text: 'A hidden portal appears. A wizard asks: "Would you rather have Knowledge or Power?"',
        choices: [
            { text: 'Knowledge', action: 'wisdom' },
            { text: 'Power', action: 'darkPath' }
        ]
    },
    wisdom: {
        text: 'The wizard grants you infinite wisdom. You become a legendary hero!',
        choices: [{ text: 'Play Again', action: 'restartGame' }]
    },
    darkPath: {
        text: 'You gain immense power, but it corrupts you. You become the villain of this world.',
        choices: [{ text: 'Play Again', action: 'restartGame' }]
    },
    dragonLair: {
        text: 'You stumble upon a sleeping dragon. Do you fight or sneak past?',
        choices: [
            { text: 'Fight', action: 'gameOver' },
            { text: 'Sneak Past', action: 'victory' }
        ]
    },
    victory: {
        text: 'You escape the dragon’s lair and find a kingdom awaiting your leadership!',
        choices: [{ text: 'Play Again', action: 'restartGame' }]
    },
    gameOver: {
        text: 'You failed your journey. Try again!',
        choices: [{ text: 'Play Again', action: 'restartGame' }]
    }
};

function startGame() {
    playerName = document.getElementById('playerName').value.trim() || 'Stranger';
    document.getElementById('nameInput').style.display = 'none';
    showState('start');
}

function showState(stateKey) {
    if (!states[stateKey]) {
        document.getElementById('story').textContent = 'Oops! Something went wrong.';
        document.getElementById('choices').innerHTML = '<button onclick="restartGame()">Restart</button>';
        return;
    }

    let currentState = states[stateKey];
    document.getElementById('story').innerHTML = typeof currentState.text === 'function' 
        ? currentState.text(playerName) 
        : currentState.text;

    const choicesElement = document.getElementById('choices');
    choicesElement.innerHTML = '';

    currentState.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => showState(choice.action);
        choicesElement.appendChild(button);
    });
}

function quitGame() {
    document.getElementById('story').textContent = 'Maybe next time!';
    document.getElementById('choices').innerHTML = '';
    document.getElementById('nameInput').style.display = 'flex';
    document.getElementById('playerName').value = '';
    playerName = '';
}

function restartGame() {
    document.getElementById('nameInput').style.display = 'flex';
    document.getElementById('playerName').value = '';
    document.getElementById('story').textContent = '';
    document.getElementById('choices').innerHTML = '';
    playerName = '';
}
