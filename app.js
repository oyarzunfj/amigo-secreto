const participantNameInput = document.getElementById('participant-name');
const addParticipantButton = document.getElementById('add-participant');
const participantsList = document.getElementById('participants-list');
const startRaffleButton = document.getElementById('start-raffle');
const resultsDiv = document.getElementById('results');

let participants = [];

addParticipantButton.addEventListener('click', () => {
    const name = participantNameInput.value.trim();
    if (name) {
        participants.push(name);
        const li = document.createElement('li');
        li.textContent = name;
        participantsList.appendChild(li);
        participantNameInput.value = '';
    }
});

startRaffleButton.addEventListener('click', () => {
    if (participants.length < 2) {
        alert('Se necesitan al menos 2 participantes.');
        return;
    }

    const shuffledParticipants = shuffleArray(participants.slice());
    const results = {};

    for (let i = 0; i < participants.length; i++) {
        const giver = participants[i];
        const receiver = shuffledParticipants[i];
        results[giver] = receiver;
    }

    displayResults(results);
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayResults(results) {
    resultsDiv.innerHTML = '';
    for (const giver in results) {
        const receiver = results[giver];
        const p = document.createElement('p');
        p.textContent = `${giver} le regala a ${receiver}`;
        resultsDiv.appendChild(p);
    }
}