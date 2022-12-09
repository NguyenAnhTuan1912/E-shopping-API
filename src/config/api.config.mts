type ApiConfig = {
	version: string;
	apiBaseUrl: string;
	authBaseUrl: string;
}

const apiConfig: ApiConfig = {
	version: "1.0",
	apiBaseUrl: "api",
	authBaseUrl: "auth"
};

export default apiConfig;