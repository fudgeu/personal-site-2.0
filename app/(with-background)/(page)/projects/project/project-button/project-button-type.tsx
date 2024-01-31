export type ProjectButtonType = 'github' | 'curseforge' | 'modrinth' | 'other';

export type ProjectButtonInfo = {
  type: ProjectButtonType,
  text: string,
  link: string,
};
