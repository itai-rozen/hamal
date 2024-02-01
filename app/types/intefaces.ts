import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
export interface inputsMapType {
  equipment: React.ReactNode,
  transport: React.ReactNode,
}
export interface formProps {
  tableName: keyof inputsMapType|String
}

export interface  userIdType {
  userId: RequestCookie|undefined
}