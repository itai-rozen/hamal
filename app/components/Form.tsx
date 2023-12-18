"use client"

import Equipment from "./FormInputs/Equipment"
import { formProps, inputsMapType } from "../types/intefaces"
export default function Form({ tableName }: formProps) {

  const inputsMap: inputsMapType = {
    equipment: <Equipment />
  }
  return inputsMap[tableName as keyof inputsMapType]

}