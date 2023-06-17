import express from "express";
import APIController from '../controller/APIController';

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/items', APIController.getAllItems); 
    router.post('/create-item', APIController.createNewItem); 
    router.put('/update-item', APIController.updateItem); 
    router.delete('/delete-item/:id', APIController.deleteItem); 

    return app.use('/api/v1/', router)
}


export default initAPIRoute;