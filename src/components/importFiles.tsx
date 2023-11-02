import { IconArrowRight, IconChecks, IconCloudUpload, IconFile } from '@tabler/icons-react';
import React, { useRef, ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { importData } from '../redux/import/importSlice';
import { RootState } from '../redux/store';
import { FileInputProps } from '../types/types';



function FileInput({ showTreeView, setShowTreeView }: FileInputProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState('');
    const importedData = useSelector((state: RootState) => state.import.data);
    const dispatch = useDispatch();


    const handleFileChange = (file: File | null) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsedData = JSON.parse(e.target?.result as string);
                dispatch(importData(parsedData));
                localStorage.setItem('reduxState', JSON.stringify(parsedData));
                setFileName(file ? file.name : "")
            } catch (error) {
                alert('Invalid JSON file.');
            }
        };
        reader.readAsText(file as Blob);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        if (file) {
            handleFileChange(file);
        }
    };

    useEffect(() => {
        if (showTreeView) {
            const stateToSave = JSON.stringify(importedData);
            localStorage.setItem('reduxState', stateToSave);
        }
    }, [showTreeView, importedData]);

    return (
        <div className="bg-gray input-container">
            <div
                className='cursor-pointer d-flex flex-column justify-content-center align-items-center h-100 '
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => inputRef.current && inputRef.current.click()}
            >
                <input
                    ref={(el) => (inputRef.current = el)}
                    type="file"
                    accept=".json"
                    style={{ display: 'none' }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e.target.files && e.target.files[0])}
                />
                {!showTreeView &&
                    <>
                        <div className=' bg-gray-light p-3 rounded-circle mb-4'>
                            <IconCloudUpload width={40} className=' text-white' height={40} />
                        </div>
                        <p className='text-white m-0 fs-5 text-center '>Drag & Drop or Click to Upload <br /> JSON File</p>
                    </>
                }
            </div>
            <div className="d-flex flex-column w-100">
                {fileName &&
                    <div className='d-flex my-3 justify-content-between'>
                        <div className='d-flex'>
                            <IconFile className='text-white me-2' />
                            <p className='text-white m-0'> {fileName}
                            </p>
                        </div>
                        <IconChecks width={32} height={32} color='#4AC983' />
                    </div>
                }

            </div>
            <div className="text-center w-100">
                {importedData && !showTreeView && <button className='px-3 py-2 rounded-3 border-0 ' onClick={() => setShowTreeView(true)}> <div className='d-flex'>Visualize data <IconArrowRight className='ms-2' /></div></button>}
            </div>
        </div>


    );
};

export default FileInput;
