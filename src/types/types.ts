export interface Topic {
    name: string;
    index: number;
    href: string;
}

export interface GroupType {
    name: string;
    fullName?: string;
    child: string[];
    yOffset?: number;
}

export interface JobPosition {
    position: string
    bulletPoint: string[]
}