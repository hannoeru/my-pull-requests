<script setup>
useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <UApp>
    <NuxtPage />
    <p class="text-center py-6 pb-10 text-sm">
      <UButton
        to="https://github.com/atinux/my-pull-requests"
        target="_blank"
        color="neutral"
        size="xs"
        icon="i-simple-icons-github"
      >
        Create my own contributions page
      </UButton>
    </p>
  </UApp>
</template>
