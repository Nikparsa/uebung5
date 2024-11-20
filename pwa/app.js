document.addEventListener('DOMContentLoaded', () => {
    const tabs = {
        home: document.getElementById('homeSection'),
        challenges: document.getElementById('challengesSection'),
        profile: document.getElementById('profileSection'),
    };

    const switchTab = (tabName) => {
        Object.values(tabs).forEach(section => section.classList.remove('active'));
        tabs[tabName].classList.add('active');
    };

    document.getElementById('homeTab').addEventListener('click', () => switchTab('home'));
    document.getElementById('challengesTab').addEventListener('click', () => {
        loadChallenges();
        switchTab('challenges');
    });
    document.getElementById('profileTab').addEventListener('click', () => switchTab('profile'));

    const loadChallenges = () => {
        fetch('challenges.json')
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('challengeContainer');
                container.innerHTML = '';
                data.challenges.forEach(challenge => {
                    const div = document.createElement('div');
                    div.classList.add('challenge-item');
                    div.innerHTML = `
                        <h3>${challenge.question}</h3>
                        <button onclick="handleChallenge('${challenge.answer}')">Attempt</button>
                    `;
                    container.appendChild(div);
                });
            });
    };

    window.handleChallenge = (answer) => {
        const userAnswer = prompt('Enter your answer:');
        if (userAnswer && userAnswer.toLowerCase() === answer.toLowerCase()) {
            alert('Correct! Challenge completed!');
        } else {
            alert('Incorrect answer. Try again.');
        }
    };
});
