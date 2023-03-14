import { createMiddlewareSupabaseClient} from "@supabase/auth-helpers-nextjs";
import { NextResponse} from "next/server";

import type { NextRequest} from "next/server";
import type {Database} from "./database.types";

// middleware

export const middleware = async (req: NextRequest) => {
    const res = NextResponse.next();

    const supabase = createMiddlewareSupabaseClient<Database>({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    //未認証状態で新規投稿画面に遷移した場合は、ログイン画面にリダイレクト
    if (!session && req.nextUrl.pathname.startsWith('/blog/new')) {
        const redirectURL = req.nextUrl.clone();
        redirectURL.pathname = '/auth/login'
        return NextResponse.redirect(redirectURL);
    }

    return res
}