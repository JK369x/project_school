import './navbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useAppSelector } from '../../../store/useHooksStore';
export const Navbar = () => {

  const { photoURL } = useAppSelector(({ auth }) => auth)
  return (
    <div className='Navbar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon className='icon' />
        </div>
        <div className="items">

          <div className="item">
            <img src={photoURL ? photoURL : "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1380&t=st=1659940749~exp=1659941349~hmac=e334052c91870b6fbd75505362af5b13153212e56d2f2cc21cc5aca7ecde6576"} alt="" className='avatar' />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar