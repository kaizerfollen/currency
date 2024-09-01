<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  type: {
    type: String,
    default: 'number',
  },
});

const emit = defineEmits(['update:modelValue']);

const handleChange = (event) => {
  const value = parseFloat(event.target.value) || 0;
  emit('update:modelValue', value);
};

const validateValue = (event) => {
  if (event.key === '-' || event.key === 'e') {
    event.preventDefault();
  };
};
</script>

<template>
  <input
    :class="$style.input"
    :type="props.type"
    :value="props.modelValue"
    min="0"
    @keypress="validateValue"
    @input="handleChange"
  />
</template>

<style lang="scss" module>
.input {
  height: 36px;
  font-size: 18px;
  padding-left: 8px;
  outline: none;
}
</style>
