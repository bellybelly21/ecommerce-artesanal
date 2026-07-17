import type { Product } from '../types/index';

export const initialProducts: Product[] = [
  { id: 1, name: "Miel de Ulmo Orgánica", category: "Miel", description: "Miel 100% pura del sur de Chile.", price: 8000, stock: 15, image: "https://images.unsplash.com/photo-1613548058193-1cd24c1bebcf?w=500" },
  { id: 2, name: "Poncho de Lana de Oveja", category: "Tejidos", description: "Tejido a telar por artesanas locales.", price: 45000, offerPrice: 39990, stock: 5, image: "https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=500" },
  { id: 3, name: "Cerveza Artesanal IPA (Pack 4)", category: "Cervezas", description: "Cerveza de autor con notas cítricas.", price: 12000, stock: 20, image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500" },
  { id: 4, name: "Aros de Plata y Lapislázuli", category: "Artesanías", description: "Orfebrería fina hecha a mano", price: 25000, stock: 8, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500" },
  { id: 5, name: "Mermelada de Murta", category: "Conservas", description: "Receta tradicional del sur.", price: 5000, stock: 30, image: "https://images.unsplash.com/photo-1505253304499-671c55fb57fe?w=500" },
  { id: 6, name: "Manta a Telar Decorativa", category: "Tejidos", description: "Ideal para pie de cama o sillón.", price: 32000, offerPrice: 28000, stock: 3, image: "https://images.unsplash.com/photo-1704966030514-0fa48f1e6c5e?w=500" },
];