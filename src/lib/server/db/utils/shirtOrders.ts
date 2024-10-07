// IMPORTED DEP-MODULES
import { and, eq } from 'drizzle-orm';
// IMPORTED MODULES
import { db, shirtOrders } from '..';

// -- FUNCTIONS -- //

export async function getShirtTotalSold(code: string) {
	const orders = await db
		.select({ id: shirtOrders.id })
		.from(shirtOrders)
		.where(and(eq(shirtOrders.code, code), eq(shirtOrders.isPaymentConfirmed, true)));

	return orders.length;
}
