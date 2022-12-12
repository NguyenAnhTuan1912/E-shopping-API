declare global {
	type RouteInfoModel = {
		route: string;
		description: string;
	}

	type TokenModel = {
		id: string;
		userId: string;
		value: string;
		type: string;
		expireAt: string;
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

	type JWTIDPayloadModel = {
		name: string;
		sub: string;
		exp: number;
		fullExp: number; // Dev only
		iat?: number;
	}

	type JWTAccessPayloadModel = {
		sub: string;
		exp: number;
		scope: string;
		fullExp: number; // Dev only
		iat?: number;
	}

	type NotificationModel = {
		title: string;
		message: string;
		from: string;
	}
}

export {}