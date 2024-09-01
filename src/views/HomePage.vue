<template>
  <div :class="$style.page">
    <h1>Курсы валют</h1>
    <div v-if="props.baseCurrency && isGetCurrencyValues">
      <ul :class="$style.rates">
        <li v-for="currency in rates" :class="$style.rate" :key="currency.key">
          <p>{{ getRate(currency) }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useCurrencyValueStore } from '@/stores';
import {currencySymbol} from '@/services/const';

const useCurrencyStore = useCurrencyValueStore()
const props = defineProps({
  baseCurrency: {
    type: String,
    default: 'RUB'
  }
})

const isGetCurrencyValues = computed(() => {
  return Object.values(useCurrencyStore.getCurrencyValue).length;
})

const rates = computed(() => {
  if (props.baseCurrency) {
    return useCurrencyStore.getCurrencyValue.filter(el => el.key.includes(`-${props.baseCurrency.toLowerCase()}`))
  }
  return useCurrencyStore.getCurrencyValue
})

const getRate = (rate) => {
  return `1 ${rate.key.replace(`-${props.baseCurrency.toLowerCase()}`, '').toUpperCase()} - ${rate.value.toFixed(2)}${currencySymbol[props.baseCurrency]}`
}

</script>

<style lang="scss" module>
@import "@/assets/styles/common.scss";

.page {
  @include page-container;
}

.rates {
  text-decoration-style: none;
}

.rate {
  margin-bottom: 18px;
  list-style: none;
  font-size: 24px;
  font-style: normal;
}
</style>
