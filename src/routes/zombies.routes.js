import { Router } from "express";
import { createCatalogItem, deleteCatalogItem, getCatalogItems, updateCatalogItem } from "../controllers/catalog.controller.js";
import { getExternalCatalogItems, getExternalItemDetail } from "../controllers/external.controller.js";

const router = Router();

router.get('/zombies', getCatalogItems);

router.get('/zombies/external', getExternalCatalogItems);

router.get('/zombies/external/detail/:id', getExternalItemDetail);

router.post('/zombies', createCatalogItem);

router.delete('/zombies/:id', deleteCatalogItem);

router.put('/zombies/:id', updateCatalogItem);

export default router;