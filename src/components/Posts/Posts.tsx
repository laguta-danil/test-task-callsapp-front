import { Button, Grid, Pagination, Stack, Switch, TextField, Typography, } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../services/auth";
import { useGetPostsQuery } from "../../store/api/posts";
import PostCard from "./PostCard";

export default function Posts() {
    const navigate = useNavigate();
    let auth = useAuth();
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [order, setOrder] = useState('desc');
    const [search, setSearch] = useState('');
    const {data} = useGetPostsQuery({page, itemsPerPage, order, search});

    const onNewClick = () => navigate(`new`, {replace: true});

    const handleDateSort = () => {
        (order === 'desc' ? setOrder('asc') : setOrder('desc'))
    };

    return (
        <Box display='grid'>
            <Stack direction='column'>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={4}
                    alignItems="center" >
                    <TextField
                        label="Search"
                        name={'search'}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <h1>Posts</h1>
                    <Button color="warning" variant="outlined"
                            onClick={() => {
                                auth.signout(() => navigate("/login"));
                            }}
                    >
                        Sign out
                    </Button>
                </Stack>
                <Stack direction="row"
                       justifyContent="space-between"
                       spacing={2}
                       py={4}
                >
                    <Button onClick={() => onNewClick()} variant="outlined">Add new post</Button>
                    <Typography> Sort by date <Switch onClick={handleDateSort}/> </Typography>
                </Stack>
            </Stack>

            <Grid container spacing={2} border={1} borderColor={'#DCDCDC'} >
                {data?.data.map((post: any) => {
                    return (
                        <Grid item xs={8} sm={6} lg={4}>
                            <PostCard post={post}/>
                        </Grid>
                    )
                })}
            </Grid>
            <Box justifySelf='center' py={4}>
                <Pagination
                    count={10}
                    onChange={(e, value) => setPage(value)}
                />
            </Box>
        </Box>
    );
}
