import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin/modificar-producto/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'productos/:categoria',
    renderMode: RenderMode.Server 
  },
  {
    path: 'admin/productos/:categoria',
    renderMode: RenderMode.Server
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
