import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function NativePickers(birthday: any) {
    return (
        <Stack component="form" noValidate spacing={3}>
            <TextField
                id="date"
                label="Birthday"
                type="date"
                value={birthday}
                defaultValue="2017-05-24"
                sx={{ width: '100%' }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Stack>
    );
}