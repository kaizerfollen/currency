<template>
  <header :class="$style.header">
    <nav>
      <router-link
        :class="$style.link"
        :exact-active-class="$style.myActiveClass"
        to="/"
      >
        Главная
      </router-link>
      <router-link
        :class="$style.link"
        :active-class="$style.myActiveClass"
        to="/convert"
      >
        Конвертация
      </router-link>
      <SelectCurrency v-model="selectedCurrency" />
    </nav>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useCurrencyValueStore } from '@/stores';

import SelectCurrency from '@/components/SelectCurrency.vue';

const useCurrencyStore = useCurrencyValueStore();
const selectedCurrency = ref(useCurrencyValueStore.currentCurrency);

watch(() => selectedCurrency.value, (newvalue) => {
  useCurrencyStore.setCurentCurrency(newvalue);
});

</script>

<style lang="scss" module>
.header {
  width: 1200px;
  margin: 0 auto;
}

.link {
  text-decoration: underline;
  margin-right: 24px;
  font-size: 18px;
  color: #000;
  font-family: 'Source Sans Pro';
}

.myActiveClass {
  text-decoration: none;
  color: blue;
}
</style>
