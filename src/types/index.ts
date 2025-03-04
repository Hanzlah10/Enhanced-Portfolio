
export interface Project {
  id: string;
  Images: string[];
  description: string;
  github_link: string;
  live_link: string;
  name: string;
  tagline: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
}
