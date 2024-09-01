<template>
  <div :class="$style.pageContainer">
    <HeaderComponent @baseCurrencyChanged="setBaseCurrency" />
    <router-view :base-currency="useCurrencyStore.currentCurrency" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { useCurrencyValueStore } from '@/stores';

const useCurrencyStore = useCurrencyValueStore();

const setBaseCurrency = (currency) => {
  useCurrencyStore.setCurentCurrency(currency);
};



onMounted(() => {
  useCurrencyStore.fetchCurrencyValue();
});

</script>

<style lang="scss" module>
@import '@/assets/styles/common.scss';

.pageContainer {
  @include page-container;
}
</style>
