import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { useNavigate } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
export default function IconBreadcrumbs() {
    const navigate = useNavigate()
    const ClickCateGory = () => {
        navigate('/category_course')
    }
    const Home = () => {
        navigate('/')
    }

    const lecturer = () => {
        navigate('/teacheralllist')
    }

    const contacts = () => {
        navigate('/contacts')
    }
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"

                onClick={Home}
            >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
            </Link>
            <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                onClick={ClickCateGory}
            >
                <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Course
            </Link>
            <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                onClick={lecturer}
            >
                <LocalLibraryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Lecturers
            </Link>
            <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                onClick={contacts}
            >
                <ContactSupportIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Contacts
            </Link>

        </Breadcrumbs>
    );
}