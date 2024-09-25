<template>
  <header class="absolute w-full left-0 top-0">
    <Menubar :model="items" class="">
      <template #start>
        <nuxt-link to="/">
          <IconsBitcoin class="size-12 text-yellow-500" />
        </nuxt-link>
      </template>

      <template #item="{ item, props }">
        <nuxt-link
          v-ripple
          class="flex items-center"
          v-bind="props.action"
          :to="item.to"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </nuxt-link>
      </template>
    </Menubar>
  </header>
</template>

<script setup lang="ts">
const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    to: "/",
  },
  {
    label: "Contacts",
    icon: "pi pi-address-book",
    to: "/contacts",
  },
]);
</script>
