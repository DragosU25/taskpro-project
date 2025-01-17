export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserName = (state) => state.auth.user.name;
export const selectAvatarPath = (state) => state.auth.user.avatar;
export const selectTheme = (state) => state.auth.user.theme;
export const selectEmail = (state) => state.auth.user.email;
