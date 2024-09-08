const AuthService = {
  async getPermissions(auth: any) {
    return auth?.payload?.permissions || [];
  },
};

export default AuthService;
