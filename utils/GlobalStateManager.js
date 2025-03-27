import { create } from 'zustand'
import { createBaseRoutineArray } from './JSONSerializer'

const useTreatmentsStore = create((set) => ({
    treatments: [],
    loadTreatments: (t) => set( () => ({treatments: t}) )
}))

const useRoutineStore = create((set) => ({
    routine: createBaseRoutineArray(),
    loadRoutine: (r) => set( () => ({routine: r}) ),
    workout: "REST",
    setWorkout: (w) => set( () => ({workout: w}) )
}));

export { useTreatmentsStore, useRoutineStore }