import ICategory from "./ICategory.js";

// Interface décrivant les méthodes requises pour gérer les catégories
interface ICategoryManager {

  addCategory(category: ICategory): void;

  editCategory(id: number, category: ICategory): void;

  deleteCategory(id: number): void;
}

class CategoryManager implements ICategoryManager {
  constructor(private categoryList: ICategory[]) {

  }

  // Extension pour récupérer la liste des catégories
  get categories(): ICategory[] {
    return this.categoryList;
  }

  // Méthode pour ajouter une nouvelle catégorie
  addCategory(category: ICategory): void {
    // Vérifie si le nom de la catégorie n'est pas vide
    if (category.name === '') {
      throw new Error('Name is required');
    }

    this.categoryList.push(category);
  }

  // Méthode pour éditer une catégorie existante
  editCategory(id: number, category: ICategory): void {
 
    const index = this.categoryList.findIndex((c) => c.id === id);

    // Remplace la catégorie existante par la nouvelle catégorie fournie
    this.categoryList[index] = category;
  }

  // Méthode pour supprimer une catégorie
  deleteCategory(id: number): void {
    // Trouve l'index de la catégorie à supprimer en fonction de son ID
    const index = this.categoryList.findIndex((c) => c.id === id);

    this.categoryList.splice(index, 1);
  }
}

export default CategoryManager;
