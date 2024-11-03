
//creation de principale obejet
const tasks = {
    todo: [],
    doing: [],
    done: [],
};
// ouvrir et fermer les popup
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
function clearInputs(TitleInput,descriptionInput,PriorityInput,DateInput) {
        document.getElementById('TitleInput').value = '';
        document.getElementById('descriptionInput').value = '';
        document.getElementById('PriorityInput').value = '';
         document.getElementById('DateInput').value = '';
}
//creation de variable pour stocke les input de form popup
document.getElementById('addTaskBtn').onclick = function (event) {
    const title = document.getElementById("TitleInput").value;
    const description = document.getElementById("descriptionInput").value;
    const priority = document.getElementById("PriorityInput").value;
    const dueDate = document.getElementById("DateInput").value;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueDateInput = new Date(dueDate);
            if (dueDateInput < today) {
            alert("La date d'échéance ne peut pas être dans le passé !");
            // event.preventDefault(); 
            return;
        } 
    const taskStatus = document.getElementById("taskStatusInput").value;

    if (title && description && priority && dueDate && taskStatus) {
        const taskItem = {
            title,
            description,
            priority,
            dueDate,
            taskStatus,
        };
        // creation de div pour stocke en div de  (todo ou doing ou done )
        const taskElement = document.createElement('div');
        taskElement.classList.add( 'animate-added-card','border', 'border-gray-300', 'rounded', 'p-2', 'mb-2', 'bg-gray-50');
        taskElement.innerHTML = `
        <h1 > <span class=" font-extrabold">Title :</span> ${taskItem.title}</h1>
        <div class=" desc-Toggel hidden"> <span class="font-bold">description :</span>${taskItem.description}</div>
        <div class="font-bold  "> Priorité :  <span class="priorityClass">${taskItem.priority}</span> , Échéance :  <sapan class="dateClass">${taskItem.dueDate}</sapan></div>
         <button class="editBtn bg-blue-500 text-white rounded px-2 py-1 mr-2">Modifier</button>                
         <button class="deleteBtn bg-red-500 text-white rounded px-2 py-1">Supprimer</button>
        `
        // afficher les descriptions en leur place avec toggele
        taskElement.onclick = function () {
            const descAffichage = taskElement.querySelector('.desc-Toggel');
            descAffichage.classList.toggle('hidden');
        };
        //stocker les taskElement en leur etat automatiquement
        if (taskStatus === "todo") {
            tasks.todo.push(taskItem);
            document.getElementById("todoList").appendChild(taskElement);


        }
        else if (taskStatus === "doing") {
            tasks.doing.push(taskItem);
            document.getElementById("doingList").appendChild(taskElement);


        }
        else if (taskStatus === "done") {
            tasks.done.push(taskItem);
            document.getElementById("doneList").appendChild(taskElement);

        }
        // colorer les taskElements selan leur priorite
        if (priority === 'P1') {
            taskElement.style.borderLeft = '4px solid red';

        }
        if (priority === 'P2') {
            taskElement.style.borderLeft = '4px solid orange';

        } if (priority === 'P3') {
            taskElement.style.borderLeft = '4px solid green';

        }
        count();


        // la fonction de suppression 
        taskElement.querySelector('.deleteBtn').onclick = function (e) {
            e.stopPropagation();
            const confirmDelete = confirm("Voulez-vous vraiment supprimer cette tache ?");
            if (confirmDelete) {
                tasks[taskStatus] = tasks[taskStatus].filter(task => task.title !== taskItem.title);
                taskElement.classList.add("animate-deleted-card");
                setTimeout(() => {
                    taskElement.remove();
                    count();
                }, 750);




                // console.log(tasks.todo);
                // console.log(tasks.doing);

                // console.log(tasks.done);
                
            }

        };
        // //fonction de la modification 
        document.getElementById('popupEdit').classList.add('hidden');

        taskElement.querySelector('.editBtn').onclick = function () {

            document.getElementById('popupEdit').classList.remove('hidden');

            const newTitle = taskElement.querySelector('h1');
            const newDescription = taskElement.querySelector('.desc-Toggel');
            const newPriority = taskElement.querySelector('.priorityClass');
            const newDate = taskElement.querySelector('.dateClass');

            document.getElementById('TitleInputEdit').value = newTitle.textContent;
            document.getElementById('descriptionInputEdit').value = newDescription.textContent;
            document.getElementById('PriorityInputEdit').value = newPriority.textContent;
            document.getElementById('DateInputEdit').value = newDate.textContent;
            document.getElementById('taskStatusInputEdit').value = taskElement.parentElement.dataset.list;


            document.getElementById('addTaskBtnEdit').onclick = function (e) {
                e.preventDefault();
                const titleElement = document.getElementById('TitleInputEdit').value;
                const descriptionElement = document.getElementById('descriptionInputEdit').value;
                const priorityElement = document.getElementById('PriorityInputEdit').value;
                const dateElement = document.getElementById('DateInputEdit').value;
                const StatusElement = document.getElementById('taskStatusInputEdit').value;
                // Mettre à jour les éléments de la tâche:
                newTitle.textContent = `${titleElement}`;
                newDescription.innerHTML = `${descriptionElement}`;
                newPriority.innerHTML = `${priorityElement}`;
                newDate.innerHTML = `${dateElement}`;
                count();
                if (StatusElement === 'todo') {
                    tasks.todo.push(taskItem);
                    document.getElementById("todoList").appendChild(taskElement);
                }
                else if (StatusElement === 'doing') {
                    tasks.doing.push(taskItem);
                    document.getElementById("doingList").appendChild(taskElement);
                }
                else if (StatusElement === 'done') {
                    tasks.done.push(taskItem);
                    document.getElementById("doneList").appendChild(taskElement);
                }
                // Ajouter la couleur pour chaque priority 
                if (priorityElement === 'P1') {
                    taskElement.style.borderLeft = '4px double red';

                }
                else if (priorityElement === 'P2') {
                    taskElement.style.borderLeft = '4px double orange';
                }
                else {
                    taskElement.style.borderLeft = '4px double green';

                }
                document.getElementById('popupEdit').classList.add('hidden');
            }
            // fermer la popup
            document.getElementById('closeBtnEdit').onclick = function () {
                document.getElementById('popupEdit').classList.add('hidden');
            };
        }
        clearInputs(TitleInput,descriptionInput,PriorityInput, DateInput);
    }
    else {
        alert('Veuillez remplir tous les champs.');
    }

}
function count() {
    document.getElementById('todocount').textContent = document.getElementById('todoList').childElementCount;
    document.getElementById('doingcount').textContent = document.getElementById('doingList').childElementCount;

    document.getElementById('donecount').textContent = document.getElementById('doneList').childElementCount;

}
// document.querySelectorAll('.clearData').forEach(deletButton => {
//     deletButton.onclick=function(){
//         const confirmDelete = confirm("Voulez-vous vraiment supprimer tous les taches ?");
//         if (confirmDelete) {
//             this.parentElement.parentElement.nextElementSibling.innerHTML=''
//             count();
//         }
//     }
// });
document.querySelector(".clearDataTodo").onclick=function(){
    const confirmDelete = confirm("Voulez-vous vraiment supprimer tous les taches ?");
    if (confirmDelete) {
        this.parentElement.parentElement.nextElementSibling.innerHTML=''
        count();
    }
}
document.querySelector(".clearDataDoing").onclick=function(){
    const confirmDelete = confirm("Voulez-vous vraiment supprimer tous les taches ?");
    if (confirmDelete) {
        this.parentElement.parentElement.nextElementSibling.innerHTML=''
        count();
    }
}
document.querySelector(".clearDataDone").onclick=function(){
    const confirmDelete = confirm("Voulez-vous vraiment supprimer tous les taches ?");
    if (confirmDelete) {
        this.parentElement.parentElement.nextElementSibling.innerHTML=''
        count();
    }
}