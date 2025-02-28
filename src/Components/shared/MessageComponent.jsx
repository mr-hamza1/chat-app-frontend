import { Box, Typography } from '@mui/material';
import React, { memo } from 'react'
import { lightBlue, blue} from '../constants/color';
import moment from 'moment';
import { fileFormat } from '../../Lib/features';
import RenderAttachment from './RenderAttachments';
import {motion} from 'framer-motion'

const MessageComponent = ({ message, user }) => {
    
    const { content, sender, createdAt, attachments = [] } = message;

    const timeAgo = moment(createdAt).fromNow();

    const sameSender = sender?._id === user?._id;
    return (
        <motion.div
        initial={{ opacity: 0, x:"-100%" }}
        whileInView={{ opacity: 1, x:"0" }}
            style={{
                alignSelf: sameSender ? 'flex-end ' : 'flex-start',
                backgroundColor: sameSender ?  blue: 'white',     
                color: sameSender ?  "white": 'black', 
                borderRadius: "5px",
                padding: "0.5rem",
                width: "fit-content"
            }}>
            
            {!sameSender && <Typography variant="caption" color={lightBlue} fontWeight={"600"}>
                   {sender.name}
                </Typography>
            }

            {content && <Typography >
                   {content}
                </Typography>
            }

            {attachments.length > 0 && attachments.map((attachment, i) => {
                const url = attachment.url;
                const file = fileFormat(url);

                return (
                    <Box key={i}>
                        <a
                            href={url}
                            target="_blank"
                            download
                            style={{
                            color: "black",
                            }}
                        >
                            {RenderAttachment(file, url)}
                        </a>
                    </Box>
                )
            })}

            <Typography variant='caption' color='text.secondary'>{timeAgo}</Typography>
        </motion.div>
    );
}

export default memo(MessageComponent);