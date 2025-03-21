<template>
    <div>
      <h1>Мониторинг деривативів ByBit (V5 API)</h1>
      <ul>
        <li v-for="(coin, symbol) in sortedCoins" :key="symbol">
          {{ symbol }}: {{ coin.price }} ({{ coin.change }}%)
          <span v-if="coin.change >= 5" style="color: green;">↑ Растет быстро!</span>
          <span v-else-if="coin.change <= -10" style="color: red;">↓ Падает быстро!</span>
          <br />
          Ставка фінансування: <span :style="{ color: coin.fundingRate < 0 ? 'red' : 'green' }">{{ coin.fundingRate * 100 }}%</span>
          <span v-if="-(coin.fundingRate * 100) > 1.5" style="color: orange;">(Монета може рости!)</span>
        </li>
      </ul>
      <audio ref="audio" src="/notification.mp3"></audio>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  
  // Реактивне стан для зберігання даних про монети
  const coins = ref({});
  
  // Посилання на аудіоелемент
  const audio = ref(null);
  
  // Функція для отримання цін через V5 API
  const fetchPrices = async () => {
    try {
      const response = await axios.get('https://api.bybit.com/v5/market/tickers', {
        params: {
          category: 'linear', // Вказуємо категорію (linear для деривативів)
        },
      });
  
      const tickers = response.data.result.list;
  
      tickers.forEach(ticker => {
        const symbol = ticker.symbol;
        const currentPrice = parseFloat(ticker.lastPrice);
        const fundingRate = parseFloat(ticker.fundingRate); // Отримуємо ставку фінансування
  
        if (coins.value[symbol]) {
          const previousPrice = coins.value[symbol].price;
          const change = ((currentPrice - previousPrice) / previousPrice) * 100;
          coins.value[symbol] = {
            price: currentPrice,
            change: change.toFixed(2),
            fundingRate: fundingRate, // Додаємо ставку фінансування
          };
  
          // Відтворюємо звуковий сигнал, якщо ціна зросла на 10% або більше
          if (change >= 5) {
            playSound();
          }
        } else {
          coins.value[symbol] = {
            price: currentPrice,
            change: 0, // Зміна поки дорівнює 0
            fundingRate: fundingRate, // Додаємо ставку фінансування
          };
        }
      });
    } catch (error) {
      console.error('Помилка при отриманні даних:', error);
    }
  };
  
  // Функція для відтворення звуку
  const playSound = () => {
    if (audio.value) {
      audio.value.play();
    }
  };
  
  // Сортування монет за відсотком зміни
  const sortedCoins = computed(() => {
    return Object.entries(coins.value)
      .sort(([, a], [, b]) => b.change - a.change) // Сортування за спаданням зміни
      .reduce((acc, [symbol, data]) => {
        acc[symbol] = data;
        return acc;
      }, {});
  });
  
  // Запуск отримання цін при монтуванні компонента
  onMounted(() => {
    fetchPrices();
    setInterval(fetchPrices, 60000); // Оновлення кожну хвилину
  });
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 10px 0;
  }
  </style>