import { DrinksCollection } from "./drinks"
import { EntresCollection } from "./entres"

export interface IAppState {
  entres: EntresCollection,
  drinks: DrinksCollection
}
  
export function isAppState(data: unknown): data is IAppState {
    return !!data
} 