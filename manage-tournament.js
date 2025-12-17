
function loadManagePage() {

    // Generate the content 
    let pageContent =
        `<div class="container">
        <div class="card shadow">
            <div class="card-header">
                <div class="row">
                    <div class="col-7">Tournament: ${tournament["id"]}</div>
                    <div class="col-5 text-end">${tournament["date"]}</div>
                </div>
                <div class="row">
                    <div class="col">
                        <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addPlayerModal"><i class="bi bi-plus-circle"></i></button>
                    </div>
                    <div class="col text-center">
                        <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#genRoundsModal"><i class="bi bi-diagram-2"></i></button>
                        <button type="button" class="btn btn-outline-primary btn-sm" onclick="shufflePlayersList()"><i class="bi bi-shuffle"></i></button>
                    </div>
                    <div class="col text-end">
                        <button type="button" class="btn btn-outline-primary btn-sm" onclick="shrinkPlayersList()"><i class="bi bi-arrows-collapse"></i></button>
                    </div>
                </div>
            </div>
            <ul class="list-group list-group-flush" id="tournament-players-list" style="height: 413px; max-height: 413px; overflow-y: scroll">`
    tournament["players"].forEach((player, index) => {
        pageContent += `<li class="list-group-item">
            <div class="row">
                <div class="col-8">${player}</div>
                <div class="col-2">${index + 1}</div>
                <div class="btn-group col-1">
                    <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots-vertical"></i></button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" onclick="movePlayerUp(${index})">Move up</a></li>
                        <li><a class="dropdown-item" href="#" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" onclick="movePlayerDown(${index})">Move Down</a></li>
                        <li><a class="dropdown-item" href="#" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" onclick="deletePlayer(${index})">Delete</a></li>
                    </ul>
                </div>
            </div>
        </li>`;
    });
    pageContent += `</ul></div>
            
            <!-- Modal to add users -->
            <div class="modal fade" id="addPlayerModal" tabindex="-1" aria-labelledby="addPlayerModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="addPlayerModalLabel">Add player</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" id="newPlayerName" class="form-control" placeholder="Username" aria-label="Username">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onclick="addNewPlayer()" data-bs-dismiss="modal">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal to generate rounds -->
            <div class="modal fade" id="genRoundsModal" tabindex="-1" aria-labelledby="genRoundsModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="genRoundsModalLabel">Rounds generation</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p id="genRoundsText"> Generate rounds for this tournments will delete every other tournaments data. Do you want to proceed?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onclick="generateRounds()" data-bs-dismiss="modal">Generate</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    if (tournament["rounds"].length > 0) {    // If the rounds are already generated show them
        pageContent +=
            `<div class="container" id="rounds-list" style="padding-top: 20px;">
            <div class="card shadow">
                <div class="card-header">
                    <div class="row">
                        <div class="col">Rounds</div>
                    </div>
                </div>
                <ul class="list-group list-group-flush" id="tournament-rounds-list" style="height: 620px; max-height: 620px; overflow-y: scroll">`
        tournament["rounds"].forEach((round, r_ind) => {
            round.forEach((match, m_ind) => {
                pageContent += `<li class="list-group-item" data-match-id="${match["id"]}" data-bs-toggle="modal" data-bs-target="#editRoundResModal">
                    <p class="text-center" style="margin: 0px">${match["id"]}</p>
                    <p class="text-center" id="${match["id"]}-players">${match["player_a"]} - ${match["player_b"]}</p>
                    <p class="text-center" id="${match["id"]}-results" style="margin: 0px"> 0 - 0 </p>
                    </li>`;
            });
        });
        pageContent += `</ul></div>
            
            <!-- Modal -->
            <div class="modal fade" id="editRoundResModal" tabindex="-1" aria-labelledby="editRoundResModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="editRoundResModalLabel">Match </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h3 id="editRoundResModalValue" class="text-center"> - </h3>
                            <div class="input-group mb-3">
                            <input type="text" id="player-a-res" class="form-control" placeholder="score" aria-label="score-a">
                            <span class="input-group-text">-</span>
                            <input type="text" id="player-b-res" class="form-control" placeholder="score" aria-label="score-b">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onclick="saveMatchRes()" data-bs-dismiss="modal">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }

    let containerObj = document.createElement('div')
    containerObj.classList.add('container');
    containerObj.innerHTML = pageContent.trim();

    return containerObj
}

function drawPlayersList() {
    let playersList = document.getElementById("tournament-players-list");
    let len = playersList.childNodes.length;

    for (let i = 0; i < len; i++) {
        playersList.removeChild(playersList.childNodes[0]);
    }
    tournament["players"].forEach((player, index) => {
        let listObj = document.createElement('li')
        listObj.classList.add('list-group-item');
        let playerContent =
            `<div class="row">
                <div class="col-8">${player}</div>
                <div class="col-2">${index + 1}</div>
                <div class="btn-group col-1">
                    <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots-vertical"></i></button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" onclick="movePlayerUp(${index})">Move up</a></li>
                        <li><a class="dropdown-item" href="#" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" onclick="movePlayerDown(${index})">Move Down</a></li>
                        <li><a class="dropdown-item" href="#" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" onclick="deletePlayer(${index})">Delete</a></li>
                    </ul>
                </div>
            </div>`
        listObj.innerHTML = playerContent.trim();
        playersList.appendChild(listObj);
    });
}

function shrinkPlayersList() {
    if (document.getElementById("tournament-players-list").style.height === '0px') {
        document.getElementById("tournament-players-list").style.height = '413px';
    }
    else {
        document.getElementById("tournament-players-list").style.height = '0px';
    }
}

function shufflePlayersList() {

    for (let i = tournament["players"].length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tournament["players"][i], tournament["players"][j]] = [tournament["players"][j], tournament["players"][i]];
    }

    drawPlayersList();
}

function movePlayerUp(index) {
    if (index === 0) {
        return;
    }
    [tournament["players"][index], tournament["players"][index - 1]] = [tournament["players"][index - 1], tournament["players"][index]];

    drawPlayersList();
}

function movePlayerDown(index) {
    let len = tournament["players"].length;
    if (index === (len - 1)) {
        return;
    }
    [tournament["players"][index], tournament["players"][index + 1]] = [tournament["players"][index + 1], tournament["players"][index]];

    drawPlayersList();
}

function addNewPlayer() {
    let playerName = document.getElementById("newPlayerName").value;
    tournament["players"].push(playerName);
    document.getElementById("newPlayerName").value = ""

    drawPlayersList();
}

function deletePlayer(index) {
    tournament["players"].splice(index, 1);

    drawPlayersList();
}

function generateRounds() {

    if (tournament["type"] === "round-robin-single") {  // Use Berger algorithm for chess that is also verifiable by hand
        var totalPlayers = tournament["players"].length;
        var actualPlayersList = JSON.parse(JSON.stringify(tournament["players"]));  //Check this copy cause seems just an alias
        if (totalPlayers % 2 !== 0) {
            actualPlayersList.push("Pause");
            totalPlayers += 1;
        }

        const totalRounds = totalPlayers - 1;
        const gamesPerRound = totalPlayers / 2;

        tournament["rounds"] = [];
        for (let actRound = 1; actRound <= totalRounds; actRound++) {
            let colA = new Array(gamesPerRound).fill(0);
            let colB = new Array(gamesPerRound).fill(0);

            if (actRound % 2 !== 0) { // if is odd

                colA[0] = (actRound + 1) / 2;
                colB[0] = totalPlayers;

                for (let i = 1; i < gamesPerRound; i++) {
                    colA[i] = colA[i - 1] + 1;
                }

                if ((colA[gamesPerRound - 1] + 1) === totalPlayers) {
                    colB[gamesPerRound - 1] = 1;
                }
                else {
                    colB[gamesPerRound - 1] = colA[gamesPerRound - 1] + 1;
                }

                for (let j = gamesPerRound - 2; j > 0; j--) {   // Skip the last and first positions
                    if ((colB[j + 1] + 1) === totalPlayers) {
                        colB[j] = 1;
                    }
                    else {
                        colB[j] = colB[j + 1] + 1;
                    }
                }

            }
            else { // if is even

                colA[0] = totalPlayers;
                colA[gamesPerRound - 1] = actRound / 2;
                colB[gamesPerRound - 1] = colA[gamesPerRound - 1] + 1;

                for (let j = gamesPerRound - 2; j >= 0; j--) {
                    colB[j] = colB[j + 1] + 1;
                }

                if ((colB[0] + 1) === totalPlayers) {
                    colA[1] = 1;
                }
                else {
                    colA[1] = colB[0] + 1;
                }

                for (let i = 2; i < gamesPerRound - 1; i++) { // Skip the last and first positions
                    if ((colA[i - 1] + 1) === totalPlayers) {
                        colA[i] = 1;
                    }
                    else {
                        colA[i] = colA[i - 1] + 1;
                    }
                }

            }

            let matches = [];
            for (let i = 0; i < gamesPerRound; i++) {
                // let actualMatch = { "round": actRound, "game": i, "player_a": colA[i], "player_b": colB[i] } //easy to verify the indexes
                let actualMatch = { "id": `R${actRound}-G${i + 1}`, "player_a": actualPlayersList[colA[i] - 1], "player_b": actualPlayersList[colB[i] - 1] }
                matches.push(actualMatch)
            }
            tournament["rounds"].push(matches)

        }
    }

    roundListElem = document.getElementById("rounds-list");
    if (roundListElem) {
        roundListElem.remove();
    }

    let pageContent =
        `<div class="container" id="rounds-list" style="padding-top: 20px;">
        <div class="card shadow">
            <div class="card-header">
                <div class="row">
                    <div class="col">Rounds</div>
                </div>
            </div>
            <ul class="list-group list-group-flush" id="tournament-rounds-list" style="height: 620px; max-height: 620px; overflow-y: scroll">`
    tournament["rounds"].forEach((round, r_ind) => {
        round.forEach((match, m_ind) => {
            pageContent += `<li class="list-group-item" data-match-id="${match["id"]}" data-bs-toggle="modal" data-bs-target="#editRoundResModal">
                <p class="text-center" style="margin: 0px">${match["id"]}</p>
                <p class="text-center" id="${match["id"]}-players">${match["player_a"]} - ${match["player_b"]}</p>
                <p class="text-center" id="${match["id"]}-results" style="margin: 0px"> 0 - 0 </p>
                </li>`;
        });
    });
    pageContent += `</ul></div>
            
            <!-- Modal -->
            <div class="modal fade" id="editRoundResModal" tabindex="-1" aria-labelledby="editRoundResModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="editRoundResModalLabel">Match </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h3 id="editRoundResModalValue" class="text-center"> - </h3>
                    <div class="input-group mb-3">
                    <input type="text" id="player-a-res" class="form-control" placeholder="score" aria-label="score-a">
                    <span class="input-group-text">-</span>
                    <input type="text" id="player-b-res" class="form-control" placeholder="score" aria-label="score-b">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="saveMatchRes()" data-bs-dismiss="modal">Save</button>
                </div>
                </div>
            </div>
            </div>
            </div>`

    let containerObj = document.createElement('div')
    containerObj.classList.add('container');
    containerObj.innerHTML = pageContent.trim();

    mainBody = document.getElementById("main-body");
    mainBody.appendChild(containerObj);

    document.getElementById("editRoundResModal").addEventListener('show.bs.modal', function (event) {
        let match_id = event.relatedTarget.attributes["data-match-id"].value;
        document.getElementById('editRoundResModalLabel').innerText = `Match ${match_id}`;
        document.getElementById('editRoundResModalValue').innerText = document.getElementById(`${match_id}-players`).innerText;
    })
}
