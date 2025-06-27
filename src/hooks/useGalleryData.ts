
import { useState, useEffect } from 'react';

export interface GalleryCategory {
  id: string;
  name: string;
}

export interface GalleryImage {
  id: string;
  category: string;
  title: string;
  description: string;
  src: string;
}

export interface GalleryData {
  categories: GalleryCategory[];
  images: GalleryImage[];
}

export const useGalleryData = () => {
  const [data, setData] = useState<GalleryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        const response = await fetch('/gallery-config.xml');
        if (!response.ok) {
          throw new Error('Failed to load gallery configuration');
        }
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Check for parsing errors
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
          throw new Error(`XML parsing error: ${parseError.textContent}`);
        }

        // Parse categories
        const categoryElements = xmlDoc.querySelectorAll('category');
        const categories: GalleryCategory[] = Array.from(categoryElements).map(el => ({
          id: el.getAttribute('id') || '',
          name: el.getAttribute('name') || ''
        }));

        // Parse images
        const imageElements = xmlDoc.querySelectorAll('image');
        const images: GalleryImage[] = Array.from(imageElements).map(el => ({
          id: el.getAttribute('id') || '',
          category: el.getAttribute('category') || '',
          title: el.getAttribute('title') || '',
          description: el.getAttribute('description') || '',
          src: el.getAttribute('src') || ''
        }));

        setData({ categories, images });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadGalleryData();
  }, []);

  return { data, loading, error };
};
