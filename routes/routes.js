import express from 'express';
import {uploadImage} from '../controller/image-controller.js'
import upload from '../utils/upload.js';
import { downloadImages } from '../controller/image-controller.js';
const router=express.Router();

router.post('/upload',upload.any('files'), uploadImage);

router.get('/files/:filesId',downloadImages)

export default router;