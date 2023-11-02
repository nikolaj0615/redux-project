import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ImportState } from '../../types/types';

const initialState: ImportState  = {
    data: null,
};

type ImportDataAction = PayloadAction<ImportState['data']>;
type DeleteDataItemAction = PayloadAction<{ blockTitle: string; itemTitle: string }>;
type DeleteLeafItemAction = PayloadAction<{ blockTitle: string; itemTitle: string }>;
type EditDataItemAction = PayloadAction<{ blockTitle: string; newData: string, propertyToEdit: string, identifier: string }>;

export const importSlice = createSlice({
    name: 'import',
    initialState,
    reducers: {
        importData: (state, action: ImportDataAction) => {
            state.data = action.payload;
        },
        deleteDataItem: (state, action: DeleteDataItemAction) => {
            const { blockTitle, itemTitle } = action.payload;

            if (state.data && state.data.player) {
                // Find the component (parent) to delete the child from
                const componentToDelete = state.data.player.playerInfo.find(item => item.title === blockTitle);

                if (componentToDelete) {
                    // Filter out the specific child element based on the itemTitle
                    const updatedStatsInfo = componentToDelete.statsInfo.filter(info => info.title !== itemTitle);

                    // Update the component's statsInfo with the filtered child elements
                    componentToDelete.statsInfo = updatedStatsInfo;

                }
            }
        },
        deleteLeafItem: (state, action: DeleteLeafItemAction) => {
            const { blockTitle, itemTitle } = action.payload;

            if (state.data && state.data.player) {
                const componentToDelete = state.data.player.playerInfo.find(item => item.title === blockTitle);

                if (componentToDelete) {
                    const updatedStatsInfo = componentToDelete.statsInfo.map(info => {
                        if (Array.isArray(info.info)) {

                            info.info = info.info.filter(item => item !== itemTitle);
                        }
                        return info;
                    });
                    componentToDelete.statsInfo = updatedStatsInfo;
                }
            }
        },


        editDataItem: (state, action: EditDataItemAction) => {
            const { blockTitle, newData, propertyToEdit, identifier } = action.payload;

            if (blockTitle === '') {
                // If editing the player name
                if (state.data && state.data.player) {
                    state.data.player.name = newData;
                }
            } else {
                if (state.data && state.data.player && state.data.player.playerInfo) {
                    // Find the specific data to update based on blockTitle
                    const dataToEdit = state.data.player.playerInfo.find((item) => item.title === blockTitle);
                    if (dataToEdit) {
                        if (propertyToEdit === 'title') {
                            const itemToEdit = dataToEdit.statsInfo.find((item) => item.title === identifier);

                            if (itemToEdit) {
                                itemToEdit.title = newData;
                            }
                        } else if (propertyToEdit === 'info') {
                            dataToEdit.statsInfo.forEach((item) => {
                                if (Array.isArray(item.info)) {
                                    // Handle the case when info is an array
                                    item.info = item.info.map((info) => (info === identifier ? newData : info));
                                } else {
                                    // Handle the case when info is a string
                                    if (item.info === identifier) {
                                        item.info = newData;
                                    }
                                }
                            });

                        }

                    }
                }
            }
        },
    },

});

export const { importData, deleteDataItem, editDataItem, deleteLeafItem } = importSlice.actions;
export default importSlice.reducer;
