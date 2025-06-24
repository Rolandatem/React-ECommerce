import { createContext } from "react";
import type ICartQuantityContext from "../interfaces/ICartQuantityContext";

const CartQuantityContext = createContext<ICartQuantityContext | null>(null);

export default CartQuantityContext;