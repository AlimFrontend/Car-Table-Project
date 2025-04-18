<template>
  <div class="table" ref="tableRef">
    <div class="table__row table__row--head">
      <div class="table__cell table__cell--head">Название</div>
      <div class="table__cell table__cell--head">Расход топлива мл/г</div>
      <div class="table__cell table__cell--head">Цилиндры</div>
      <div class="table__cell table__cell--head">Рабочий объём</div>
      <div class="table__cell table__cell--head">Л.С</div>
      <div class="table__cell table__cell--head">Вес</div>
      <div class="table__cell table__cell--head">Ускорение м/с2</div>
      <div class="table__cell table__cell--head">Год выпуска</div>
      <div class="table__cell table__cell--head">Производство</div>
    </div>

    <div class="table__row" v-for="(car, index) in carsStore.cars" :key="index">
      <div class="table__cell">{{ car.Name }}</div>
      <div class="table__cell">{{ car.Miles_per_Gallon ?? "null" }}</div>
      <div class="table__cell">{{ car.Cylinders }}</div>
      <div class="table__cell">{{ car.Displacement }}</div>
      <div class="table__cell">{{ car.Horsepower }}</div>
      <div class="table__cell">{{ car.Weight_in_lbs }}</div>
      <div class="table__cell">{{ car.Acceleration }}</div>
      <div class="table__cell">{{ car.Year }}</div>
      <div class="table__cell">{{ car.Origin }}</div>
    </div>
  </div>
  <div v-if="carsStore.isLoading" class="table__loader">
    <img src="/preloader.gif" alt="Loading..." />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useCarsStore } from "../stores/useCarsStore";

const carsStore = useCarsStore();
const tableRef = ref(null);

const handleScroll = () => {
  const bottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

  if (bottom) {
    carsStore.loadMoreCars();
  }
};

onMounted(() => {
  carsStore.loadMoreCars();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
