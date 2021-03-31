import { TodoModel } from './todomodel';
export interface CategoryModel {
  name: String,
  id: number,
  toDos: TodoModel[]
}
