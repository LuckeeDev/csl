import { ProductDiscount } from '@prisma/client';
import { ReactNode } from 'react';
import { OmitDates } from 'types/omit';

export default function generateDiscountsDescription(
	discounts: (OmitDates<ProductDiscount> & {
		requiredCategory: { name: string };
		discountedCategory: { name: string };
	})[]
): ReactNode {
	const listItems = discounts
		.map((discount) => {
			return `Acquistando ${discount.requiredQuantity} prodotti della categoria "${discount.requiredCategory.name}", riceverai uno sconto del ${discount.discountPercentage}% su ${discount.discountedQuantity} prodotti della categoria "${discount.discountedCategory.name}".`;
		})
		.map((description, index) => (
			<p style={{ margin: 0 }} key={index}>
				{description}
			</p>
		));

	return <>{listItems}</>;
}
