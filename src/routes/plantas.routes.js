import { Router } from "express";
import { createCatalogItem, deleteCatalogItem, getCatalogItems, updateCatalogItem } from "../controllers/catalog.controller.js";
import { getExternalCatalogItems, getExternalItemDetail } from "../controllers/external.controller.js";

const router = Router();

// Get last 5 items in catalog
router.get('/plantas', getCatalogItems);

router.get('/plantas/external', getExternalCatalogItems);

router.get('/plantas/external/detail/:id', getExternalItemDetail);

router.post('/plantas', createCatalogItem);

router.delete('/plantas/:id', deleteCatalogItem);

router.put('/plantas/:id', updateCatalogItem);

export default router;