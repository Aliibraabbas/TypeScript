class CategoryManager {
    categoryList;
    constructor(categoryList) {
        this.categoryList = categoryList;
    }
    // Extension pour récupérer la liste des catégories
    get categories() {
        return this.categoryList;
    }
    // Méthode pour ajouter une nouvelle catégorie
    addCategory(category) {
        // Vérifie si le nom de la catégorie n'est pas vide
        if (category.name === '') {
            throw new Error('Name is required');
        }
        this.categoryList.push(category);
    }
    // Méthode pour éditer une catégorie existante
    editCategory(id, category) {
        const index = this.categoryList.findIndex((c) => c.id === id);
        // Remplace la catégorie existante par la nouvelle catégorie fournie
        this.categoryList[index] = category;
    }
    // Méthode pour supprimer une catégorie
    deleteCategory(id) {
        // Trouve l'index de la catégorie à supprimer en fonction de son ID
        const index = this.categoryList.findIndex((c) => c.id === id);
        this.categoryList.splice(index, 1);
    }
}
export default CategoryManager;
