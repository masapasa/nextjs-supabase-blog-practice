'use client'

import React, {createContext, useContext, useState} from "react";
import {createClient} from "../../utils/supabase-browser";

import type {SupabaseClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "../../utils/database.types";

type SupabaseContext = {
    supabase: SupabaseClient<Database>
};

//context

const Context = createContext<SupabaseContext>(null!);

// provider
export default function SupabaseProvider({children}: { children: React.ReactNode }) {
    const [supabase] = useState(() => createClient());

    return (
        <Context.Provider value={{supabase}}>
            <>{children}</>
        </Context.Provider>
    )
};

// supabase client
export const useSupabase = () => useContext(Context)