export const selectProject = (state) => state.project.project;

export const selectName = (state) => selectProject(state).name;
export const selectIcon = (state) => selectProject(state).icon;
export const selectBackground = (state) => selectProject(state).background;
