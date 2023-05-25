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
    <h6 class="">{{ vacancyData.description }}</h6>

    <h4 class="subtitle mt-4">Dates</h4>
    <div>
      <div
        v-for="date in vacancyData.dates"
        :key="date.id"
        class="my-1 has-text-light has-background-grey-darker box is-flex is-justify-content-space-between"
      >
        <div>{{ date.date }}</div>
        <div>{{ date.startTime }}</div>
        <div>{{ date.endTime }}</div>
        <div>{{ date.type }}</div>
        <div>&euro;{{ date.price }}</div>
      </div>
    </div>
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
