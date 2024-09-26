<template>
  <CurrencyChartForm />
  <Button label="Fetch" @click="getPrices" />
  <CurrencyChartItem />
</template>

<script setup lang="ts">
const { getPrices } = useApi();
</script>
