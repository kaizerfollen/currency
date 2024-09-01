<script setup>
import { ref, computed, watch } from 'vue';
import { useCurrencyValueStore } from '@/stores';

import SelectCurrency from '@/components/SelectCurrency.vue';
import InputCurrency from '@/components/InputCurrency.vue';

const useCurrencyStore = useCurrencyValueStore();

const currencyFrom = ref('USD');
const currencyTo = ref('RUB');
const amountFrom = ref(0);
const amountTo = ref(0);

const rates = computed(() => {
  return useCurrencyStore.getCurrencyValue;
});

/**
 * Возвращет текущее значение из выбранного селекта
 * 
 */
const currentRate = computed(() => {
  const rateKey = `${currencyFrom.value.toLowerCase()}-${currencyTo.value.toLowerCase()}`;
  const rate = rates.value.find(el => el.key === rateKey);
  return rate?.value ?? 0;
});

/**
 * Возвращает булево если значения в инпутах одинаковые
 *
 */
const isSameCurrency = computed(() => currencyFrom.value === currencyTo.value);

/**
 * Обработчик инпута Из какой валюты
 */
const handleUpdateAmountFrom = () => {
  if (isSameCurrency.value) {
    amountTo.value = amountFrom.value;
    return;
  };
  amountTo.value = Number(amountFrom.value * currentRate.value).toFixed(2);
};

/**
 * Обработчик инпута В какую валюту
 */
const handleUpdateAmountTo = () => {
  if (isSameCurrency.value) {
    amountFrom.value = amountTo.value;
    return;
  } else {
    amountFrom.value = Number(amountTo.value / currentRate.value).toFixed(2);
  };
};

/**
 * Вотчер за имзенениями в селектах
 */
watch([currencyFrom, currencyTo], () => {
  handleUpdateAmountFrom();
  handleUpdateAmountTo();
});

</script>

<template>
  <div :class="$style.convert">
    <h1>Конвертация валют</h1>
    <div :class="$style.currencyBlock">
      <SelectCurrency v-model="currencyFrom" :class="$style.select" />
      <InputCurrency v-model="amountFrom" @update:modelValue="handleUpdateAmountFrom" />
    </div>
    <div :class="$style.currencyBlock">
      <SelectCurrency v-model="currencyTo" :class="$style.select" />
      <InputCurrency v-model="amountTo" @update:modelValue="handleUpdateAmountTo" />
    </div>
  </div>
</template>

<style lang="scss" module>
.convert {
  position: realtive;
}

.currencyBlock {
  margin-bottom: 20px;
}

.select {
  margin-right: 12px;
}
</style>
