const AuthService = {
  async getPermissions(auth: any) {
    const permissions = auth?.payload?.permissions || [];
    return permissions;
  },
};

export default AuthService;
