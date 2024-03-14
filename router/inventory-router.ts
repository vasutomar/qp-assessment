import express from "express";
import {
    health,
    addItem,
    viewInventory,
    removeItem,
    updateItem,
    manageCount,
} from "../controllers/inventory-controller";

export const inventoryRouter = express.Router();
inventoryRouter.get("/inventory/health", health);
inventoryRouter.put("/inventory/add", addItem);
inventoryRouter.get("/inventory/view", viewInventory);
inventoryRouter.delete("/inventory/remove", removeItem);
inventoryRouter.post("/inventory/update", updateItem);
inventoryRouter.post("/inventory/manageCount", manageCount);

