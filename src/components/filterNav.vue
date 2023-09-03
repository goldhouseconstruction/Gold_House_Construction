<template>
  <nav class="flex space-x-4 justify-center my-10">
    <button
      @click="$emit('filterProjects', 'all')"
      :class="{
        current: selectedCategory === 'all',
        notActive: selectedCategory !== 'all',
      }"
    >
      All
    </button>
    <button
      @click="$emit('filterProjects', 'local')"
      :class="{
        current: selectedCategory === 'local',
        notActive: selectedCategory !== 'local',
      }"
    >
      Local
    </button>
    <button
      @click="$emit('filterProjects', 'oversea')"
      :class="{
        current: selectedCategory === 'oversea',
        notActive: selectedCategory !== 'oversea',
      }"
    >
      Oversea
    </button>
  </nav>
</template>

<script>
export default {
  props: ["selectedCategory"],
  emits: ["filterProjects"],
};
</script>

<style>
.relative {
  position: relative;
}
.current {
  @apply px-4 py-2 rounded-md text-gray-700 bg-green-200 hover:bg-green-300;
}
.notActive {
  @apply px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300;
}
</style>
