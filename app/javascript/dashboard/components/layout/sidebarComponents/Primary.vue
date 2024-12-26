<script>
import Logo from './Logo.vue';
import PrimaryNavItem from './PrimaryNavItem.vue';
import OptionsMenu from './OptionsMenu.vue';
import AgentDetails from './AgentDetails.vue';
import NotificationBell from './NotificationBell.vue';
import wootConstants from 'dashboard/constants/globals';
import { frontendURL } from 'dashboard/helper/URLHelper';
import { ACCOUNT_EVENTS } from '../../../helper/AnalyticsHelper/events';
import WebphoneMinimized from './WebphoneMinimized.vue';

export default {
  components: {
    Logo,
    PrimaryNavItem,
    OptionsMenu,
    AgentDetails,
    NotificationBell,
    WebphoneMinimized,
  },
  props: {
    isACustomBrandedInstance: {
      type: Boolean,
      default: false,
    },
    logoSource: {
      type: String,
      default: '',
    },
    installationName: {
      type: String,
      default: '',
    },
    accountId: {
      type: [String, Number],
      required: true,
    },
    menuItems: {
      type: Array,
      default: () => [],
    },
    activeMenuItem: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      helpDocsURL: wootConstants.DOCS_URL,
      showOptionsMenu: false,
      iframeLoading: true, // Controle de estado do iframe
      iframeURL: 'https://portal.conexaoazul.com/r/C4d?company_chat=2', // URL inicial do iframe
      hasOpenedAtleastOnce: false, // Verifica se o iframe foi aberto pelo menos uma vez
    };
  },
  methods: {
    frontendURL,
    toggleOptions() {
      this.showOptionsMenu = !this.showOptionsMenu;
    },
    toggleAccountModal() {
      this.$emit('toggleAccounts');
    },
    toggleSupportChatWindow() {
      window.$chatwoot.toggle();
    },
    openNotificationPanel() {
      this.$track(ACCOUNT_EVENTS.OPENED_NOTIFICATIONS);
      this.$emit('openNotificationPanel');
    },
    openIframe(url) {
      this.iframeURL = url || 'https://portal.conexaoazul.com/r/C4d?company_chat=2'; // Define a URL do iframe
      this.hasOpenedAtleastOnce = true; // Marca que o iframe foi aberto
      this.iframeLoading = true; // Ativa o estado de carregamento
    },
    onIframeLoad() {
      this.iframeLoading = false; // Desativa o estado de carregamento após o iframe ser carregado
    },
  },
};
</script>

<template>
  <div
    class="flex flex-col justify-between w-16 h-full bg-white border-r dark:bg-slate-900 border-slate-50 dark:border-slate-800/50 rtl:border-l rtl:border-r-0"
  >
    <div class="flex flex-col items-center">
      <Logo
        :source="logoSource"
        :name="installationName"
        :account-id="accountId"
        class="m-4 mb-10"
      />
      <PrimaryNavItem
        v-for="menuItem in menuItems"
        :key="menuItem.toState"
        :icon="menuItem.icon"
        :name="menuItem.label"
        :to="menuItem.toState"
        :is-child-menu-active="menuItem.key === activeMenuItem"
      />
      <PrimaryNavItem
        icon="whatsapp"
        key ="whatsapp"
        label ="WHATSAPP" 
        name="Iframe"
        :to="{ name: 'iframe', params: { accountId: accountId } }"
      />
      <PrimaryNavItem
        icon="automation"
        name="IframeConector"
        key ="conector" 
        :to="{ name: 'iframeConector', params: { accountId: accountId } }"
      />

      <PrimaryNavItem
        icon="globe"
        key ="crm"
        label ="CRM" 
        name="IframeCrm"
        :to="{ name: 'IframeCrm', params: { accountId: accountId } }"
      />
    </div>
    <div class="flex flex-col items-center justify-end pb-6">
      <webphone-minimized />
      <!-- <PrimaryNavItem
        v-if="!isACustomBrandedInstance"
        icon="whatsapp"
        name="DOCS"
        open-in-new-page
        :to="helpDocsURL"
      /> -->
      <NotificationBell @openNotificationPanel="openNotificationPanel" />
      <AgentDetails @toggleMenu="toggleOptions" />
      <OptionsMenu
        :show="showOptionsMenu"
        @toggleAccounts="toggleAccountModal"
        @showSupportChatWindow="toggleSupportChatWindow"
        @openKeyShortcutModal="$emit('openKeyShortcutModal')"
        @close="toggleOptions"
      />
    </div>
  </div>
</template>
