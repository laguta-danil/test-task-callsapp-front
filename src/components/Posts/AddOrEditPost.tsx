import { useState } from "react";
import * as React from "react";
import {Autocomplete, Button, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import { useAddPostMutation, useGetPostQuery, useUpdatePostMutation } from "../../store/api/posts";
import {usePressEcs} from "../../hooks/usePressEsc";


export default function AddOrEditPost() {
    const navigate = useNavigate()
    const [postAddPost]: any = useAddPostMutation()
    const [putEditPost]: any = useUpdatePostMutation()
    const {id}: any = useParams()
    const {data}: any = useGetPostQuery(id, {skip: !id})
    const [targetCategories, setTargetCategories]: any = useState<object>([])

    usePressEcs('/')

    const initialValues =  {
            title: data?.title || '',
            description: data?.description || '',
            link: data?.link || '',
            id: data?.id,
            imageUrl: data?.imageUrl || '',
            categories: data?.categories || [],
        }

    const categories = data?.categories ? [...data?.categories] : ['Pets', 'School', 'Academy', 'Sport', 'TV', 'Other']


    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit: (values) => {
            if (data?.id) {
                putEditPost({...values, id: Number(id)});
            } else {
                values.categories = targetCategories
                postAddPost({...values});
            }
            navigate('/', {replace: true});
        },
    });


    return (
        <Box sx={{width: '600px', mx: 'auto'}}>
            <h2>{id ? 'Edit' : 'Add'} post</h2>
            <form onSubmit={formik.handleSubmit}>
                <Stack direction='column' justifyContent='flex-start' alignItems='start' spacing={2}>
                    <TextField
                        id='title'
                        label='title'
                        variant='outlined'
                        size='small'
                        fullWidth
                        {...formik.getFieldProps('title')}
                        required
                    />
                    <TextField
                        id='description'
                        label='description'
                        variant='outlined'
                        rows={8}
                        multiline
                        size='small'
                        fullWidth
                        {...formik.getFieldProps('description')}
                        required
                    />
                    <TextField
                        id='link'
                        label='Limk to post'
                        variant='outlined'
                        size='small'
                        rows={2}
                        multiline
                        fullWidth
                        {...formik.getFieldProps('link')}
                        required
                    />
                    <TextField
                        id='imageUrl'
                        label='Link to image'
                        variant='outlined'
                        rows={2}
                        multiline
                        size='small'
                        fullWidth
                        {...formik.getFieldProps('imageUrl')}
                        required
                    />
                    <Autocomplete
                        multiple
                        limitTags={2}
                        id="categories"
                        options={categories}
                        size="small"
                        getOptionLabel={(option) => option}
                        value={targetCategories}
                        onChange={(event: any, newValue: any) => {
                            setTargetCategories(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="tags" placeholder="categorie" />
                        )}
                        sx={{ width: '100%' }}
                    />
                    <Stack direction="row"
                           justifyContent="space-between"
                           alignItems="center"
                           width="100%" spacing={1}>
                        <Button
                            variant='outlined'
                            type='button'
                            color='error'
                            onClick={() => {
                                navigate('/');
                                formik.resetForm();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant='outlined' type='submit'>
                            Save
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    )
}