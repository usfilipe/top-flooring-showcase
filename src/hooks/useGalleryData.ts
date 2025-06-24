
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
        console.log('Fetching gallery data...');
        const response = await fetch('/gallery-config.xml');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const xmlText = await response.text();
        console.log('XML text length:', xmlText.length);
        console.log('XML preview:', xmlText.substring(0, 200));
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Check for XML parsing errors
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
          throw new Error('XML parsing error: ' + parserError.textContent);
        }

        // Parse categories
        const categories: GalleryCategory[] = [];
        const categoryNodes = xmlDoc.querySelectorAll('category');
        console.log('Found category nodes:', categoryNodes.length);
        
        categoryNodes.forEach((node) => {
          const category = {
            id: node.getAttribute('id') || '',
            name: node.getAttribute('name') || '',
          };
          console.log('Adding category:', category);
          categories.push(category);
        });

        // Parse projects
        const projects: GalleryProject[] = [];
        const projectNodes = xmlDoc.querySelectorAll('project');
        console.log('Found project nodes:', projectNodes.length);
        
        projectNodes.forEach((node) => {
          const images: GalleryImage[] = [];
          const imageNodes = node.querySelectorAll('image');
          console.log('Found image nodes for project:', imageNodes.length);
          
          imageNodes.forEach((imgNode) => {
            const image = {
              src: imgNode.getAttribute('src') || '',
              alt: imgNode.getAttribute('alt') || '',
            };
            console.log('Adding image:', image.src);
            images.push(image);
          });

          const project = {
            id: node.getAttribute('id') || '',
            title: node.getAttribute('title') || '',
            category: node.getAttribute('category') || '',
            description: node.getAttribute('description') || '',
            images,
          };
          console.log('Adding project:', project.title, 'with', project.images.length, 'images');
          projects.push(project);
        });

        const finalData = { categories, projects };
        console.log('Final data:', finalData);
        console.log('Categories count:', categories.length);
        console.log('Projects count:', projects.length);
        
        setData(finalData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading gallery data:', err);
        setError('Failed to load gallery data: ' + (err instanceof Error ? err.message : 'Unknown error'));
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  return { data, loading, error };
};
