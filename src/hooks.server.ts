// Resources:
// https://github.com/markjaquith/clerk-sveltekit
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { handleClerk } from 'clerk-sveltekit/server'
import { CLERK_SECRET_KEY } from '$env/static/private'
import dotenv from "dotenv";

dotenv.config();


export const handle: Handle = sequence(
	handleClerk(CLERK_SECRET_KEY, {
		debug: true,
		protectedPaths: ['/learn'],
		signInUrl: '/',
	})
)