

import { createServerClient } from '@supabase/ssr'
import { type Handle } from '@sveltejs/kit'
import sharp from 'sharp';

const supabaseURL: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseKEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseAdminKEY: string = import.meta.env.VITE_SUPABASE_ADMIN_KEY;

export const handle: Handle = async ({ event, resolve }) => {

    event.locals.supabase = createServerClient(supabaseURL, supabaseKEY, {
        cookies: {
            get: (key) => event.cookies.get(key),

            set: (key, value, options) => {
                event.cookies.set(key, value, { ...options, path: '/' })
            },
            remove: (key, options) => {
                event.cookies.delete(key, { ...options, path: '/' })
            },
        },
    })

    event.locals.supabaseAdmin = createServerClient(supabaseURL, supabaseAdminKEY, {
        cookies: {
            get: (key) => event.cookies.get(key),

            set: (key, value, options) => {
                event.cookies.set(key, value, { ...options, path: '/' })
            },
            remove: (key, options) => {
                event.cookies.delete(key, { ...options, path: '/' })
            },
        },
    })
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
                    const blob = new Blob([outputBuffer], { type: "image/webp" });
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

    event.locals.safeGetSession = async () => {
        const {
            data: { user },
            error,
        } = await event.locals.supabase.auth.getUser()
        if (error) {
            return { session: null, user: null }
        }

        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        return { session, user }
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        },
    })
}