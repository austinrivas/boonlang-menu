import fs from 'fs'
import { IAppState } from '../src/models/app-state';

export async function saveAppState(appState: IAppState, dest: string) {
    fs.writeFileSync(dest, JSON.stringify(appState))
    console.log('App State Saved:', dest)
}