let workspaces = [];

// Function to generate a random API token
function generateRandomToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) { // Generate a 16-character token
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

// Function to display workspaces in the list
function displayWorkspaces() {
    const workspaceList = document.getElementById('workspace-list');
    workspaceList.innerHTML = ''; // Clear the current list

    workspaces.forEach((workspace, index) => {
        // Create a div element for each workspace
        const workspaceDiv = document.createElement('div');
        workspaceDiv.className = 'workspace-item';

        // Add title and description
        workspaceDiv.innerHTML = `
            <strong>${workspace.title}</strong><br>
            ${workspace.description}
        `;

        // Add buttons for viewing the token, editing, and deleting
        const tokenButton = document.createElement('button');
        tokenButton.textContent = 'View API Token';
        tokenButton.onclick = () => viewToken(index);
        workspaceDiv.appendChild(tokenButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editWorkspace(index);
        workspaceDiv.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteWorkspace(index);
        workspaceDiv.appendChild(deleteButton);

        // Append the workspaceDiv to the list
        workspaceList.appendChild(workspaceDiv);
    });
}

// Function to handle form submission
document.getElementById('workspace-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the title and description values from the form
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // Check if a workspace with the same title already exists for this user
    const existingWorkspace = workspaces.find(workspace => workspace.title === title);
    if (existingWorkspace) {
        alert('Workspace with the same title already exists.');
        return;
    }

    // Create a new workspace object with a random API token
    const newWorkspace = {
        title: title,
        description: description,
        apiToken: generateRandomToken(), // Generate a random API token
        tokenVisible: false // Token is not yet viewed
    };

    // Add the new workspace to the list
    workspaces.push(newWorkspace);

    // Clear the form
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';

    // Display the updated list of workspaces
    displayWorkspaces();
});

// Function to view the API token of a workspace
function viewToken(index) {
    const workspace = workspaces[index];

    // Check if the token has already been viewed
    if (workspace.tokenVisible) {
        alert('API token has already been viewed and cannot be viewed again.');
        return;
    }

    // Display the API token to the user
    alert(`API Token: ${workspace.apiToken}`);

    // Set tokenVisible to true so that it cannot be viewed again
    workspace.tokenVisible = true;
}

// Function to edit a workspace
function editWorkspace(index) {
    // Retrieve the existing workspace data
    const workspace = workspaces[index];

    // Prompt the user for new title and description
    const newTitle = prompt('Edit Title:', workspace.title);
    const newDescription = prompt('Edit Description:', workspace.description);

    // Check if the title has changed
    if (newTitle !== workspace.title) {
        // Check for duplicate titles
        const duplicateWorkspace = workspaces.find(w => w.title === newTitle);
        if (duplicateWorkspace) {
            alert('Workspace with the same title already exists.');
            return;
        }
    }

    // Update the workspace data
    if (newTitle !== null) workspace.title = newTitle;
    if (newDescription !== null) workspace.description = newDescription;

    // Update the display
    displayWorkspaces();
}

// Function to delete a workspace
function deleteWorkspace(index) {
    // Confirm deletion
    const confirmDeletion = confirm('Are you sure you want to delete this workspace?');
    if (confirmDeletion) {
        // Remove the workspace from the list
        workspaces.splice(index, 1);

        // Update the display
        displayWorkspaces();
    }
}

// Initial display of workspaces
displayWorkspaces();
