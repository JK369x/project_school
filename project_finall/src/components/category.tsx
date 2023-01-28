import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { useNavigate } from 'react-router-dom';



export default function IconBreadcrumbs() {
    const navigate = useNavigate()
    const ClickCateGory = () => {
        navigate('/category_course')
    }
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/"
                onClick={ClickCateGory}
            >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Categorys
            </Link>
            <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/material-ui/getting-started/installation/"
                onClick={ClickCateGory}
            >
                <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Lecturer
            </Link>
            <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/material-ui/getting-started/installation/"
                onClick={ClickCateGory}
            >
                <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Contact
            </Link>

        </Breadcrumbs>
    );
}