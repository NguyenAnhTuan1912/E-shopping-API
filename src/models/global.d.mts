declare global {
	type RouteInfoModel = {
		route: string;
		description: string;
	}

	type ProductModel = {
		id: string;
		name: string;
		category: string;
		price: number;
		isDiscount: boolean;
		discountPercentInDecimal: number;
		productStatus: string;
	}

	type UserModel = {
		id: string;
		username: string;
		password: string;
		email: string;
		altername: string;
	}

	type JWTPayloadModel = {
		name: string;
		sub: string;
		exp: number;
		fullExp: number; // Dev only
		iat?: number;
	}
}

export {}