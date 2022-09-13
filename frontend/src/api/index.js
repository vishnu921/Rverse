import axios from 'axios';
const API = axios.create({baseURL: 'https://rverse.herokuapp.com/api/'});

API.interceptors.request.use((req)=>{
    const user = JSON.parse(localStorage.getItem('profile'));
    
    if(user){
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
})

export const fetchMyReviews = (_id)=> API.get(`/reviews/myreviews/${_id}`);
export const fetchReview = (id)=> API.get(`/reviews/${id}`);
export const fetchReviews = (page)=> API.get(`/reviews?page=${page}`);
export const fetchReviewsBySearch = (searchQuery)=> API.get(`/reviews/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createReview = (newReview)=> API.post('/reviews',newReview);
export const updateReview = (id,updatedReview)=>API.patch(`/reviews/${id}`, updatedReview);
export const deleteReview = (id)=> API.delete(`/reviews/${id}`);
export const likeReview = (id)=> API.patch(`/reviews/${id}/likeReview`);
export const comment = (value,id)=> API.post(`/reviews/${id}/commentReview`,{value});


export const signIn = (formData)=> API.post('/user/login',formData);
export const signUp = (formData)=> API.post('/user/signup',formData);