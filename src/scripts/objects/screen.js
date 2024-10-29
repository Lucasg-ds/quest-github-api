const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="User profile picture"/>
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado ❌'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada ❌'}</p>
                                            <h2>👤 Seguidores</h2>
                                            <span>${user.followers}</span>
                                            <h2>👥 Seguindo</h2>
                                            <span>${user.following}</span>
                                        </div>
                                     </div>`;

        let repositoriesItens = '';
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blank">${repo.name}
                                                                        <br>
                                                                        <span>🍴 ${repo.forks_count}</span>
                                                                        <span>⭐ ${repo.stargazers_count}</span>
                                                                        <span>👀 ${repo.watchers_count}</span>
                                                                        <span>👨‍💻 ${repo.language}</span>
                                                                    </a>
                                                                </li>`);
                                                                                                                              
        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`;
        }

        let eventsItens = '';
        user.events.forEach(event => {
            if (event.payload.commits && event.payload.commits.length > 0) {
                eventsItens += `<li><h3>${event.repo.name}</h3><p>- ${event.payload.commits[0].message}</p></li>`;
            } else {
                eventsItens += `<li><h3>${event.repo.name}</h3><p>- Sem mensagem de commit</p></li>`;
            }
        });

        this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`;
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
    }
};

export { screen };