'use server'

import { faunaClient } from '@/lib/faunadb'
import { User } from '@/types/user'
import { fql } from 'fauna'

export const getUserOnDB = async (email?: string) => {
  if (!email) return null

  try {
    const query = fql`users.firstWhere(.email == ${email})`
    const response = await faunaClient.query(query)

    if (!response.data) {
      return await createUserOnDB({ email, credit: 0 })
    }

    return {
      email: response.data.email,
      credit: response.data.credit,
    } as User
  } catch (error) {
    return null
  }
}

export const createUserOnDB = async (user: User) => {
  try {
    const query = fql`users.create(${{ ...user }})`
    const response = await faunaClient.query(query)

    return {
      email: response.data.email,
      credit: response.data.credit,
    } as User
  } catch (error) {
    return null
  }
}

export const updateUserOnDB = async ({ credit, email }: User) => {
  try {
    const query = fql`users.firstWhere(.email == ${email})!.updateData({ credit: ${credit} })`
    const response = await faunaClient.query(query)

    return {
      email: response.data.email,
      credit: response.data.credit,
    } as User
  } catch (error) {
    return null
  }
}
