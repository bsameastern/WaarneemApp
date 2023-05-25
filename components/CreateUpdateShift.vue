<template>
  <div>
    <h4 class="title">{{ mode ? `${mode} Shift` : '' }}</h4>
    <section>
      <b-field label="Title">
        <b-input v-model="vacancy.title"></b-input>
      </b-field>

      <b-field label="Description">
        <b-input
          v-model="vacancy.description"
          maxlength="200"
          type="textarea"
        ></b-input>
      </b-field>

      <b-field label="Select a date">
        <b-datepicker placeholder="Click to select..." v-model="dates" multiple>
        </b-datepicker>
      </b-field>
    </section>
    {{ vacancy }}|| {{ mode }}
    {{ dates }}

    <div v-if="mode == 'edit'" class="buttons is-full-width">
      <b-button type="is-dark" outlined @click="deleteShift">Delete</b-button>
      <b-button type="is-dark" @click="updateShift">Update</b-button>
    </div>

    <div v-if="mode == 'create'" class="buttons is-full-width">
      <b-button type="is-dark" outlined @click="$emit('updated')"
        >Close</b-button
      >
      <b-button type="is-dark" @click="addNewShift">Save</b-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreateUpdateShift',
  props: {
    mode: {
      type: String,
      required: true,
      default: 'create',
    },
    vacancyData: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      vacancy: { ...this.vacancyData },
      dates: [],
    }
  },
  methods: {
    ...mapActions('shifts', [
      'addVacancy',
      'updateOneVacancy',
      'deleteOneVacancy',
    ]),
    addNewShift() {
      this.addVacancy({ ...this.vacancy, dates: this.dates })
      this.$emit('updated')
    },

    updateShift() {
      this.updateOneVacancy({
        id: this.vacancy?.id,
        vacancy: { ...this.vacancy },
      })
      this.$emit('updated')
    },

    deleteShift() {
      this.deleteOneVacancy(this.vacancy?.id)
      this.$emit('updated')
    },
  },

  watch: {
    vacancyData: function (val) {
      this.vacancy = { ...val }
    },
  },
}
</script>

<style></style>
