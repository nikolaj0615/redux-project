import { IconEdit, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteDataItem, deleteLeafItem, editDataItem } from '../redux/import/importSlice';
import EditModal from './editModal';

function TreeView({ importedData }: any) {
    const [openItems, setOpenItems] = useState(importedData?.player?.playerInfo.map(() => false));
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState({ blockTitle: '', currItem: '', propertyToEdit: '', identifier: '' });
    const dispatch = useDispatch()

    const handleEditItem = (blockTitle: string, currItem: string, propertyToEdit: string, identifier: string) => {
        setEditingItem({ blockTitle, currItem, propertyToEdit, identifier });
        setIsEditing(true);
    };

    const handleSaveDataInRedux = (blockTitle: string, newData: string, propertyToEdit: string,identifier:string) => {
        dispatch(editDataItem({ blockTitle: blockTitle, newData, propertyToEdit,identifier }));
    };

    const handleDeleteItem = (blockTitle: string, itemTitle: string) => {
        dispatch(deleteDataItem({
            blockTitle,
            itemTitle,
        }));
    };
    const handleDeleteLeafItem = (blockTitle: string, itemTitle: string) => {
        dispatch(deleteLeafItem({ blockTitle, itemTitle }));
    };


    const toggleItem = (index: number) => {
        const updatedOpenItems = [...openItems];
        updatedOpenItems[index] = !updatedOpenItems[index];
        setOpenItems(updatedOpenItems);
    };

    return (
        <>
            <ol className="organizational-chart mt-3">
                <li>
                    <div className='d-flex align-items-center justify-content-center'>
                        <h1 className='fs-3 mb-0'>{importedData?.player?.name}</h1>
                        <IconEdit onClick={() => handleEditItem('', importedData?.player?.name, '', '')} />
                    </div>
                    <ol>
                        {importedData?.player?.playerInfo.map((item: any, index: number) => (
                            <li key={index}>
                                <div className='d-flex align-items-center justify-content-center' onClick={() => toggleItem(index)}>
                                    <h2 className='fs-4 mb-0'>{item?.title}</h2>
                                    {openItems[index] ? <BsFillCaretUpFill className='ms-3' /> : <BsFillCaretDownFill className='ms-3' />}
                                </div>
                                <Collapse in={openItems[index]}>
                                    <ol>
                                        {item?.statsInfo.map((info: any, infoIndex: number) => (
                                            <li key={infoIndex} >
                                                <div className='d-flex justify-content-between'>
                                                    <h3 className='fs-4 mb-0 text-center w-100'>{info?.title}</h3>
                                                    <IconEdit onClick={() => handleEditItem(item?.title, info?.title, 'title', info?.title)} />
                                                    {item.title !== 'Career stats' && <IconX onClick={() => { handleDeleteItem(item.title, info.title); }} />
                                                    }

                                                </div>

                                                <ol>
                                                    {Array.isArray(info.info) ? (
                                                        info.info.map((i: any, iIndex: number) => (
                                                            <li key={iIndex}>
                                                                <div className='d-flex justify-content-between '>
                                                                    {i}

                                                                    <div>
                                                                        <IconEdit onClick={() => handleEditItem(item.title, i, 'info', i)} />
                                                                        <IconX onClick={(e) => { handleDeleteLeafItem(item.title, i) }} />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li>
                                                            <div d-flex justify-content-between  >
                                                                {info?.info}
                                                                <IconEdit onClick={() => handleEditItem(item.title, info?.info, 'info', info?.info)} />
                                                            </div>
                                                        </li>
                                                    )}
                                                </ol>
                                            </li>
                                        ))}
                                    </ol>
                                </Collapse>
                            </li>
                        ))}
                    </ol>
                </li>
            </ol>
            <EditModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                value={editingItem.currItem}
                blockTitle={editingItem.blockTitle}
                propertyToEdit={editingItem.propertyToEdit}
                identifier={editingItem.identifier}
                onSave={handleSaveDataInRedux}
            />
        </>
    );
}

export default TreeView;
