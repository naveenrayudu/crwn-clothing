import {createSelector} from 'reselect';
import { AppState } from '../rootReducer';
import { IDirectortItemData } from '../../../models/interfaces/IItemData';

const directory = (state: AppState) => state.directory;
export const directorySelector = createSelector(directory, (directoryList: IDirectortItemData[]) => directoryList);
