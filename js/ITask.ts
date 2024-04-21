interface ITask {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    priority: "low" | "medium" | "high";
    category: string;
  }
  
  export default ITask;