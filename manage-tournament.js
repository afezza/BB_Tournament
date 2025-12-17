
function loadManagePage() {

    // Generate the content 
    let pageContent =
        `<div class="container">
        <div class="card shadow">
            <div class="card-header">
                <div class="row">
                    <div class="col-7">Tournament: ${tournaments[0]["id"]}</div>
                    <div class="col-5 text-end">${tournaments[0]["date"]}</div>
                </div>
                <div class="row">
                    <div class="col"></div>
                    <div class="col text-center">
                    <button type="button" class="btn btn-outline-primary btn-sm" onclick="generateRounds()"><i class="bi bi-diagram-2"></i></button>
                    <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addPlayerModal"><i class="bi bi-plus-circle"></i></button>
                    </div>
                    <div class="col"></div>
                </div>
            </div>
            <ul class="list-group list-group-flush list-group-numbered" id="tournament-players-list" style="height: 413px; max-height: 413px; overflow-y: scroll">`
    tournaments[0]["players"].forEach(player => {
        pageContent += `<li class="list-group-item">${player}</li>`;
    });
    pageContent += `</ul></div>
            
            <!-- Modal -->
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
            </div>`

    let containerObj = document.createElement('div')
    containerObj.classList.add('container');
    containerObj.innerHTML = pageContent.trim();

    return containerObj
}
