const vacancies = [
  {
    id: 1,
    title: 'Morning Consultation',
    description: 'Morning consultation for general checkup',
    dates: [
      {
        id: 1,
        date: '01-06-2023',
        startTime: '09:00',
        endTime: '12:00',
        price: 50,
        type: 'Consultation',
      },
    ],
  },
  {
    id: 2,
    title: 'Afternoon Ambulance',
    description: 'Emergency ambulance service in the afternoon',
    dates: [
      {
        id: 2,
        date: '02-06-2023',
        startTime: '14:00',
        endTime: '18:00',
        price: 80,
        type: 'Ambulance',
      },
    ],
  },
  {
    id: 3,
    title: 'Telephone Consultation',
    description: 'Telephonic consultation for medical advice',
    dates: [
      {
        id: 3,
        date: '03-06-2023',
        startTime: '10:00',
        endTime: '11:00',
        price: 30,
        type: 'Telephone',
      },
      {
        id: 4,
        date: '04-06-2023',
        startTime: '11:00',
        endTime: '12:00',
        price: 30,
        type: 'Telephone',
      },
    ],
  },
]
const initialState = {
  vacancyList: [...vacancies],
  filteredList: [...vacancies],
}

const state = () => ({ ...initialState })

const getters = {
  getMinMax: (state) => {
    if (!state.vacancyList?.length) {
      return { min: 0, max: 100 }
    }

    const pricesArray = state.vacancyList.flatMap((vacancy) => {
      return vacancy.dates.map((date) => date.price)
    })

    return { min: Math.min(...pricesArray), max: Math.max(...pricesArray) }
  },
}

const mutations = {
  updateFilteredList: (state, list) => {
    state.filteredList = list
  },

  updateVacancies: (state, list) => {
    state.vacancyList = list
  },
}

const actions = {
  updateFilters({ commit, state }, [min = 0, max = 100]) {
    const newList = state.vacancyList.filter((vacancy) =>
      vacancy.dates.some((date) => date.price >= min && date.price <= max)
    )

    commit('updateFilteredList', newList)
  },

  addVacancy({ commit, state }, vacancy) {
    if (vacancy?.title && vacancy.dates?.length) {
      const newVacancy = {
        ...vacancy,
        id:
          state.vacancyList.length > 0
            ? state.vacancyList[state.vacancyList.length - 1].id + 100
            : 100,
      }
      commit('updateVacancies', [...state.vacancyList, newVacancy])
    }
  },

  updateOneVacancy({ commit, state }, { id, vacancy }) {
    if (id && vacancy?.title && vacancy.dates?.length) {
      const updatedVacancies = state.vacancyList.map((item) => {
        if (item.id === id) {
          return { ...vacancy, id }
        }
        return item
      })
      commit('updateVacancies', updatedVacancies)
    }
  },

  deleteOneVacancy({ commit, state }, id) {
    if (id) {
      const updatedVacancies = state.vacancyList.filter(
        (item) => item.id !== id
      )
      commit('updateVacancies', updatedVacancies)
    }
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
