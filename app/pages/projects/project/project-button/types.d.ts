interface ProjectButtonInfo {
	type: ProjectButtonType,
	text: string,
	link: string,
}

type ProjectButtonType = 'github' | 'curseforge' | 'modrinth' | 'other';