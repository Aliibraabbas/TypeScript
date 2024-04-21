import Task from "./ITask.js"; 
import CategoryManager from "./Category.js"; 

// Définition de l'interface ITask pour spécifier les méthodes attendues
interface ITask {
  // Méthode pour ajouter une tâche
  addTask(task: Task): void;

  modifyTask(id: number, task: Task): void;

  deleteTask(id: number): void;

  filterTasks(priority: "all" | "low" | "medium" | "high", 
  
  dueDate: string | null, 
  
  categoryId: number): Task[];
}

// Implémentation de la classe TaskManager qui implémente l'interface ITask
class TaskManager implements ITask {
private taskList: Task[];

constructor(tasks: Task[]) {
    this.taskList = tasks; 
}

// Extension pour récupérer la liste des tâches
get tasks(): Task[] {
    return this.taskList;
}
  

  // Méthode pour ajouter une tâche
  addTask(task: Task): void {
    // Validation des champs obligatoires de la tâche
    if (task.title === '') {
      throw new Error('Title is required');
    }
    if (task.description === '') {
      throw new Error('Description is required');
    }
    if (task.dueDate === '') {
      throw new Error('Due date is required');
    }
    if (task.priority !== 'low' && task.priority !== 'medium' && task.priority !== 'high') {
      throw new Error('Invalid priority');
    }

    // Gestion de la catégorie si elle est définie pour la tâche
    if (task.category) {
      const categoryManager = new CategoryManager(JSON.parse(localStorage.getItem('categories') || "[]"));
      const categoryId = categoryManager.categories.find((c) => c.name === task.category)?.id;
      if (!categoryId) {
        categoryManager.addCategory({id: Math.floor(Math.random() * 1000000), name: task.category});
      }
      // Sauvegarde des catégories mises à jour dans le localStorage
      localStorage.setItem('categories', JSON.stringify(categoryManager.categories));
    }

    this.taskList.push(task);
  }

  // Méthode pour éditer une tâche existante
  modifyTask(id: number, task: Task): void {
    if (task.title === '') {
      throw new Error('Title is required');
    }
    if (task.description === '') {
      throw new Error('Description is required');
    }
    if (task.dueDate === '') {
      throw new Error('Due date is required');
    }
    if (task.priority !== 'low' && task.priority !== 'medium' && task.priority !== 'high') {
      throw new Error('Invalid priority');
    }

    // Recherche de l'index de la tâche à éditer
    const index = this.taskList.findIndex((t) => t.id === id);

  
    if (task.category && task.category !== this.taskList[index].category) {
      if (!localStorage.getItem('categories')) {
        localStorage.setItem('categories', '[]');
      }
      const categoryManager = new CategoryManager(JSON.parse(localStorage.getItem('categories') || "[]"));
      const categoryId = categoryManager.categories.find((c) => c.name === task.category)?.id;
      if (!categoryId) {
        categoryManager.addCategory({id: Math.floor(Math.random() * 1000000), name: task.category});
      }
      localStorage.setItem('categories', JSON.stringify(categoryManager.categories));
    }

    this.taskList[index] = task;
  }

  // Méthode pour supprimer une tâche
  deleteTask(id: number): void {
    // Recherche de l'index de la tâche à supprimer
    const index = this.taskList.findIndex((t) => t.id === id);
    this.taskList.splice(index, 1);
  }

  // Méthode pour filtrer les tâches selon la priorité, la date d'échéance et la catégorie
  filterTasks(priority: "all" | "low" | "medium" | "high", dueDate: string | null, categoryId: number): Task[] {
    let filteredTasks: Task[] = this.taskList; 

    // Filtrage par catégorie si une catégorie est spécifiée
    if (categoryId) {
      const categoryManager = new CategoryManager(JSON.parse(localStorage.getItem('categories') || "[]"));
      const categoryName = categoryManager.categories.find((c) => c.id === categoryId)?.name;
      if (categoryName) {
        filteredTasks = filteredTasks.filter((task: Task) => {
          return task.category === categoryName;
        });
      }
    }

    // Filtrage par priorité si ce n'est pas "all"
    if (priority !== 'all') {
      filteredTasks = filteredTasks.filter((task: Task) => {
        return task.priority === priority;
      });
    }

    // Filtrage par date d'échéance si une date est spécifiée
    if (dueDate) {
      filteredTasks = filteredTasks.filter((task: Task) => {
        return task.dueDate === dueDate;
      });
    }

    return filteredTasks;
  }
}

// Export de la classe TaskManager pour l'utiliser dans d'autres fichiers
export default TaskManager;
