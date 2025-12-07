// __mocks__/supabase.ts
export const supabase = {
   auth: {
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
   },
};

export default supabase;
