export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  repo?: string;
  thumb?: string;
  tags: string[];
  color: string;
  icon: string;
  preview: 'iframe' | 'thumbnail';
  category: 'client' | 'product' | 'game';
}

/** Catalogue vitrine : focus recruteur / école (prod, stack moderne, preuves client). */
export const projects: Project[] = [
  {
    id: 'maison-ela',
    name: "La Maison d'Ela",
    tagline: "Chambre d'hôtes de charme en Dordogne",
    description:
      "Site vitrine pour une maison d'hôtes à Jumilhac-le-Grand : séjours thématiques, galerie photo, réservation et versions FR/EN.",
    url: 'https://www.lamaisondela.com',
    repo: 'https://github.com/hugodavion/lamaisondela',
    preview: 'thumbnail',
    tags: ['HTML/CSS', 'Galerie', 'Multilingue', 'SEO'],
    color: '#f0a8c8',
    icon: '🦋',
    category: 'client',
  },
  {
    id: 'quai-reves',
    name: 'Quai des Rêves',
    tagline: 'Ancienne gare sur le GR37, Bretagne',
    description:
      "Landing immersive pour une maison d'hôtes dans une gare rénovée : storytelling, chambres, carte OpenStreetMap et demande de réservation.",
    url: 'https://quai-des-reves.vercel.app/',
    repo: 'https://github.com/hugodavion/quaidesreves',
    preview: 'iframe',
    tags: ['Landing', 'Storytelling', 'OpenStreetMap', 'Vercel'],
    color: '#6898c8',
    icon: '🚂',
    category: 'client',
  },
  {
    id: 'etcbc',
    name: 'ETCBC',
    tagline: 'Charpente & construction bois',
    description:
      "Site professionnel pour une entreprise de charpente à Jumilhac-le-Grand : métiers, zone d'intervention, galerie de chantiers filtrable et devis.",
    url: 'https://www.etcbc-charpente.com/',
    repo: 'https://github.com/hugodavion/etcbc',
    preview: 'iframe',
    tags: ['Site pro', 'Galerie', 'SEO local', 'JavaScript'],
    color: '#c8a070',
    icon: '🪵',
    category: 'client',
  },
  {
    id: 'bulle',
    name: 'Bulle',
    tagline: 'Assistant IA embarquable pour sites web',
    description:
      'Widget IA greffable sur un site vitrine : chat contextuel, indexation du contenu, clés par domaine et déploiement Vercel.',
    url: 'https://bullechatbot.vercel.app',
    repo: 'https://github.com/hugodavion/bullechatbot',
    preview: 'iframe',
    tags: ['Next.js', 'AI SDK', 'Widget', 'Vercel'],
    color: '#a868e8',
    icon: '💬',
    category: 'product',
  },
  {
    id: 'bulletonsite',
    name: 'Bulle ton site',
    tagline: 'Sites vitrines pour artisans & PME',
    description:
      "Site commercial de l'agence : offres artisans/tourisme, carrousel de réalisations, mini-navigateurs intégrés et modules JS.",
    url: 'https://www.bulletonsite.com',
    repo: 'https://github.com/hugodavion/bulletonsite',
    preview: 'thumbnail',
    tags: ['Agence', 'Modules JS', 'Thèmes CSS', 'Vercel'],
    color: '#f0c060',
    icon: '🌐',
    category: 'product',
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getThumbnailUrl(project: Project): string {
  if (project.thumb) return project.thumb;
  return `/projects/${project.id}.jpg`;
}

export function canEmbedPreview(project: Project): boolean {
  return project.preview === 'iframe';
}

export function isRepoUrl(url: string): boolean {
  return url.includes('github.com');
}

export const STORAGE_KEY = 'agence-davio-discovered';

export function loadDiscovered(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

export function saveDiscovered(ids: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    /* ignore */
  }
}
