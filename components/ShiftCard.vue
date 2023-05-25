<template>
  <div>
    <div class="is-flex is-justify-content-space-between">
      <h4 class="subtitle">{{ vacancyData.title }}</h4>
      <b-button
        icon-right="pencil"
        size="is-small"
        @click="
          () => {
            $emit('edit-vacancy')
          }
        "
      >
      </b-button>
    </div>
    {{ vacancyData }}
  </div>
</template>

<script>
export default {
  name: 'ShiftChildCard',
  props: {
    vacancyData: {
      type: Object,
      required: true,
    },
  },
}
</script>
