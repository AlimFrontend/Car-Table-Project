import { defineStore } from "pinia";

// Тип одной машины
export interface Car {
  Name: string;
  Miles_per_Gallon: number | null;
  Cylinders: number;
  Displacement: number;
  Horsepower: number;
  Weight_in_lbs: number;
  Acceleration: number;
  Year: string;
  Origin: string;
}

export const useCarsStore = defineStore("cars", {
  state: (): {
    cars: Car[];
    isLoading: boolean;
    fileIndex: number;
    maxFiles: number;
  } => ({
    cars: [],
    isLoading: false,
    fileIndex: 1,
    maxFiles: 5,
  }),

  actions: {
    async loadMoreCars() {
      if (this.fileIndex > this.maxFiles || this.isLoading) return;

      this.isLoading = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch(`/data/cars-${this.fileIndex}.json`);
        const data: Car[] = await response.json();
        this.cars.push(...data);
        this.fileIndex++;
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
