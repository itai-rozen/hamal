"use client"

import Equipment from "./FormInputs/Equipment"

interface formProps {
  tableName: string
}
export default function Form({ tableName  }: formProps)  {
  interface inputsMap {
    equipment : React.Component
  }
  const inputsMap =  {
    equipment : <Equipment />
  }
  return inputsMap[tableName];
  
}