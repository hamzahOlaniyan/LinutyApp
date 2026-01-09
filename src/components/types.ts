export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      fname: string;
      lname: string;
      emailVerifiedAt: string;
      onboarding: string;
      photo: string;
      role: string;
      verifiedAt: string | null;
    };
  };
};

export type LoginParams = {
  email?: string | undefined;
  password?: string | undefined;
};
