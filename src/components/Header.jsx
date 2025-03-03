import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, Settings, LogOut } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { uploadFile } from '../services/operations/service';
import { createAsyncThunk } from '@reduxjs/toolkit';

const uploadFileThunk = createAsyncThunk(
  'file/upload',
  async (fileData, { dispatch }) => {
    const { file, token } = fileData;
    const response = await uploadFile(file, token, dispatch);
    return response;
  }
);

export function Header({ onSignOut, onUploadStart = () => { }, onUploadComplete = () => { } }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [fileData, setFileData] = useState(null); 

  const handleLogout = () => {
    navigate('/signin');
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const loadingToast = toast.loading('File upload in progress...');

    try {
      onUploadStart?.();
      setFileData(null);
      
      const response = await dispatch(uploadFileThunk({ file, token }));
      
      if (response.payload) {
        toast.success('File uploaded successfully!', {
          id: loadingToast,
          duration: 3000
        });
        setFileData(response.payload);
      } else {
        throw new Error('Upload failed');
      }
      
      onUploadComplete?.();
    } catch (error) {
      // console.error('Error uploading file:', error);
      toast.error(error.message || 'Failed to upload file. Please try again.', {
        id: loadingToast,
        duration: 3000
      });
      onUploadComplete?.();
    }
  };

  return (
    <Navbar className="mx-auto max-w-full px-4 py-2 rounded-none border-b border-gray-200" color="white">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <img src="/binary-code.svg" alt="Binary Code" className="h-8 w-8 mr-4" />
            <Typography as="a" href="#" variant="h6" className="cursor-pointer py-1.5 text-gray-700">
              Advanced Binary Analyzer
            </Typography>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            accept=".exe,.dll,.sys"
          />
          <Button
            variant="text"
            size="sm"
            className="flex items-center gap-2 normal-case border border-gray-300 rounded-md px-4 py-2"
            onClick={handleButtonClick}
          >
            <Upload className="h-4 w-4" /> Upload File
          </Button>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" size="sm" className="flex items-center justify-center">
                <Settings className="h-5 w-5 text-gray-700" />
              </IconButton>
            </MenuHandler>
            <MenuList>
              <MenuItem className="flex items-center gap-2" onClick={onSignOut}>
                <LogOut className="h-4 w-4" />
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      <Toaster position="top-center" />

    </Navbar>
  );
}

export default Header;
