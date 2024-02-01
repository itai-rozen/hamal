"use client"

import Equipment from "./FormInputs/Equipment"
import { formProps, inputsMapType } from "../types/intefaces"
import Transport from "./FormInputs/Transport"
export default function Form({ tableName }: formProps) {

  const inputsMap: inputsMapType = {
    equipment: <Equipment />,
    transport: <Transport />
  }
  return inputsMap[tableName as keyof inputsMapType]

}