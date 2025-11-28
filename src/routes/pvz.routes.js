import { Router } from "express";
import { createCatalogItemPlants, deleteCatalogItemPlants, getCatalogItemsPlants, updateCatalogItemPlants } from "../controllers/internal.controller.js";

import { getExternalCatalogItems, getExternalItemDetail } from "../controllers/external.controller.js";

const router = Router();
//Rutas para las plantas
router.get('/', getCatalogItemsPlants);

router.get('/external', getExternalCatalogItems);

router.get('/external/detail/:name', getExternalItemDetail);

router.post('/', createCatalogItemPlants);

router.delete('/:id', deleteCatalogItemPlants);

router.put('/:id', updateCatalogItemPlants);


export default router;