
import { useState, useEffect } from 'react';

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: string;
  description: string;
  images: GalleryImage[];
}

export interface GalleryCategory {
  id: string;
  name: string;
}

export interface GalleryData {
  categories: GalleryCategory[];
  projects: GalleryProject[];
}

export const useGalleryData = () => {
  const [data, setData] = useState<GalleryData>({ categories: [], projects: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch('/gallery-config.xml');
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

        // Parse categories
        const categories: GalleryCategory[] = [];
        const categoryNodes = xmlDoc.querySelectorAll('category');
        categoryNodes.forEach((node) => {
          categories.push({
            id: node.getAttribute('id') || '',
            name: node.getAttribute('name') || '',
          });
        });

        // Parse projects
        const projects: GalleryProject[] = [];
        const projectNodes = xmlDoc.querySelectorAll('project');
        projectNodes.forEach((node) => {
          const images: GalleryImage[] = [];
          const imageNodes = node.querySelectorAll('image');
          imageNodes.forEach((imgNode) => {
            images.push({
              src: imgNode.getAttribute('src') || '',
              alt: imgNode.getAttribute('alt') || '',
            });
          });

          projects.push({
            id: node.getAttribute('id') || '',
            title: node.getAttribute('title') || '',
            category: node.getAttribute('category') || '',
            description: node.getAttribute('description') || '',
            images,
          });
        });

        setData({ categories, projects });
        setLoading(false);
      } catch (err) {
        setError('Failed to load gallery data');
        setLoading(false);
        console.error('Error loading gallery data:', err);
      }
    };

    fetchGalleryData();
  }, []);

  return { data, loading, error };
};
