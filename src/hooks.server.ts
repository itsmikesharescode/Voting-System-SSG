
import { createServerClient } from '@supabase/ssr'
import { redirect, type Handle } from '@sveltejs/kit'

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