import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box
} from '@mui/material';
import { useTheme } from '@mui/material';
import type { Post } from '@controllers/PostController';
import type { Comment } from '@controllers/CommentController';

interface PostProps {
  post: Post
  comments?: Comment[]
  commentId?: number
}

export default function Post({ post, comments, commentId }: PostProps) {
  const theme = useTheme();

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1">
          {post.title}
        </Typography>
        <Typography
          variant="body2"
          style={{
            marginBottom: '2%'
          }}
        >
          {post.body}
        </Typography>
        <Divider />
        {comments?.length > 0 &&
          <Box>
            <Typography variant="subtitle2">
              Comentários:
            </Typography>
            {comments.map((comment, key) => (
              <Box
                style={{
                  paddingLeft: 8,
                  backgroundColor: commentId === comment.id ? theme.palette.primary.dark : undefined,
                  color: commentId === comment.id ? theme.palette.primary.contrastText : undefined
                }}
                key={key}
              >
                <Typography variant="subtitle2">
                  {comment.name} ({comment.email})
                </Typography>
                <Typography
                  style={{
                    paddingLeft: 8
                  }}
                  variant="caption"
                >
                  {comment.body}
                </Typography>
              </Box>
            ))}
          </Box>}
      </CardContent>
    </Card>
  )
}
