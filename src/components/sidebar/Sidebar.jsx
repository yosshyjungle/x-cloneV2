import React from 'react'
import XIcon from '@mui/icons-material/X';
import SidebarOption from './SidebarOption';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button } from '@mui/material';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className='sidebar'>
        <XIcon className='sidebar_twitterIcon' />

        <SidebarOption text="ホーム" Icon={HomeIcon} active/>
        <SidebarOption text="話題を検索" Icon={SearchIcon} />
        <SidebarOption text="通知" Icon={NotificationsIcon} />
        <SidebarOption text="メッセージ" Icon={MailOutlineIcon} />
        <SidebarOption text="ブックマーク" Icon={BookmarkBorderIcon} />
        <SidebarOption text="リスト" Icon={ListAltIcon} />
        <SidebarOption text="プロフィール" Icon={PermIdentityIcon} />
        <SidebarOption text="もっと見る" Icon={MoreHorizIcon} />

        <Button variant='outlined' className='sidebar_tweet' fullWidth>ポストする</Button>
    </div>
  )
}

export default Sidebar