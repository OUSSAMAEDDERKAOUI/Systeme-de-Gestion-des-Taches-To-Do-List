


document.getElementById('openPopupBtn').onclick = function () {
    document.getElementById('popup').classList.remove('hidden');
};

document.getElementById('closeBtn').onclick = function () {
    document.getElementById('popup').classList.add('hidden');
};

window.onclick = function (event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        popup.classList.add('hidden');
    }
};

document.getElementById('addTaskBtn').onclick = function () {
    const title = document.getElementById('TitleInput').value;
    const description = document.getElementById('descriptionInput').value;

    const priority = document.getElementById('PriorityInput').value;
    const dueDate = document.getElementById('DateInput').value;
    const taskStatus = document.getElementById('taskStatusInput').value;


    if (title && description && priority && dueDate) {
        // Créer un nouvel élément de tâche
        const taskItem = document.createElement('li');
        taskItem.className = '  flex flex-col justify-between items-start p-4 bg-white rounded mb-2 shadow';

        taskItem.innerHTML = `
            <div>
                <h3 class="font-bold">${title}</h3>
                <div class=' desc hidden ' >${description} </div>
                <div>Priorité : ${priority}, Échéance: ${dueDate}</div>
            </div>
            <div class="mt-2">
                <button class="editBtn bg-blue-500 text-white rounded px-2 py-1 mr-2">Modifier</button>
                <button class="deleteBtn bg-red-500 text-white rounded px-2 py-1">Supprimer</button>
                <button class="aficherDesc bg-green-500 text-white rounded px-2 py-1">plus</button>

            </div>
        `;

        // Ajouter la tâche 
        if (taskStatus === 'todo') {
            document.getElementById('todoList').appendChild(taskItem);
        }
        else if (taskStatus === 'doing') {
            document.getElementById('doingList').appendChild(taskItem);
        }
        else {
            document.getElementById('doneList').appendChild(taskItem);

        }
        // Ajouter la couleur pour chaque priority 
        if (priority === 'P1') {
            taskItem.style.borderLeft = '4px double red';

        }
        else if (priority === 'P2') {
            taskItem.style.borderLeft = '4px double orange';
        }
        else {
            taskItem.style.borderLeft = '4px double green';

        }
        // afficher la discription  

        taskItem.querySelector('.aficherDesc').onclick = function () {
            const descElement = taskItem.querySelector('.desc');
            descElement.classList.toggle('hidden');
        };


        document.getElementById('TitleInput').value = '';
        document.getElementById('descriptionInput').value = '';
        document.getElementById('PriorityInput').value = '';
        document.getElementById('DateInput').value = '';

        document.getElementById('popup').classList.add('hidden');

        taskItem.querySelector('.editBtn').onclick = function () {
            const task = this.closest('li');
            const titleElement = task.querySelector('h3');
            const descriptionElement = task.querySelector('div');

            document.getElementById('TitleInput').value = titleElement.textContent;
            document.getElementById('descriptionInput').value = descriptionElement.textContent.split(' (')[0];
            document.getElementById('popup').classList.remove('hidden');

            document.getElementById('addTaskBtn').onclick = function () {
                const newTitle = document.getElementById('TitleInput').value;
                const newDescription = document.getElementById('descriptionInput').value;
                const newPriority = document.getElementById('PriorityInput').value;
                const newDueDate = document.getElementById('DateInput').value;

                // Mettre à jour les éléments de la tâche
                titleElement.textContent = newTitle;
                descriptionElement.innerHTML = `${newDescription} (Priorité: ${newPriority}, Échéance: ${newDueDate})`;

                // Réinitialiser les champs
                document.getElementById('TitleInput').value = '';
                document.getElementById('descriptionInput').value = '';
                document.getElementById('PriorityInput').value = '';
                document.getElementById('DateInput').value = '';

                // Cacher la popup
                document.getElementById('popup').classList.add('hidden');
            };
        };

        taskItem.querySelector('.deleteBtn').onclick = function () {
            const task = this.closest('li');
            task.remove(); // Supprimer la tâche de la liste
        };
    } else {
        alert('Veuillez remplir tous les champs.');
    }
};