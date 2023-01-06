import React, { FC } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { TextField,InputAdornment } from '@mui/material';

interface Props {
  label: string;
  onChange: (event:any) => void;
}

const ImageInput: FC<Props> = ({ label, onChange }) => {
  return (
    
    <TextField
      label={label}
      type="file"
      inputProps={{ accept: 'image/*' }}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
        style: { textAlign: 'right'}
      }} 
      
     
    />
   
    );
};

export default ImageInput;