<template>
  <section class="section columns is-desktop">
    <div class="column is-9 pr-4">
      <section class="mb-6">
        <div class="title">Filter</div>
        <b-field class="is-flex">
          <span>Filter by price</span>
          <b-slider
            v-model="priceRange"
            type="is-danger"
            lazy
            :min="minMax.min"
            :max="minMax.max"
            :step="10"
            @change="updateFilters"
          >
            <!-- <b-slidertick :value="minMax.min">{{ minMax.min }}</b-slidertick>
            <b-slidertick :value="minMax.max">{{ minMax.max }}</b-slidertick> -->
          </b-slider>
        </b-field>
      </section>

      <section class="mt-6">
        <div class="is-flex is-justify-content-space-between mb-4">
          <div class="title">Shifts</div>
          <b-button rounded type="is-dark" @click="addNewShift"
            >Add Shift</b-button
          >
        </div>

        <div
          v-for="vacancy in filteredList"
          :key="vacancy?.id"
          class="card mb-6 p-5"
        >
          <ShiftCard
            :vacancy-data="vacancy"
            @edit-vacancy="editShift(vacancy)"
          />
        </div>
      </section>
    </div>
    <aside v-if="showShiftDrawer" class="card column is-3 section pl-4">
      <CreateUpdateShift
        :vacancy-data="vacancyData"
        :mode="vacancyUpdateMode"
        @updated="onUpdateData"
      />
    </aside>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import CreateUpdateShift from '~/components/CreateUpdateShift.vue'
import ShiftCard from '~/components/ShiftCard.vue'

export default {
  name: 'IndexPage',
  components: {
    CreateUpdateShift,
    ShiftCard,
  },
  data() {
    return {
      showShiftDrawer: false,
      priceRange: [0, 100],
      newEmptyVacancy: {
        title: '',
        description: '',
        dates: [],
      },
      vacancyData: {},
      vacancyUpdateMode: 'create',
    }
  },

  computed: {
    ...mapState('shifts', ['filteredList']),
    ...mapGetters('shifts', { minMax: 'getMinMax' }),
  },

  methods: {
    ...mapActions('shifts', ['updateFilters']),

    addNewShift() {
      this.vacancyUpdateMode = 'create'
      this.vacancyData = { ...this.newEmptyVacancy }
      this.showShiftDrawer = true
    },

    editShift(vacancy) {
      this.vacancyUpdateMode = 'edit'
      this.vacancyData = { ...vacancy }
      this.showShiftDrawer = true
    },

    onUpdateData() {
      this.showShiftDrawer = false
      this.vacancyData = {}
      this.updateFilters(this.priceRange)
    },
  },

  onMounted() {
    this.updateFilters(this.priceRange)
  },
}
</script>
