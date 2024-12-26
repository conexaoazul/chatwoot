import settings from './settings/settings.routes';
import conversation from './conversation/conversation.routes';
import { routes as searchRoutes } from '../../modules/search/search.routes';
import { routes as contactRoutes } from './contacts/routes';
import { routes as notificationRoutes } from './notifications/routes';
import { routes as inboxRoutes } from './inbox/routes';
import { frontendURL } from '../../helper/URLHelper';
import helpcenterRoutes from './helpcenter/helpcenter.routes';
const IframePage = () => import('dashboard/components/widgets/DashboardApp/IframePage.vue');
const IframeConector = () => import('dashboard/components/widgets/DashboardApp/IframeConector.vue');
const IframeCrm = () => import('dashboard/components/widgets/DashboardApp/IframeCrm.vue');
const AppContainer = () => import('./Dashboard.vue');
const Captain = () => import('./Captain.vue');
const Suspended = () => import('./suspended/Index.vue');

export default {
  routes: [
    ...helpcenterRoutes.routes,
    {
      path: frontendURL('accounts/:account_id'),
      component: AppContainer,
      children: [
        {
          path: frontendURL('accounts/:accountId/captain'),
          name: 'captain',
          component: Captain,
          meta: {
            permissions: ['administrator', 'agent', 'custom_role'],
          },
        },
        {
          path: 'iframe',
          name: 'iframe',
          component: IframePage,
          meta: {
            permissions: ['administrator', 'agent'],
          },
        },
        {
          path: 'iframeConector',
          name: 'iframeConector',
          component: IframeConector,
          meta: {
            permissions: ['administrator', 'agent'],
          },
        },
        {
          path: 'IframeCrm',
          name: 'IframeCrm',
          component: IframeCrm,
          meta: {
            permissions: ['administrator', 'agent'],
          },
        },
        ...inboxRoutes,
        ...conversation.routes,
        ...settings.routes,
        ...contactRoutes,
        ...searchRoutes,
        ...notificationRoutes,
      ],
    },
    {
      path: frontendURL('accounts/:accountId/suspended'),
      name: 'account_suspended',
      meta: {
        permissions: ['administrator', 'agent', 'custom_role'],
      },
      component: Suspended,
    },
  ],
};
