import {
	PRIVATE_AZURE_AD_CLIENT_ID,
	PRIVATE_AZURE_AD_CLIENT_SECRET,
	PRIVATE_AZURE_AD_TENANT_ID,
	PRIVATE_BETTER_AUTH_SECRET,
	PRIVATE_GITHUB_CLIENT_ID,
	PRIVATE_GITHUB_CLIENT_SECRET
} from '$env/static/private';
import { betterAuth } from 'better-auth';
import { db } from './db/db';

export const auth = betterAuth({
	secret: PRIVATE_BETTER_AUTH_SECRET,
	database: {
		db,
		type: 'postgres'
	},
	socialProviders: {
		github: {
			clientId: PRIVATE_GITHUB_CLIENT_ID,
			clientSecret: PRIVATE_GITHUB_CLIENT_SECRET,
			redirectURI:
				'http://localhost:5173/api/auth/callback/github'
		},
		microsoft: {
			clientId: PRIVATE_AZURE_AD_CLIENT_ID,
			clientSecret: PRIVATE_AZURE_AD_CLIENT_SECRET,
			tenantId: PRIVATE_AZURE_AD_TENANT_ID,
			redirectURI:
				'http://localhost:5173/api/auth/callback/microsoft'
		}
	}
});
