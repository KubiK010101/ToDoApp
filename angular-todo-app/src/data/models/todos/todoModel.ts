import { CategoryModel } from './categoryModel';
export interface TodoModel {
  name?: string,
  category?: CategoryModel,
  categoryId?: number,
  description?: string,
  deadline?: string,
  datacreate?: string,
  id?: number,
  completed?: boolean,
}
