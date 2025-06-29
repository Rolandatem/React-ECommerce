import type ICheckoutSummaryProps from "@/tools/interfaces/ICheckoutSummaryProps";
import styles from '../styles/checkoutSummary.module.scss';
import { useEffect, useState } from "react";
import type ICartTotals from "@/tools/interfaces/ICartTotals";
import currencyFormatter from "@/tools/functions/currencyFormatter";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import BusyIndicator from "@/pages/common/components/BusyIndicator";

/** Checkout summary for the checkout page. */
const CheckoutSummary = ({cart, canCheckout, onCompleteCheckout, loadingOrderDetail}: ICheckoutSummaryProps) => {
    const [cartTotals, setCartTotals] = useState<ICartTotals>({cost: 0, savings: 0, subTotal: 0, taxes: 0, cartTotal: 0})

    //===========================================================================================================================
    /** Watches the cart and re-calculates shopping cart totals on load/change. */
    useEffect(() => {
        if (!cart) { return; }

        const cost = cart.lineItems.reduce((price, lineItem) => price + lineItem.totalOriginalPrice, 0);
        const subTotal = cart.lineItems.reduce((price, lineItem) => price + lineItem.totalSalePrice, 0);
        const savings = cost - subTotal;
        const tax = subTotal * .07;
        const cartTotal = subTotal + tax;

        setCartTotals({
            cost: cost,
            subTotal: subTotal,
            savings: savings,
            taxes: tax,
            cartTotal: cartTotal
        })
    }, [cart])

    //===========================================================================================================================
    return(
        <Card data-bs-theme="light">
            <Card.Header className="fs-3 fw-bold font-roboto">Summary</Card.Header>
            <Card.Body>
                <hr />
                <table className={`text-end w-100 ms-auto font-roboto ${styles.tableLgAuto}`} style={{tableLayout: 'fixed'}}>
                    <tbody>
                        <tr>
                            <td>Cost:</td>
                            <td className="ps-4">{currencyFormatter.format(cartTotals.cost)}</td>
                        </tr>
                        <tr>
                            <td>Savings</td>
                            <td>{currencyFormatter.format(cartTotals.savings)}</td>
                        </tr>
                        <tr>
                            <td>Subtotal</td>
                            <td>{currencyFormatter.format(cartTotals.subTotal)}</td>
                        </tr>
                        <tr className="border-bottom">
                            <td>Taxes (7%)</td>
                            <td>{currencyFormatter.format(cartTotals.taxes)}</td>
                        </tr>
                        <tr className="fw-bold">
                            <td className="pt-2">Total</td>
                            <td className="pt-2 text-cyan">{currencyFormatter.format(cartTotals.cartTotal)}</td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                <Button className="w-100" disabled={!canCheckout} onClick={onCompleteCheckout}>Complete Checkout</Button>

                {
                    loadingOrderDetail && <BusyIndicator />
                }
            </Card.Body>
        </Card>
    )
}

export default CheckoutSummary;