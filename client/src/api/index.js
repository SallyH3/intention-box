import axios from 'axios';

const url = 'http://localhost:5000/intentions';

export const fetchIntentions = () => axios.get(url);
export const createIntention = (newIntention) => axios.post(url, newIntention);
export const updateIntention = (id, updatedIntention) => axios.put(`${url}/${id}`, updatedIntention);
export const deleteIntention = (id) => axios.delete(`${url}/${id}`);