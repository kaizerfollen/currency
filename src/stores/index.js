import { defineStore } from 'pinia';
import axios from 'axios';
import { valuesRatesCanBe } from '@/services/const';

const BASE_URL = 'https://status.neuralgeneration.com/api/currency';

export const useCurrencyValueStore = defineStore('currency', {
  state: () => {
    return {
      currencyValue: {},
      currentCurrency: 'RUB',
    };
  },
  getters: {
    getCurrencyValue: (state) => {
      const filteredRates = {};

      for (const key in state.currencyValue) {
        if (valuesRatesCanBe.some(prefix => key.includes(prefix))) {
          filteredRates[key] = state.currencyValue[key];
        };
      };
      const ratesArray = Object.entries(filteredRates).map(([key, value]) => {
          return { key, value };
      });

      return ratesArray;
    },
  },
  actions: {
    async fetchCurrencyValue() {
      try {
        const response = await axios.get(BASE_URL);
        this.currencyValue = response.data;
      } catch (error) {
        console.error('Ошибка при получении данных о курсах валют:', error);
        return {};
      };
    },

    setCurentCurrency(currency) {
      this.currentCurrency = currency;
    },
  },
});
