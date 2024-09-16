let userData = null;

async function fetchUserData() 
{
    const username = document.getElementById('username').value;
    const url = `https://www.codewars.com/api/v1/users/${username}`;
    try {
        const response = await fetch(url);
        if (!response.ok) 
        {
            throw new Error('!!Felhasználó nem található!!');
        }
        userData = await response.json();
        document.getElementById('error').textContent = '';
        showTotalPoints();
    } catch (error) 
    {
        document.getElementById('content').innerHTML = '';
        document.getElementById('error').textContent = error.message;
    }
}

function showTotalPoints() 
{
    if (!userData) return;
    const totalPoints = userData.honor;
    document.getElementById('content').innerHTML = `
        <h2>Pontok összesítve</h2>
        <p>${userData.username} összesen ${totalPoints} pontot szerzett.</p>
    `;
}

function showLanguagePoints() 
{
    if (!userData) return;
    const languages = userData.ranks.languages;
    let content = '<h2>Pontok Nyelvek Szerint:</h2><ul>';
    for (const [language, data] of Object.entries(languages)) 
    {
        content += `<li>${language}: ${data.score} pont</li>`;
    }
    content += '</ul>';
    document.getElementById('content').innerHTML = content;
}
