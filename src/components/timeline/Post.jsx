import { Avatar } from '@mui/material'
import React from 'react'
import {
    VerifiedUser,
    Repeat,
    ChatBubbleOutline,
    FavoriteBorder,
    PublishOutlined
} from '@mui/icons-material';
import './Post.css';

function Post({ displayName, userName, verified, text, image, avatar}) {
  return (
    <div className='post'>
        <div className='post_avatar'>
            <Avatar src={avatar}/>
        </div>
        <div className='post_body'>
            <div className='post_header'>
                <div className='post_headerText'>
                    <h3>{displayName}</h3>
                    <span className='post_headerSpecial'>
                        <VerifiedUser className='post_badge' />
                        @{userName}
                    </span>
                </div>
                <div className='post_headerDescription'>
                    <p>{text}</p>
                </div>
            </div>
            <img src={image} alt="" />
            <div className='post_footer'>
                <ChatBubbleOutline fontSize='small' />
                <Repeat fontSize='small' />
                <FavoriteBorder fontSize='small' />
                <PublishOutlined fontSize='small' />
            </div>
        </div>
    </div>
  )
}

export default Post