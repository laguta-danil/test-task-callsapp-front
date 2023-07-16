import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePressEcs } from '../../hooks/usePressEsc';
import { useDeletePostMutation } from '../../store/api/posts';

export default function PostCard(props: any) {
  const navigate = useNavigate();
  const [deleteApp] = useDeletePostMutation();

  const { post } = props;

  usePressEcs('/');

  const onEditClick = () => {
    navigate(`${post.id}`, { replace: true });
  };
  const onDeleteClick = () => deleteApp(`${post.id}`);

  const postDate = new Date(post.pubDate).toDateString();

  return (
    <Card sx={{ maxWidth: 550, height: 600, display: 'grid' }}>
      <CardHeader
        title={post.title}
        subheader={postDate}
        titleTypographyProps={{ variant: 'h6' }}
        sx={{ height: 120 }}
      />
      <CardMedia
        component='img'
        height='194'
        image={post.imageUrl}
        alt='Paella dish'
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {post.description}
        </Typography>
      </CardContent>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='flex-end'
        p={2}
      >
        <Stack direction='row' spacing={2}>
          <Button variant='outlined' onClick={onEditClick}>
            {' '}
            Edit
          </Button>
          <Button variant='outlined' color='error' onClick={onDeleteClick}>
            {' '}
            Delete
          </Button>
        </Stack>
        <a href={post.link}>Learn more</a>
      </Stack>
    </Card>
  );
}
