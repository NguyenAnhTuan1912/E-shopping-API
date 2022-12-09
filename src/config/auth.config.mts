type AuthConfig = {
	tokenSecret: string;
	emailPattern: RegExp;
	usernamePattern: RegExp;
	tokenTimeLife: number;
}

const authConfig: AuthConfig = {
	tokenSecret: "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6",
	emailPattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
	usernamePattern: /(^[a-zA-Z_]+[a-zA-Z_.]+[a-zA-Z0-9_]+$)|(^[a-zA-Z_]+[a-zA-Z_.]+[0-9]+$)/,
	tokenTimeLife: 60
}

export default authConfig;