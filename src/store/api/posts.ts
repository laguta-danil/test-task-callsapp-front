import { api } from './index';

export interface Posts {
    data: Post[] ;
    total: number;
}

export interface Post {
    id: number;
    description: string;
    title: string;
    pubDate: string;
    link: string;
    categories: [],
    authorId: number
}

export const postsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<Posts, any>({
            query: ({ page, itemsPerPage, order, orderBy, search  }) =>
                `posts/getAll?page=${page}&itemsPerPage=${itemsPerPage}&order=${order}&search=${search}`,
            providesTags: ['Post'],
        }),
        getPost: builder.query<Post, number>({
            query: (id) => `posts/one-post?id=${id}`,
            providesTags: ['Post'],
        }),
        addPost: builder.mutation<Post, Partial<Post>>({
            query(body) {
                return {
                    url: `posts/add`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['Post'],
        }),
        updatePost: builder.mutation<Post, Partial<Post>>({
            query(data) {
                return {
                    url: `posts/update?id${data.id}`,
                    method: 'PUT',
                    body: data,
                }
            },
            invalidatesTags: ['Post'],
        }),
        deletePost: builder.mutation<Post, any>({
            query: ( id ) => ({
                url: `posts/delete?id=${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Post'],
        }),
    }),
});

export const {
    useGetPostQuery,
    useGetPostsQuery,
    useAddPostMutation,
    useDeletePostMutation,
    useUpdatePostMutation
} = postsApi;
