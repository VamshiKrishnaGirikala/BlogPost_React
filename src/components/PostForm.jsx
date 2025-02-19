import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../store/postsSlice';

const PostForm = ({ isEdit, handlePostFormDisplay, post }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (isEdit && post) {
            formik.setValues(post);
        }
    }, [post, isEdit]);
    const validate = values => {
        const errors = {};
        if (!values.slug) {
            errors.slug = 'Required';
        }
        if (!values.url) {
            errors.url = 'Required';
        }
        if (!values.title) {
            errors.title = 'Required';
        }
        if (!values.content) {
            errors.content = 'Required';
        }
        if (!values.image) {
            errors.image = 'Required';
        }
        if (!values.image) {
            errors.image = 'Required';
        }
        if (!values.thumbnail) {
            errors.thumbnail = 'Required';
        }
        if (!values.status) {
            errors.status = 'Required';
        }
        if (!values.category) {
            errors.category = 'Required';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            slug: '',
            url: '',
            title: '',
            content: '',
            image: '',
            thumbnail: '',
            status: '',
            category: ''
        },
        validate,
        onSubmit: values => {
            savePost(values);
        },
    });

    const savePost = (values) => {
        if (isEdit) {
            const payload = JSON.parse(JSON.stringify(values));
            delete payload.comments;
            delete payload.updatedAt;
            delete payload.publishedAt;
            delete payload.userId;
            dispatch(updatePost({ id: post.id, payload }));
        } else {
            dispatch(createPost(values));
        }
    }

    const handleCancelBtn = () => {
        if (isEdit) {
            handlePostFormDisplay();
        } else {
            // reset the form
        }
    }
    return (
        <div className={!isEdit ? 'row justify-content-center' : 'col-6'}>
            <div className={!isEdit ? 'col-6' : ''}>
                <h3 className='text-center m-3'>{isEdit ? 'Edit' : 'Create'} Post</h3>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="row mb-3">
                        <label htmlFor="slug" className="col-sm-2 col-form-label">Slug</label>
                        <div className="col-sm-10">
                            <input
                                className='form-control'
                                id="slug"
                                name="slug"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.slug}
                            />
                            {formik.errors.slug ? <div>{formik.errors.slug}</div> : null}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="url" className="col-sm-2 col-form-label">Url</label>
                        <div className="col-sm-10">
                            <input
                                className='form-control'
                                id="url"
                                name="url"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.url}
                            />
                            {formik.errors.url ? <div>{formik.errors.url}</div> : null}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input
                                className='form-control'
                                id="title"
                                name="title"
                                type="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                            {formik.errors.title ? <div>{formik.errors.title}</div> : null}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="content" className="col-sm-2 col-form-label">Content</label>
                        <div className="col-sm-10">
                            <input
                                className='form-control'
                                id="content"
                                name="content"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.content}
                            />
                            {formik.errors.content ? <div>{formik.errors.content}</div> : null}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="image" className="col-sm-2 col-form-label">Image</label>
                        <div className="col-sm-10">
                            <input
                                className='form-control'
                                id="image"
                                name="image"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.image}
                            />
                            {formik.errors.image ? <div>{formik.errors.image}</div> : null}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="thumbnail" className="col-sm-2 col-form-label">Thumbnail</label>
                        <div className="col-sm-10">
                            <input
                                className='form-control'
                                id="thumbnail"
                                name="thumbnail"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.thumbnail}
                            />
                            {formik.errors.thumbnail ? <div>{formik.errors.thumbnail}</div> : null}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <input
                                className='form-control'
                                id="status"
                                name="status"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.status}
                            />
                            {formik.errors.image ? <div>{formik.errors.image}</div> : null}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                        <div className="col-sm-10">
                            <input
                                className='form-control'
                                id="category"
                                name="category"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.category}
                            />
                            {formik.errors.category ? <div>{formik.errors.category}</div> : null}
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <button type="button" className='btn btn-primary w-100 m-2' onClick={handleCancelBtn}>Cancel</button>
                        <button type="submit" className='btn btn-primary w-100 m-2'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostForm