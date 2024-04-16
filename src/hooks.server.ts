
import { createServerClient } from '@supabase/ssr'
import { redirect, type Handle } from '@sveltejs/kit'
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
        const maxQuality = 100;
        const inputImageBuffer = await fileObject.arrayBuffer();

        let quality = maxQuality;
        let outputBuffer = null;

        try {
            // Resize and crop the image to exactly 150x150 pixels
            outputBuffer = await sharp(Buffer.from(inputImageBuffer))
                .resize({ width: 150, height: 150, fit: 'cover' }) // Resize to cover 150x150
                .png({ quality: quality }) // Set PNG quality
                .toBuffer();

            const outputSizeKB = outputBuffer.length / 1024;

            // Check if the output size is within the target range
            if (outputSizeKB <= targetSizeKB) {
                const blob = new Blob([outputBuffer], { type: "image/png" });
                return blob;
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