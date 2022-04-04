export interface NewProjectInterface {
    // interface for creating new project
    name: string,
}
export interface ProjectInterface {
    id: number,
    name: string,
    updated_at: string,
    created_at: string,
}

export class Project implements ProjectInterface {
    id: number;
    name: string;
    updated_at: string;
    created_at: string;

    constructor(projectData: ProjectInterface) {
        this.id = projectData.id;
        this.name = projectData.name;
        this.updated_at = projectData.updated_at;
        this.created_at = projectData.created_at;
    }  
}