import { createServerClient } from '@supabase/ssr';
import { type Handle } from '@sveltejs/kit';
import sharp from 'sharp';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import type { SupabaseJwt } from '$lib/types';
import type { Session } from '@supabase/supabase-js';
import { sequence } from '@sveltejs/kit/hooks';

const supabaseURL: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseKEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseAdminKEY: string = import.meta.env.VITE_SUPABASE_ADMIN_KEY;
const user = process.env.GMAIL_EMAIL;
const pass = process.env.GMAIL_PWS;
const jwtSecret = import.meta.env.VITE_JWT_SECRET_KEY;

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user,
		pass
	}
});

transporter.verify((error, success) => {
	if (error) {
		console.error('Error setting up mailer:', error);
	} else {
		console.log('The mailer is set and ready to fire!');
	}
});

dotenv.config();

export const supabase: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(supabaseURL, supabaseKEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookies) => {
				cookies.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});

	event.locals.supabaseAdmin = createServerClient(supabaseURL, supabaseAdminKEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookies) => {
				cookies.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});
	event.locals.compressImage = async (fileObject, targetSizeKB = 300) => {
		const maxWidth = 150;
		const maxHeight = 150;
		let quality = 90; // Initial quality setting
		let outputBuffer = null;

		try {
			// Read the input image buffer
			const inputImageBuffer = await fileObject.arrayBuffer();

			// Resize and compress loop
			while (quality > 0) {
				// Resize and compress the image to WebP format
				outputBuffer = await sharp(inputImageBuffer)
					.resize({ width: maxWidth, height: maxHeight, fit: 'cover' })
					.toFormat('webp', { quality: quality })
					.toBuffer();

				// Calculate output size in KB
				const outputSizeKB = outputBuffer.length / 1024;

				// Check if output size meets the target
				if (outputSizeKB <= targetSizeKB) {
					const blob = new Blob([outputBuffer], { type: 'image/webp' });
					return blob;
				}

				// Reduce quality for next iteration
				quality -= 10;
			}
		} catch (error) {
			console.error('Error compressing image:', error);
		}

		return null; // Return null if image processing fails or target size not achieved
	};

	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();

		if (!session) return { session: null, user: null };

		try {
			const decoded = jwt.verify(session.access_token, jwtSecret) as SupabaseJwt;
			const validated_session: Session = {
				access_token: session.access_token,
				refresh_token: session.refresh_token,
				expires_at: decoded.exp,
				expires_in: decoded.exp - Math.round(Date.now() / 1000),
				token_type: 'bearer',
				user: {
					role: decoded.role,
					app_metadata: decoded.app_metadata ?? {},
					aud: 'authenticated',
					created_at: '',
					id: decoded.sub,
					user_metadata: decoded.user_metadata
				}
			};

			return { session: validated_session, user: validated_session.user };
		} catch (err) {
			return { session: null, user: null };
		}
	};

	event.locals.transporter = transporter;

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};

const authGuard: Handle = async ({ event, resolve }) => {
	const { session, user } = await event.locals.getSession();
	event.locals.session = session;
	event.locals.user = user;

	return resolve(event);
};

export const handle: Handle = sequence(supabase, authGuard);
