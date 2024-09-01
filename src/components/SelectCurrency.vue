<script setup>
import { defineProps, defineEmits } from 'vue';
import { currentCurrency } from '@/services/const';

const props = defineProps({
  modelValue: {
    type: String,
    default: 'RUB'
  }
})

const emit = defineEmits(['update:modelValue']);


const handleChange = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <select :value="props.modelValue" :class="$style.select" @change="handleChange">
    <option v-for="(currency, idx) in currentCurrency" :key="idx" :value="currency">
      {{ currency }}
    </option>
  </select>
</template>

<style lang="scss" module>
.select {
  height: 42px;
  width: 98px;
  font-size: 18px;
  padding-left: 8px;
  border: 1px solid #000;
  background-color: #ccc;
}
</style>
